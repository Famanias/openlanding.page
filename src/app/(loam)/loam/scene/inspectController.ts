import * as THREE from 'three';
import {
  TRAY_CALLOUT_ANCHORS,
  type InspectableObjectId,
} from '../logic/chapters';
import {
  OBJECT_PART_PINS,
  createInitialInspectState,
  onInspectPointerDown,
  onInspectPointerMove,
  onInspectPointerUp,
  tickInspectState,
  toggleKeyboardInspect,
  applyKeyboardRotationStep,
  exitInspectMode,
  isPinFacingCamera,
  type HoldInspectState,
} from '../logic/holdInspectLogic';

export interface ProjectedPartPin {
  id: string;
  label: string;
  screenX: number;
  screenY: number;
  anchorX: number;
  anchorY: number;
  visible: boolean;
}

export interface InspectUIFrameState {
  phase: HoldInspectState['phase'];
  targetObject: InspectableObjectId | null;
  holdProgress: number;
  pointerX: number;
  pointerY: number;
  hasUsedInspect: boolean;
  keyboardMode: boolean;
  pins: ProjectedPartPin[];
  trayCallouts: ProjectedPartPin[];
}

export interface InspectController {
  getState: () => HoldInspectState;
  getUIFrameState: () => InspectUIFrameState;
  tick: (dtMs: number, activeChapterObject: InspectableObjectId | null) => void;
  triggerKeyboardInspect: (targetObject: InspectableObjectId) => void;
  exitInspect: () => void;
  dispose: () => void;
}

// Pre-allocated scratch math objects (zero GC in render loop)
const _worldPos = new THREE.Vector3();
const _ndcPos = new THREE.Vector3();
const _camDir = new THREE.Vector3();
const _quat = new THREE.Quaternion();

/**
 * Manages the Hold-to-Inspect interaction for the Mushroom (Ch 1),
 * Mycelium Clump (Ch 4a), and Molded Packaging Tray (Ch 5),
 * as well as projecting 3D callout anchors for Chapter 5 tray property labels.
 */
export function createInspectController(params: {
  canvas: HTMLCanvasElement;
  camera: THREE.PerspectiveCamera;
  pivotGroups: Record<InspectableObjectId, THREE.Group>;
  hitProxies: Record<InspectableObjectId, THREE.Object3D>;
  getActiveChapterInspectable: () => InspectableObjectId | null;
  getActiveChapterIndex?: () => number;
  onInspectActiveChange: (isInspectingOrHolding: boolean) => void;
  onNetworkClick?: (worldPoint: THREE.Vector3) => void;
  onNetworkHover?: (worldPoint: THREE.Vector3) => void;
  networkHitPlane: THREE.Object3D;
}): InspectController {
  let state: HoldInspectState = createInitialInspectState();
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();
  let lastMoveTime = performance.now();

  const updatePointerNdc = (clientX: number, clientY: number) => {
    const rect = params.canvas.getBoundingClientRect();
    pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  };

  const notifyScrollLock = (
    prevPhase: HoldInspectState['phase'],
    nextPhase: HoldInspectState['phase'],
  ) => {
    const wasLocked = prevPhase === 'inspecting';
    const isLocked = nextPhase === 'inspecting';
    if (wasLocked !== isLocked) {
      params.onInspectActiveChange(isLocked);
    }
  };

  const isChapter4Active = () => {
    if (params.getActiveChapterIndex) {
      return params.getActiveChapterIndex() === 3;
    }
    return params.getActiveChapterInspectable() === 'clump';
  };

  const handlePointerDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    const activeTarget = params.getActiveChapterInspectable();
    updatePointerNdc(e.clientX, e.clientY);
    raycaster.setFromCamera(pointerNdc, params.camera);

    // Check if the user pressed on the active chapter's inspectable specimen
    if (activeTarget) {
      const proxy = params.hitProxies[activeTarget];
      const hits = raycaster.intersectObject(proxy, true);
      if (hits.length > 0) {
        const prevPhase = state.phase;
        state = onInspectPointerDown(state, activeTarget, e.clientX, e.clientY);
        notifyScrollLock(prevPhase, state.phase);
        lastMoveTime = performance.now();
        return;
      }
    }

    // In Chapter 4 (both 4a and 4b), clicking on the mycelium network triggers a Foxfire pulse
    if (isChapter4Active() && state.phase === 'idle') {
      const netHits = raycaster.intersectObject(params.networkHitPlane, false);
      if (netHits.length > 0 && params.onNetworkClick) {
        params.onNetworkClick(netHits[0].point);
      }
    }
  };

  const handlePointerMove = (e: PointerEvent) => {
    const now = performance.now();
    const dtSec = Math.max(0.004, (now - lastMoveTime) / 1000);
    lastMoveTime = now;

    if (state.phase === 'holding' || state.phase === 'inspecting') {
      const prevPhase = state.phase;
      state = onInspectPointerMove(state, e.clientX, e.clientY, dtSec);
      notifyScrollLock(prevPhase, state.phase);
      if (state.phase === 'inspecting') {
        e.preventDefault();
      }
      return;
    }

    // When in Chapter 4, update pointer world coordinates so nearby mycelium threads brighten
    if (isChapter4Active() && params.onNetworkHover) {
      updatePointerNdc(e.clientX, e.clientY);
      raycaster.setFromCamera(pointerNdc, params.camera);
      const netHits = raycaster.intersectObject(params.networkHitPlane, false);
      if (netHits.length > 0) {
        params.onNetworkHover(netHits[0].point);
      }
    }
  };

  const handlePointerUpOrCancel = () => {
    if (state.phase === 'holding' || state.phase === 'inspecting') {
      const prevPhase = state.phase;
      state = onInspectPointerUp(state);
      notifyScrollLock(prevPhase, state.phase);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (state.phase !== 'inspecting') return;

    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      const prevPhase = state.phase;
      state = exitInspectMode(state);
      notifyScrollLock(prevPhase, state.phase);
      return;
    }

    if (
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown'
    ) {
      e.preventDefault();
      e.stopPropagation();
      state = applyKeyboardRotationStep(state, e.key);
    }
  };

  params.canvas.addEventListener('pointerdown', handlePointerDown);
  window.addEventListener('pointermove', handlePointerMove, { passive: false });
  window.addEventListener('pointerup', handlePointerUpOrCancel);
  window.addEventListener('pointercancel', handlePointerUpOrCancel);
  window.addEventListener('keydown', handleKeyDown, { capture: true });

  const triggerKeyboardInspect = (targetObject: InspectableObjectId) => {
    const prevPhase = state.phase;
    state = toggleKeyboardInspect(state, targetObject);
    notifyScrollLock(prevPhase, state.phase);
  };

  const exitInspect = () => {
    const prevPhase = state.phase;
    state = exitInspectMode(state);
    notifyScrollLock(prevPhase, state.phase);
  };

  const tick = (dtMs: number, activeChapterObject: InspectableObjectId | null) => {
    // If chapter or sub-rest-point changed away from the inspected object, exit inspect cleanly
    if (
      state.targetObject &&
      activeChapterObject !== state.targetObject &&
      (state.phase === 'holding' || state.phase === 'inspecting')
    ) {
      const prevPhase = state.phase;
      state = exitInspectMode(state);
      notifyScrollLock(prevPhase, state.phase);
    }

    const prevPhase = state.phase;
    state = tickInspectState(state, dtMs);
    notifyScrollLock(prevPhase, state.phase);

    // Apply current quaternion to the target pivot group (and reset non-active ones to identity)
    const allIds: InspectableObjectId[] = ['mushroom', 'clump', 'tray'];
    for (const id of allIds) {
      const pivot = params.pivotGroups[id];
      if (state.targetObject === id && state.phase !== 'idle') {
        _quat.set(
          state.quaternion[0],
          state.quaternion[1],
          state.quaternion[2],
          state.quaternion[3],
        );
        pivot.quaternion.copy(_quat);
      } else {
        pivot.quaternion.identity();
      }
    }
  };

  const getUIFrameState = (): InspectUIFrameState => {
    const pins: ProjectedPartPin[] = [];
    const trayCallouts: ProjectedPartPin[] = [];
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (
      state.targetObject &&
      (state.phase === 'inspecting' || state.phase === 'returning')
    ) {
      const targetId = state.targetObject;
      const pivot = params.pivotGroups[targetId];
      const defs = OBJECT_PART_PINS[targetId];

      pivot.updateWorldMatrix(true, false);
      pivot.getWorldPosition(_worldPos);
      _camDir.subVectors(params.camera.position, _worldPos).normalize();

      for (const def of defs) {
        const facing = isPinFacingCamera(def.localNormal, state.quaternion, [
          _camDir.x,
          _camDir.y,
          _camDir.z,
        ]);

        _worldPos.set(def.localPosition[0], def.localPosition[1], def.localPosition[2]);
        _worldPos.applyMatrix4(pivot.matrixWorld);
        _ndcPos.copy(_worldPos).project(params.camera);

        const anchorX = (_ndcPos.x * 0.5 + 0.5) * width;
        const anchorY = (-_ndcPos.y * 0.5 + 0.5) * height;

        const dirX = anchorX - width * 0.5;
        const dirY = anchorY - height * 0.5;
        const len = Math.hypot(dirX, dirY) || 1;
        const offsetDist = 64;
        const screenX = Math.max(96, Math.min(width - 96, anchorX + (dirX / len) * offsetDist));
        const screenY = Math.max(56, Math.min(height - 56, anchorY + (dirY / len) * offsetDist));

        pins.push({
          id: def.id,
          label: def.label,
          screenX,
          screenY,
          anchorX,
          anchorY,
          visible: facing && state.phase === 'inspecting' && _ndcPos.z < 1,
        });
      }
    }

    // Project Chapter 5 tray property callouts so leader lines stay pinned to the 3D tray
    const trayPivot = params.pivotGroups.tray;
    if (trayPivot) {
      trayPivot.updateWorldMatrix(true, false);
      for (const anchor of TRAY_CALLOUT_ANCHORS) {
        _worldPos.set(
          anchor.localPosition[0],
          anchor.localPosition[1],
          anchor.localPosition[2],
        );
        _worldPos.applyMatrix4(trayPivot.matrixWorld);
        _ndcPos.copy(_worldPos).project(params.camera);

        const anchorX = (_ndcPos.x * 0.5 + 0.5) * width;
        const anchorY = (-_ndcPos.y * 0.5 + 0.5) * height;
        const screenX = Math.max(
          110,
          Math.min(width - 110, anchorX + anchor.screenOffset[0]),
        );
        const screenY = Math.max(
          72,
          Math.min(height - 72, anchorY + anchor.screenOffset[1]),
        );

        trayCallouts.push({
          id: anchor.id,
          label: anchor.label,
          screenX,
          screenY,
          anchorX,
          anchorY,
          visible: _ndcPos.z > -1 && _ndcPos.z < 1,
        });
      }
    }

    return {
      phase: state.phase,
      targetObject: state.targetObject,
      holdProgress: state.holdProgress,
      pointerX: state.pointerCurrent.x,
      pointerY: state.pointerCurrent.y,
      hasUsedInspect: state.hasUsedInspect,
      keyboardMode: state.keyboardMode,
      pins,
      trayCallouts,
    };
  };

  const dispose = () => {
    params.canvas.removeEventListener('pointerdown', handlePointerDown);
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUpOrCancel);
    window.removeEventListener('pointercancel', handlePointerUpOrCancel);
    window.removeEventListener('keydown', handleKeyDown, { capture: true });
  };

  return {
    getState: () => state,
    getUIFrameState,
    tick,
    triggerKeyboardInspect,
    exitInspect,
    dispose,
  };
}

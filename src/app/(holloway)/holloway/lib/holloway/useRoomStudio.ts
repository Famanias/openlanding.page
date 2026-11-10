import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_FLOOR_PLAN,
  FURNITURE_CATALOG,
  HOLLOWAY_ASSETS,
  ROOM_PRESETS,
  normalizeFloorPlanData,
  type FloorPlanData,
  type FurniturePiece,
} from './floorPlan';
import {
  calculateRoomMetrics,
  formatColumnNumber,
  formatConfigurationSummary,
  formatRowLetter,
  getFootprint,
  rotatePieceWithKick,
  validatePlacement,
} from './collision';

export interface StudioStatusMessage {
  text: string;
  tone: 'neutral' | 'valid' | 'rejected';
  collidingCells?: { x: number; y: number }[];
}

export function useRoomStudio() {
  const [plan, setPlan] = useState<FloorPlanData>(DEFAULT_FLOOR_PLAN);
  const [modules, setModules] = useState<FurniturePiece[]>(DEFAULT_FLOOR_PLAN.modules);
  const [selectedId, setSelectedId] = useState<string | null>('sofa');
  const [activePresetId, setActivePresetId] = useState<string>('canonical');
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number } | null>(null);
  const [copiedRecently, setCopiedRecently] = useState(false);
  const [status, setStatus] = useState<StudioStatusMessage>({
    text: 'Select a module on the drafting plan. Use arrow keys or studio controls to position, R to rotate.',
    tone: 'neutral',
  });

  // Load canonical floor plan data from /templates/holloway/holloway/12-room-floor-plan.data.json
  useEffect(() => {
    let active = true;
    fetch(HOLLOWAY_ASSETS.floorPlanJson)
      .then((res) => {
        if (!res.ok) throw new Error('Floor plan JSON unavailable');
        return res.json();
      })
      .then((raw: Partial<FloorPlanData>) => {
        if (!active) return;
        const normalized = normalizeFloorPlanData(raw);
        setPlan(normalized);
        setModules(normalized.modules);
      })
      .catch(() => {
        if (!active) return;
        setStatus({
          text: 'Loaded canonical 12 × 8 architectural floor plan specification.',
          tone: 'neutral',
        });
      });

    return () => {
      active = false;
    };
  }, []);

  const selectedPiece = useMemo(
    () => modules.find((m) => m.id === selectedId) ?? null,
    [modules, selectedId]
  );

  const selectedCatalog = useMemo(
    () => (selectedId ? FURNITURE_CATALOG[selectedId] ?? null : null),
    [selectedId]
  );

  const metrics = useMemo(() => calculateRoomMetrics(modules, plan), [modules, plan]);

  const selectModule = useCallback(
    (id: string | null) => {
      setSelectedId(id);
      if (!id) {
        setStatus({ text: 'Selection cleared. Choose a module to resume editing.', tone: 'neutral' });
        return;
      }
      const found = modules.find((m) => m.id === id);
      const cat = FURNITURE_CATALOG[id];
      if (found) {
        const { w, h } = getFootprint(found);
        setStatus({
          text: `${cat?.fullName ?? found.label} active at Grid ${formatColumnNumber(found.x)}${formatRowLetter(found.y)} (${w} × ${h} cells, ${found.rotation}°).`,
          tone: 'neutral',
        });
      }
    },
    [modules]
  );

  const moveSelected = useCallback(
    (dx: number, dy: number) => {
      if (!selectedId) return false;
      const current = modules.find((m) => m.id === selectedId);
      if (!current) return false;

      const candidate: FurniturePiece = {
        ...current,
        x: current.x + dx,
        y: current.y + dy,
      };

      const validation = validatePlacement(candidate, modules, plan);
      if (!validation.valid) {
        setStatus({
          text: validation.detail || 'Placement blocked by room geometry.',
          tone: 'rejected',
          collidingCells: validation.collidingCells,
        });
        return false;
      }

      setModules((prev) => prev.map((m) => (m.id === selectedId ? candidate : m)));
      setActivePresetId('custom');
      setStatus({
        text: `${current.label} positioned at Column ${formatColumnNumber(candidate.x)}, Row ${formatRowLetter(candidate.y)} (${candidate.rotation}°).`,
        tone: 'valid',
      });
      return true;
    },
    [modules, plan, selectedId]
  );

  const placeSelectedAt = useCallback(
    (targetX: number, targetY: number) => {
      if (!selectedId) return false;
      const current = modules.find((m) => m.id === selectedId);
      if (!current) return false;

      const candidate: FurniturePiece = {
        ...current,
        x: targetX,
        y: targetY,
      };

      const validation = validatePlacement(candidate, modules, plan);
      if (!validation.valid) {
        setStatus({
          text: validation.detail || 'Selected cell cannot accommodate this module footprint.',
          tone: 'rejected',
          collidingCells: validation.collidingCells,
        });
        return false;
      }

      setModules((prev) => prev.map((m) => (m.id === selectedId ? candidate : m)));
      setActivePresetId('custom');
      setStatus({
        text: `${current.label} placed at Grid ${formatColumnNumber(candidate.x)}${formatRowLetter(candidate.y)} (${candidate.rotation}°).`,
        tone: 'valid',
      });
      return true;
    },
    [modules, plan, selectedId]
  );

  const rotateSelected = useCallback(() => {
    if (!selectedId) return false;
    const current = modules.find((m) => m.id === selectedId);
    if (!current) return false;

    const { result, piece } = rotatePieceWithKick(current, modules, plan);
    if (!result.valid) {
      setStatus({
        text: result.detail || 'Rotation blocked by adjacent boundary or module.',
        tone: 'rejected',
        collidingCells: result.collidingCells,
      });
      return false;
    }

    setModules((prev) => prev.map((m) => (m.id === selectedId ? piece : m)));
    setActivePresetId('custom');
    const { w, h } = getFootprint(piece);
    setStatus({
      text: `${current.label} rotated to ${piece.rotation}° (${w} × ${h} cells at Grid ${formatColumnNumber(piece.x)}${formatRowLetter(piece.y)}).`,
      tone: 'valid',
    });
    return true;
  }, [modules, plan, selectedId]);

  const applyPreset = useCallback(
    (presetId: string) => {
      const preset = ROOM_PRESETS.find((p) => p.id === presetId);
      if (!preset) return;
      setModules(structuredClone(preset.modules));
      setActivePresetId(preset.id);
      if (!selectedId) setSelectedId('sofa');
      setStatus({
        text: `Applied architectural preset: ${preset.index} / ${preset.name} (${preset.subtitle}).`,
        tone: 'valid',
      });
    },
    [selectedId]
  );

  const resetArrangement = useCallback(() => {
    setModules(structuredClone(plan.modules));
    setSelectedId('sofa');
    setActivePresetId('canonical');
    setStatus({
      text: 'Room arrangement restored to canonical 12 × 8 studio baseline.',
      tone: 'neutral',
    });
  }, [plan.modules]);

  const copyConfiguration = useCallback(async () => {
    const summary = formatConfigurationSummary(modules, plan);
    try {
      await navigator.clipboard?.writeText(summary);
      setCopiedRecently(true);
      setStatus({
        text: 'Architectural room schedule copied to clipboard.',
        tone: 'valid',
      });
      setTimeout(() => setCopiedRecently(false), 2600);
    } catch {
      setCopiedRecently(true);
      setStatus({
        text: 'Schedule generated and ready for specification review.',
        tone: 'valid',
      });
      setTimeout(() => setCopiedRecently(false), 2600);
    }
    return summary;
  }, [modules, plan]);

  // Preview validity when hovering over a cell on the grid
  const hoveredPreview = useMemo(() => {
    if (!hoveredCell || !selectedPiece) return null;
    const candidate: FurniturePiece = {
      ...selectedPiece,
      x: hoveredCell.x,
      y: hoveredCell.y,
    };
    const validation = validatePlacement(candidate, modules, plan);
    const { w, h } = getFootprint(candidate);
    return {
      x: hoveredCell.x,
      y: hoveredCell.y,
      w,
      h,
      valid: validation.valid,
    };
  }, [hoveredCell, modules, plan, selectedPiece]);

  return {
    plan,
    modules,
    selectedId,
    selectedPiece,
    selectedCatalog,
    activePresetId,
    metrics,
    status,
    copiedRecently,
    hoveredCell,
    hoveredPreview,
    setHoveredCell,
    selectModule,
    moveSelected,
    placeSelectedAt,
    rotateSelected,
    applyPreset,
    resetArrangement,
    copyConfiguration,
  };
}

"use client";
import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import { CONTROL_FRACTIONS, PARAM_LIMITS, clampParam, specOf, type ParamKey } from "./profile";
import { silhouettePathFor, EDITOR } from "./editorGeometry";
import { useVessel } from "./VesselProvider";

type Handle = { key: ParamKey; label: string; fraction: number };

const HANDLES: readonly Handle[] = [
  { key: "lip", label: "Lip width", fraction: CONTROL_FRACTIONS[4] },
  { key: "neck", label: "Neck width", fraction: CONTROL_FRACTIONS[3] },
  { key: "belly", label: "Belly width", fraction: CONTROL_FRACTIONS[1] },
  { key: "foot", label: "Foot width", fraction: CONTROL_FRACTIONS[0] },
];

const KEY_STEP = 0.02;

/** Drag the pinch points of the profile; every handle is also a keyboard slider. */
export function ProfileEditor() {
  const { state, dispatch } = useVessel();
  const svgRef = useRef<SVGSVGElement>(null);
  const spec = specOf(state.params);
  const topY = EDITOR.baseY - (EDITOR.minHeight + state.params.height * EDITOR.heightRange);

  const toLocal = (event: PointerEvent<SVGElement>) => {
    const svg = svgRef.current;
    const matrix = svg?.getScreenCTM();
    if (!svg || !matrix) return null;
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    return point.matrixTransform(matrix.inverse());
  };

  const dragRadius = (key: ParamKey) => (event: PointerEvent<SVGElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const local = toLocal(event);
    if (local) dispatch({ type: "set", key, value: Math.abs(local.x - EDITOR.centreX) / EDITOR.radiusPx });
  };

  const dragHeight = (event: PointerEvent<SVGElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const local = toLocal(event);
    if (local) dispatch({ type: "set", key: "height", value: (EDITOR.baseY - local.y - EDITOR.minHeight) / EDITOR.heightRange });
  };

  const capture = (event: PointerEvent<SVGElement>) => event.currentTarget.setPointerCapture(event.pointerId);

  const keyboard = (key: ParamKey, up: "ArrowRight" | "ArrowUp", down: "ArrowLeft" | "ArrowDown") => (event: KeyboardEvent<SVGElement>) => {
    const direction = event.key === up ? 1 : event.key === down ? -1 : 0;
    if (!direction) return;
    event.preventDefault();
    dispatch({ type: "set", key, value: clampParam(key, state.params[key] + direction * KEY_STEP) });
  };

  const valueText = (key: ParamKey) => `${Math.round(state.params[key] * 100)} percent`;

  return (
    <div className="tn-editor">
      <svg ref={svgRef} className="tn-editor-svg" viewBox={`0 0 ${EDITOR.width} ${EDITOR.height}`} role="group" aria-label="Vessel profile editor">
        <line className="tn-editor-axis" x1={EDITOR.centreX} x2={EDITOR.centreX} y1="12" y2={EDITOR.baseY + 8} />
        <line className="tn-editor-floor" x1="24" x2={EDITOR.width - 24} y1={EDITOR.baseY} y2={EDITOR.baseY} />
        <path className="tn-editor-shape" d={silhouettePathFor(state.params)} />
        {HANDLES.map((handle) => {
          const y = EDITOR.baseY - handle.fraction * (EDITOR.minHeight + state.params.height * EDITOR.heightRange);
          const x = EDITOR.centreX + state.params[handle.key] * EDITOR.radiusPx;
          return (
            <g key={handle.key}>
              <line className="tn-editor-guide" x1={EDITOR.centreX} x2={x} y1={y} y2={y} />
              <circle
                className="tn-handle"
                cx={x}
                cy={y}
                r="11"
                tabIndex={0}
                role="slider"
                aria-label={handle.label}
                aria-orientation="horizontal"
                aria-valuemin={Math.round(PARAM_LIMITS[handle.key].min * 100)}
                aria-valuemax={Math.round(PARAM_LIMITS[handle.key].max * 100)}
                aria-valuenow={Math.round(state.params[handle.key] * 100)}
                aria-valuetext={valueText(handle.key)}
                onPointerDown={capture}
                onPointerMove={dragRadius(handle.key)}
                onKeyDown={keyboard(handle.key, "ArrowRight", "ArrowLeft")}
              />
            </g>
          );
        })}
        <rect
          className="tn-handle tn-handle-height"
          x={EDITOR.centreX - 22}
          y={topY - 40}
          width="44"
          height="20"
          rx="10"
          tabIndex={0}
          role="slider"
          aria-label="Height"
          aria-orientation="vertical"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(state.params.height * 100)}
          aria-valuetext={`${spec.heightCm} centimetres`}
          onPointerDown={capture}
          onPointerMove={dragHeight}
          onKeyDown={keyboard("height", "ArrowUp", "ArrowDown")}
        />
        <text className="tn-editor-hint" x={EDITOR.centreX} y={topY - 26} textAnchor="middle" aria-hidden="true">
          height
        </text>
      </svg>
      <dl className="tn-spec" aria-live="polite">
        <div>
          <dt>Height</dt>
          <dd>{spec.heightCm} cm</dd>
        </div>
        <div>
          <dt>Width</dt>
          <dd>{spec.widthCm} cm</dd>
        </div>
        <div>
          <dt>Holds</dt>
          <dd>{spec.volumeMl.toLocaleString("en-US")} ml</dd>
        </div>
      </dl>
    </div>
  );
}

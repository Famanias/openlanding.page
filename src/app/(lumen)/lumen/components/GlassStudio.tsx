import React, { useRef, useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Download,
  Copy,
  Check,
  Sparkles,
  Sliders,
  Layers,
  Code2,
  ArrowLeft,
  Eye,
  Film,
  Shuffle,
} from 'lucide-react';
import {
  GlassPresetId,
  GlassPresetConfig,
  GlassTreatment,
  ExportAspectRatio,
  GLASS_PRESETS,
  GLASS_PRESET_LIST,
  GLASS_TREATMENT_DEFAULTS,
  EXPORT_ASPECT_RATIOS,
  EXPORT_RESOLUTIONS,
  computeExportDimensions,
  serializePresetConfig,
  generateReactComponentSnippet,
} from '../glass/glassTypes';
import { GlassBackground, GlassBackgroundHandle } from './GlassBackground';

interface GlassStudioProps {
  activeHeroPreset: GlassPresetId;
  onApplyPresetToHero: (presetId: GlassPresetId, customConfig: GlassPresetConfig) => void;
  onCloseStudio: () => void;
}

export const GlassStudio: React.FC<GlassStudioProps> = ({
  activeHeroPreset,
  onApplyPresetToHero,
  onCloseStudio,
}) => {
  const glassRef = useRef<GlassBackgroundHandle>(null);

  const [selectedPresetId, setSelectedPresetId] = useState<GlassPresetId>(activeHeroPreset);
  const [config, setConfig] = useState<GlassPresetConfig>(() => ({
    ...GLASS_PRESETS[activeHeroPreset],
    material: { ...GLASS_PRESETS[activeHeroPreset].material },
    scene: { ...GLASS_PRESETS[activeHeroPreset].scene },
  }));

  const [aspectRatio, setAspectRatio] = useState<ExportAspectRatio>('16:9');
  const [resolutionId, setResolutionId] = useState<string>('1080p');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showSafeArea, setShowSafeArea] = useState<boolean>(false);
  const [transparentMode, setTransparentMode] = useState<boolean>(false);
  const [rightTab, setRightTab] = useState<'material' | 'scene' | 'export'>('material');

  const [copiedCode, setCopiedCode] = useState<'jsx' | 'json' | null>(null);
  const [exportStatus, setExportStatus] = useState<string | null>(null);
  const [isRecordingWebm, setIsRecordingWebm] = useState<boolean>(false);

  const selectPreset = (id: GlassPresetId) => {
    setSelectedPresetId(id);
    const base = GLASS_PRESETS[id];
    setConfig({
      ...base,
      material: { ...base.material },
      scene: { ...base.scene },
    });
    setExportStatus(null);
  };

  const applyGlassTreatment = (treatment: GlassTreatment) => {
    const defaults = GLASS_TREATMENT_DEFAULTS[treatment];
    setConfig((prev) => ({
      ...prev,
      material: {
        ...prev.material,
        ...defaults,
        glassType: treatment,
      },
    }));
  };

  const updateMaterialParam = <K extends keyof GlassPresetConfig['material']>(
    key: K,
    value: GlassPresetConfig['material'][K]
  ) => {
    setConfig((prev) => ({
      ...prev,
      material: {
        ...prev.material,
        [key]: value,
      },
    }));
  };

  const updateSceneParam = <K extends keyof GlassPresetConfig['scene']>(
    key: K,
    value: GlassPresetConfig['scene'][K]
  ) => {
    setConfig((prev) => ({
      ...prev,
      scene: {
        ...prev.scene,
        [key]: value,
      },
    }));
  };

  const handleExportStill = async (format: 'image/png' | 'image/webp') => {
    if (!glassRef.current) return;
    const resObj =
      EXPORT_RESOLUTIONS.find((r) => r.id === resolutionId) || EXPORT_RESOLUTIONS[0];
    const dims = computeExportDimensions(resObj, aspectRatio);

    setExportStatus(
      `Rendering ${dims.width}×${dims.height} ${format === 'image/png' ? 'PNG' : 'WebP'}...`
    );

    const dataUrl = await glassRef.current.exportStillImage(
      format,
      dims.width,
      dims.height,
      transparentMode
    );

    if (!dataUrl) {
      setExportStatus('Unable to capture WebGL frame on this device.');
      return;
    }

    const ext = format === 'image/png' ? 'png' : 'webp';
    const filename = `glassform-${config.id}-${dims.width}x${dims.height}${
      transparentMode ? '-alpha' : ''
    }.${ext}`;

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportStatus(`Exported ${filename} (${dims.width}×${dims.height})`);
  };

  const handleExportWebM = () => {
    const canvas = glassRef.current?.getCanvasElement();
    if (!canvas || typeof canvas.captureStream !== 'function' || typeof MediaRecorder === 'undefined') {
      setExportStatus('WebM video recording is not supported in this browser environment.');
      return;
    }

    try {
      setIsRecordingWebm(true);
      setExportStatus('Recording 4-second looping WebM clip...');
      const stream = canvas.captureStream(30);
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';
      const recorder = new MediaRecorder(stream, { mimeType });
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `glassform-${config.id}-loop.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsRecordingWebm(false);
        setExportStatus(`Exported glassform-${config.id}-loop.webm`);
      };

      recorder.start();
      window.setTimeout(() => {
        if (recorder.state === 'recording') {
          recorder.stop();
        }
      }, 4000);
    } catch {
      setIsRecordingWebm(false);
      setExportStatus('WebM encoding unavailable on this graphics context.');
    }
  };

  const handleCopySnippet = (kind: 'jsx' | 'json') => {
    const text =
      kind === 'jsx' ? generateReactComponentSnippet(config) : serializePresetConfig(config);
    navigator.clipboard?.writeText(text);
    setCopiedCode(kind);
    window.setTimeout(() => setCopiedCode(null), 2000);
  };

  const getPreviewContainerAspectClass = () => {
    switch (aspectRatio) {
      case '21:9':
        return 'aspect-[21/9] max-h-[520px]';
      case '4:5':
        return 'aspect-[4/5] max-h-[560px]';
      case '1:1':
        return 'aspect-square max-h-[540px]';
      case '9:16':
        return 'aspect-[9/16] max-h-[580px]';
      default:
        return 'aspect-video max-h-[560px]';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F0F3FA] text-[#1E2432]">
      {/* Top Studio Header Bar */}
      <header className="sticky top-0 z-40 border-b border-white/85 bg-[#F8F9FC]/95 px-6 py-3.5">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onCloseStudio}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#1E2432]/15 bg-white px-3.5 py-2 text-xs font-semibold text-[#1E2432] hover:bg-[#F8F9FC] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Back to LUMEN Page</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-[0.18em] text-[#1E2432]">
                GLASSFORM
              </span>
              <span aria-hidden="true" className="text-[#657187]">·</span>
              <span className="font-mono text-xs text-[#657187]">
                PROCEDURAL WEBGL2 OPTICAL STUDIO
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onApplyPresetToHero(selectedPresetId, config);
                onCloseStudio();
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#252C43] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1E2432] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Apply to LUMEN Hero</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main 3-Column Studio Workspace */}
      <main className="mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 gap-6 p-6 lg:grid-cols-12">
        {/* LEFT COLUMN (3 cols): 6 Distinct Presets Library */}
        <aside
          aria-label="Optical Glass Preset Library"
          className="lg:col-span-3 flex flex-col gap-3"
        >
          <div className="rounded-2xl border border-white/90 bg-white/85 p-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#1E2432]/10 pb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1E2432]">
                Preset Library (06)
              </h2>
              <span className="font-mono text-[11px] text-[#657187]">WEBGL2</span>
            </div>

            <div className="mt-3 space-y-2">
              {GLASS_PRESET_LIST.map((preset) => {
                const isSelected = preset.id === selectedPresetId;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => selectPreset(preset.id)}
                    aria-pressed={isSelected}
                    className={`w-full rounded-xl p-3 text-left transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#252C43] text-white border-[#252C43] shadow-sm'
                        : 'bg-[#F8F9FC] text-[#1E2432] border-white hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold">{preset.name}</span>
                      <span
                        className={`font-mono text-[10px] uppercase ${
                          isSelected ? 'text-[#C9DAFA]' : 'text-[#657187]'
                        }`}
                      >
                        {preset.material.glassType}
                      </span>
                    </div>
                    <p
                      className={`mt-1 text-[11px] line-clamp-2 ${
                        isSelected ? 'text-white/80' : 'text-[#657187]'
                      }`}
                    >
                      {preset.subtitle} · {preset.recommendedSection}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* CENTER COLUMN (5 cols): Live WebGL Canvas Preview & Viewport Toolbar */}
        <section
          aria-label="Live WebGL Glass Viewport"
          className="lg:col-span-5 flex flex-col gap-4"
        >
          {/* Viewport Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/90 bg-white/85 px-4 py-2.5 shadow-xs">
            {/* Aspect Ratio Selector */}
            <div className="flex items-center gap-1" role="group" aria-label="Aspect Ratio">
              {EXPORT_ASPECT_RATIOS.map((ar) => (
                <button
                  key={ar.id}
                  type="button"
                  aria-pressed={aspectRatio === ar.id}
                  onClick={() => setAspectRatio(ar.id)}
                  className={`rounded-lg px-2.5 py-1 font-mono text-xs font-medium transition-colors cursor-pointer ${
                    aspectRatio === ar.id
                      ? 'bg-[#252C43] text-white'
                      : 'text-[#657187] hover:text-[#1E2432] hover:bg-[#F0F3FA]'
                  }`}
                >
                  {ar.id}
                </button>
              ))}
            </div>

            {/* Playback & Overlay Controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-pressed={isPaused}
                onClick={() => setIsPaused((prev) => !prev)}
                className="inline-flex items-center gap-1 rounded-lg border border-[#1E2432]/15 bg-[#F8F9FC] px-2.5 py-1.5 text-xs font-medium text-[#1E2432] hover:bg-white cursor-pointer"
              >
                {isPaused ? (
                  <>
                    <Play className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Play</span>
                  </>
                ) : (
                  <>
                    <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Pause</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => glassRef.current?.resetAnimationTime()}
                aria-label="Reset animation loop"
                className="inline-flex items-center gap-1 rounded-lg border border-[#1E2432]/15 bg-[#F8F9FC] px-2.5 py-1.5 text-xs font-medium text-[#1E2432] hover:bg-white cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                aria-pressed={showSafeArea}
                onClick={() => setShowSafeArea((prev) => !prev)}
                className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium cursor-pointer ${
                  showSafeArea
                    ? 'border-[#252C43] bg-[#252C43] text-white'
                    : 'border-[#1E2432]/15 bg-[#F8F9FC] text-[#1E2432] hover:bg-white'
                }`}
              >
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Safe Area</span>
              </button>
            </div>
          </div>

          {/* Live WebGL Stage Container */}
          <div className="flex flex-1 items-center justify-center rounded-3xl border border-white/95 bg-[#E6ECF8]/60 p-4 shadow-inner">
            <div
              className={`relative w-full overflow-hidden rounded-2xl border border-white shadow-lg ${getPreviewContainerAspectClass()}`}
            >
              <GlassBackground
                ref={glassRef}
                preset={selectedPresetId}
                configOverrides={{
                  material: config.material,
                  scene: config.scene,
                }}
                paused={isPaused}
                transparentExport={transparentMode}
                interactive
                quality="high"
                renderMode="live"
              />

              {/* Optional Safe-Area Overlay for Marketing Text Legibility */}
              {showSafeArea && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-6 rounded-xl border border-dashed border-[#1E2432]/35 p-6 flex flex-col justify-between"
                >
                  <div className="max-w-xs rounded-xl bg-white/75 p-4">
                    <div className="font-mono text-[10px] font-semibold text-[#657187]">
                      SAFE AREA OVERLAY · HERO COPY ZONE
                    </div>
                    <div className="mt-1 text-lg font-bold text-[#1E2432]">
                      Make repetitive work a thing of the past.
                    </div>
                    <div className="mt-1 text-xs text-[#657187]">
                      Verify contrast and optical calm behind headline and email capture form.
                    </div>
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-[#1E2432]/70">
                    <span>LEFT: TYPOGRAPHY ZONE</span>
                    <span>RIGHT: PRIMARY GLASS SCULPTURE</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preset Description Footer */}
          <div className="rounded-2xl border border-white/90 bg-white/85 p-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#1E2432]">{config.name}</span>
              <span className="font-mono text-[#657187]">
                SEED: {config.scene.seed} · LOOP: {config.scene.loopDurationSec}S
              </span>
            </div>
            <p className="mt-1 text-[#657187] leading-relaxed">{config.description}</p>
          </div>
        </section>

        {/* RIGHT COLUMN (4 cols): Real-Time Material Controls, Scene Controls & Asset Export */}
        <aside
          aria-label="Material Controls and Asset Export"
          className="lg:col-span-4 flex flex-col rounded-2xl border border-white/90 bg-white/90 p-5 shadow-xs"
        >
          {/* Right Column Mode Tabs */}
          <div
            role="tablist"
            aria-label="Studio Inspector Tabs"
            className="grid grid-cols-3 gap-1 rounded-xl bg-[#F0F3FA] p-1"
          >
            <button
              role="tab"
              type="button"
              aria-selected={rightTab === 'material'}
              onClick={() => setRightTab('material')}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all cursor-pointer ${
                rightTab === 'material'
                  ? 'bg-white text-[#1E2432] shadow-xs'
                  : 'text-[#657187] hover:text-[#1E2432]'
              }`}
            >
              <Sliders className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Optical</span>
            </button>
            <button
              role="tab"
              type="button"
              aria-selected={rightTab === 'scene'}
              onClick={() => setRightTab('scene')}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all cursor-pointer ${
                rightTab === 'scene'
                  ? 'bg-white text-[#1E2432] shadow-xs'
                  : 'text-[#657187] hover:text-[#1E2432]'
              }`}
            >
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Geometry</span>
            </button>
            <button
              role="tab"
              type="button"
              aria-selected={rightTab === 'export'}
              onClick={() => setRightTab('export')}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all cursor-pointer ${
                rightTab === 'export'
                  ? 'bg-white text-[#1E2432] shadow-xs'
                  : 'text-[#657187] hover:text-[#1E2432]'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Export</span>
            </button>
          </div>

          {/* TAB 1: OPTICAL MATERIAL PARAMETERS */}
          {rightTab === 'material' && (
            <div className="mt-4 space-y-4 overflow-y-auto pr-1 max-h-[600px]">
              {/* 3 Glass Treatments: Clear, Frosted, Opal */}
              <div>
                <span className="block font-mono text-[11px] font-semibold uppercase text-[#657187]">
                  Glass Material Treatment
                </span>
                <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                  {(['clear', 'frosted', 'opal'] as GlassTreatment[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={config.material.glassType === t}
                      onClick={() => applyGlassTreatment(t)}
                      className={`rounded-lg py-2 text-xs font-semibold capitalize border transition-all cursor-pointer ${
                        config.material.glassType === t
                          ? 'bg-[#252C43] text-white border-[#252C43]'
                          : 'bg-[#F8F9FC] text-[#1E2432] border-[#1E2432]/10 hover:bg-white'
                      }`}
                    >
                      {t} Glass
                    </button>
                  ))}
                </div>
              </div>

              {/* 12 Optical Sliders */}
              {(
                [
                  { key: 'ior', label: 'Index of Refraction (IOR)', min: 1.1, max: 2.3, step: 0.02 },
                  { key: 'thickness', label: 'Material Thickness', min: 0.2, max: 2.8, step: 0.05 },
                  { key: 'refractionStrength', label: 'Refraction Strength', min: 0.0, max: 1.5, step: 0.05 },
                  { key: 'roughness', label: 'Surface Roughness', min: 0.0, max: 1.0, step: 0.02 },
                  { key: 'frosting', label: 'Frosting Diffusion', min: 0.0, max: 1.0, step: 0.02 },
                  { key: 'dispersion', label: 'Chromatic Dispersion', min: 0.0, max: 1.0, step: 0.02 },
                  { key: 'iridescence', label: 'Opal Iridescence', min: 0.0, max: 1.0, step: 0.02 },
                  { key: 'causticIntensity', label: 'Caustic Highlights', min: 0.0, max: 1.5, step: 0.05 },
                  { key: 'fresnelIntensity', label: 'Fresnel Reflectance', min: 0.2, max: 2.0, step: 0.05 },
                  { key: 'edgeHighlight', label: 'Bevel Edge Highlight', min: 0.2, max: 2.0, step: 0.05 },
                  { key: 'transmission', label: 'Internal Transmission', min: 0.3, max: 1.0, step: 0.02 },
                  { key: 'microtexture', label: 'Microtexture Grain', min: 0.0, max: 1.0, step: 0.02 },
                ] as {
                  key: keyof GlassPresetConfig['material'];
                  label: string;
                  min: number;
                  max: number;
                  step: number;
                }[]
              ).map((slider) => {
                const val = Number(config.material[slider.key]);
                return (
                  <div key={slider.key}>
                    <div className="flex items-center justify-between text-xs">
                      <label htmlFor={`slider-${slider.key}`} className="font-medium text-[#1E2432]">
                        {slider.label}
                      </label>
                      <span className="font-mono text-[11px] text-[#657187]">
                        {val.toFixed(2)}
                      </span>
                    </div>
                    <input
                      id={`slider-${slider.key}`}
                      type="range"
                      min={slider.min}
                      max={slider.max}
                      step={slider.step}
                      value={val}
                      onChange={(e) =>
                        updateMaterialParam(slider.key, parseFloat(e.target.value))
                      }
                      className="mt-1 w-full accent-[#252C43] cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: SCENE, MOTION & SEED PARAMETERS */}
          {rightTab === 'scene' && (
            <div className="mt-4 space-y-4 overflow-y-auto pr-1 max-h-[600px]">
              {(
                [
                  { key: 'lightingIntensity', label: 'Studio Lighting Intensity', min: 0.5, max: 1.8, step: 0.05 },
                  { key: 'motionSpeed', label: 'Sculpture Motion Speed', min: 0.0, max: 2.0, step: 0.05 },
                  { key: 'distortionStrength', label: 'Wave Deformation', min: 0.0, max: 1.2, step: 0.05 },
                  { key: 'shapeDensity', label: 'Sculptural Layer Density', min: 1, max: 5, step: 1 },
                  { key: 'scale', label: 'Sculpture Scale', min: 0.6, max: 1.5, step: 0.05 },
                  { key: 'positionX', label: 'Horizontal Offset (X)', min: -0.8, max: 0.8, step: 0.04 },
                  { key: 'positionY', label: 'Vertical Offset (Y)', min: -0.6, max: 0.6, step: 0.04 },
                ] as {
                  key: keyof GlassPresetConfig['scene'];
                  label: string;
                  min: number;
                  max: number;
                  step: number;
                }[]
              ).map((slider) => {
                const val = Number(config.scene[slider.key]);
                return (
                  <div key={slider.key}>
                    <div className="flex items-center justify-between text-xs">
                      <label htmlFor={`scene-${slider.key}`} className="font-medium text-[#1E2432]">
                        {slider.label}
                      </label>
                      <span className="font-mono text-[11px] text-[#657187]">
                        {slider.step === 1 ? val : val.toFixed(2)}
                      </span>
                    </div>
                    <input
                      id={`scene-${slider.key}`}
                      type="range"
                      min={slider.min}
                      max={slider.max}
                      step={slider.step}
                      value={val}
                      onChange={(e) =>
                        updateSceneParam(slider.key, parseFloat(e.target.value))
                      }
                      className="mt-1 w-full accent-[#252C43] cursor-pointer"
                    />
                  </div>
                );
              })}

              {/* Deterministic Seed Input */}
              <div className="pt-2 border-t border-[#1E2432]/10">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="scene-seed-input" className="font-semibold text-[#1E2432]">
                    Deterministic Seed
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      updateSceneParam('seed', Math.floor(1000 + Math.random() * 8999))
                    }
                    className="inline-flex items-center gap-1 font-mono text-[11px] font-medium text-[#252C43] hover:underline cursor-pointer"
                  >
                    <Shuffle className="h-3 w-3" aria-hidden="true" />
                    <span>Randomize</span>
                  </button>
                </div>
                <input
                  id="scene-seed-input"
                  type="number"
                  value={config.scene.seed}
                  onChange={(e) =>
                    updateSceneParam('seed', parseInt(e.target.value || '1042', 10))
                  }
                  className="mt-1.5 w-full rounded-xl border border-[#1E2432]/15 bg-[#F8F9FC] px-3 py-2 font-mono text-xs text-[#1E2432]"
                />
              </div>

              <button
                type="button"
                onClick={() => selectPreset(selectedPresetId)}
                className="w-full rounded-xl border border-[#1E2432]/15 bg-[#F8F9FC] py-2.5 text-xs font-semibold text-[#1E2432] hover:bg-white cursor-pointer"
              >
                Reset Preset Defaults
              </button>
            </div>
          )}

          {/* TAB 3: ASSET EXPORT & REACT CODE */}
          {rightTab === 'export' && (
            <div className="mt-4 space-y-4 overflow-y-auto pr-1 max-h-[600px]">
              {/* Target Resolution Selector */}
              <div>
                <label
                  htmlFor="export-resolution-select"
                  className="block font-mono text-[11px] font-semibold uppercase text-[#657187]"
                >
                  Target Export Resolution
                </label>
                <select
                  id="export-resolution-select"
                  value={resolutionId}
                  onChange={(e) => setResolutionId(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#1E2432]/15 bg-[#F8F9FC] px-3 py-2.5 text-xs font-medium text-[#1E2432]"
                >
                  {EXPORT_RESOLUTIONS.map((res) => (
                    <option key={res.id} value={res.id}>
                      {res.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Opaque vs Transparent Export Toggle */}
              <div className="rounded-xl border border-[#1E2432]/10 bg-[#F8F9FC] p-3">
                <label className="flex items-center justify-between gap-2 text-xs font-semibold text-[#1E2432] cursor-pointer">
                  <span>Export with Alpha Transparency</span>
                  <input
                    type="checkbox"
                    checked={transparentMode}
                    onChange={(e) => setTransparentMode(e.target.checked)}
                    className="h-4 w-4 accent-[#252C43]"
                  />
                </label>
                <p className="mt-1 text-[11px] text-[#657187] leading-relaxed">
                  {transparentMode
                    ? 'Transparent export isolates the glass geometry, Fresnel bevel highlights, and caustics into an alpha PNG/WebP overlay.'
                    : 'Opaque export bakes in the full refracted photography studio environment behind the glass.'}
                </p>
              </div>

              {/* Still Image Export Buttons (PNG & WebP) */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleExportStill('image/png')}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#252C43] px-3.5 py-2.5 text-xs font-semibold text-white hover:bg-[#1E2432] cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Export PNG</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExportStill('image/webp')}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#252C43]/25 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1E2432] hover:bg-[#F8F9FC] cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Export WebP</span>
                </button>
              </div>

              {/* Looping WebM Video Export */}
              <button
                type="button"
                disabled={isRecordingWebm}
                onClick={handleExportWebM}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-[#1E2432]/15 bg-[#F8F9FC] px-4 py-2.5 text-xs font-semibold text-[#1E2432] hover:bg-white disabled:opacity-60 cursor-pointer"
              >
                <Film className="h-3.5 w-3.5" aria-hidden="true" />
                <span>
                  {isRecordingWebm ? 'Recording 4s WebM Loop...' : 'Record 4s Looping WebM'}
                </span>
              </button>

              {exportStatus && (
                <div
                  role="status"
                  className="rounded-xl bg-[#5BA59A]/15 px-3 py-2 font-mono text-[11px] font-medium text-[#1E2432]"
                >
                  {exportStatus}
                </div>
              )}

              {/* Live React Component Snippet */}
              <div className="pt-2 border-t border-[#1E2432]/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1E2432]">React Component Usage</span>
                  <button
                    type="button"
                    onClick={() => handleCopySnippet('jsx')}
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-[#252C43] hover:underline cursor-pointer"
                  >
                    {copiedCode === 'jsx' ? (
                      <>
                        <Check className="h-3 w-3 text-[#5BA59A]" aria-hidden="true" />
                        <span>Copied JSX</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" aria-hidden="true" />
                        <span>Copy JSX</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="mt-1.5 overflow-x-auto rounded-xl bg-[#1E2432] p-3 font-mono text-[11px] text-[#F8F9FC]">
                  {generateReactComponentSnippet(config)}
                </pre>
              </div>

              {/* Serialized Preset JSON */}
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1E2432]">Preset Configuration JSON</span>
                  <button
                    type="button"
                    onClick={() => handleCopySnippet('json')}
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-[#252C43] hover:underline cursor-pointer"
                  >
                    {copiedCode === 'json' ? (
                      <>
                        <Check className="h-3 w-3 text-[#5BA59A]" aria-hidden="true" />
                        <span>Copied JSON</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" aria-hidden="true" />
                        <span>Copy JSON</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
};

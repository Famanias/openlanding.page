"use client";

import { useState } from "react";
import { validateCommissionForm, type CommissionFormData } from "./validate-commission";

export function CommissionForm() {
  const [formData, setFormData] = useState<CommissionFormData>({
    fullName: "",
    email: "",
    installationScale: "",
    wavelengthBand: "",
    targetDate: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CommissionFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateCommissionForm(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="w-full max-w-2xl mx-auto rounded-lg ir-glass-panel p-8 text-center space-y-4"
      >
        <div className="w-12 h-12 mx-auto rounded-full bg-[#00F0FF]/10 border border-[#00F0FF] flex items-center justify-center">
          <span className="text-[#00F0FF] text-xl font-bold">✓</span>
        </div>
        <h3 className="font-display text-2xl font-bold text-[#F5F3EF]">
          Commission Dossier Transmitted
        </h3>
        <p className="text-sm text-[#8D93A8] leading-relaxed">
          Thank you, <strong className="text-[#F5F3EF]">{formData.fullName}</strong>. Your installation parameters
          for the <span className="text-[#00F0FF]">{formData.installationScale}</span> scale project
          targeting <span className="text-[#FFE600]">{formData.wavelengthBand}</span> spectra have been registered at our Zurich studio.
        </p>
        <p className="text-xs font-mono text-[#8D93A8]">
          Project consultation dispatch scheduled for: {formData.targetDate}. A formal technical brief has been dispatched to {formData.email}.
        </p>
        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              fullName: "",
              email: "",
              installationScale: "",
              wavelengthBand: "",
              targetDate: "",
              notes: "",
            });
          }}
          className="ir-btn-secondary text-xs mt-4"
        >
          Submit Another Commission
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-2xl mx-auto rounded-lg ir-glass-panel p-6 sm:p-8 lg:p-10 space-y-6"
      aria-label="Commission Intake Form"
    >
      {/* Full Name */}
      <div className="space-y-1.5">
        <label htmlFor="comm-name" className="block text-xs font-mono text-[#F5F3EF]">
          FULL NAME / STUDIO LEAD <span className="text-[#00F0FF]">*</span>
        </label>
        <input
          id="comm-name"
          type="text"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "name-error" : undefined}
          placeholder="e.g. Dr. Hélène Vane"
          className="w-full bg-[#0A0B10] border border-[#8D93A8]/30 rounded px-3.5 py-2.5 text-sm text-[#F5F3EF] placeholder-[#8D93A8]/50 focus:border-[#00F0FF] transition-colors"
        />
        {errors.fullName && (
          <p id="name-error" className="text-xs font-mono text-[#FF4D00] mt-1" role="alert">
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label htmlFor="comm-email" className="block text-xs font-mono text-[#F5F3EF]">
          INSTITUTIONAL OR WORK EMAIL <span className="text-[#00F0FF]">*</span>
        </label>
        <input
          id="comm-email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          placeholder="helene.vane@architecture-basel.ch"
          className="w-full bg-[#0A0B10] border border-[#8D93A8]/30 rounded px-3.5 py-2.5 text-sm text-[#F5F3EF] placeholder-[#8D93A8]/50 focus:border-[#00F0FF] transition-colors"
        />
        {errors.email && (
          <p id="email-error" className="text-xs font-mono text-[#FF4D00] mt-1" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Grid: Scale & Wavelength */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Installation Scale */}
        <div className="space-y-1.5">
          <label htmlFor="comm-scale" className="block text-xs font-mono text-[#F5F3EF]">
            SCALE TIER <span className="text-[#00F0FF]">*</span>
          </label>
          <select
            id="comm-scale"
            value={formData.installationScale}
            onChange={(e) =>
              setFormData({
                ...formData,
                installationScale: e.target.value as CommissionFormData["installationScale"],
              })
            }
            aria-invalid={!!errors.installationScale}
            aria-describedby={errors.installationScale ? "scale-error" : undefined}
            className="w-full bg-[#0A0B10] border border-[#8D93A8]/30 rounded px-3.5 py-2.5 text-sm text-[#F5F3EF] focus:border-[#00F0FF] transition-colors cursor-pointer"
          >
            <option value="" disabled>Select scale tier</option>
            <option value="monumental">Monumental (12m+ Crystal Facade)</option>
            <option value="pavilion">Pavilion (Freestanding Glass Dome)</option>
            <option value="gallery">Gallery (Suspended Prism Array)</option>
            <option value="digital">Digital (Spatial LED / WebGL Mesh)</option>
          </select>
          {errors.installationScale && (
            <p id="scale-error" className="text-xs font-mono text-[#FF4D00] mt-1" role="alert">
              {errors.installationScale}
            </p>
          )}
        </div>

        {/* Wavelength Band */}
        <div className="space-y-1.5">
          <label htmlFor="comm-band" className="block text-xs font-mono text-[#F5F3EF]">
            OPTICAL SPECTRUM <span className="text-[#00F0FF]">*</span>
          </label>
          <select
            id="comm-band"
            value={formData.wavelengthBand}
            onChange={(e) =>
              setFormData({
                ...formData,
                wavelengthBand: e.target.value as CommissionFormData["wavelengthBand"],
              })
            }
            aria-invalid={!!errors.wavelengthBand}
            aria-describedby={errors.wavelengthBand ? "band-error" : undefined}
            className="w-full bg-[#0A0B10] border border-[#8D93A8]/30 rounded px-3.5 py-2.5 text-sm text-[#F5F3EF] focus:border-[#00F0FF] transition-colors cursor-pointer"
          >
            <option value="" disabled>Select wavelength</option>
            <option value="solar">Solar Dispersion (589nm Amber / Daylight)</option>
            <option value="auroral">Auroral Viridian (532nm Cold Cyan)</option>
            <option value="laser">Ruby Resonance (650nm High Coherence)</option>
            <option value="broadband">Full Visible Octave (380–700nm)</option>
          </select>
          {errors.wavelengthBand && (
            <p id="band-error" className="text-xs font-mono text-[#FF4D00] mt-1" role="alert">
              {errors.wavelengthBand}
            </p>
          )}
        </div>
      </div>

      {/* Target Date */}
      <div className="space-y-1.5">
        <label htmlFor="comm-date" className="block text-xs font-mono text-[#F5F3EF]">
          PROPOSED INSTALLATION DATE <span className="text-[#00F0FF]">*</span>
        </label>
        <input
          id="comm-date"
          type="date"
          value={formData.targetDate}
          onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
          aria-invalid={!!errors.targetDate}
          aria-describedby={errors.targetDate ? "date-error" : undefined}
          className="w-full bg-[#0A0B10] border border-[#8D93A8]/30 rounded px-3.5 py-2.5 text-sm text-[#F5F3EF] focus:border-[#00F0FF] transition-colors cursor-pointer"
        />
        {errors.targetDate && (
          <p id="date-error" className="text-xs font-mono text-[#FF4D00] mt-1" role="alert">
            {errors.targetDate}
          </p>
        )}
      </div>

      {/* Project Notes */}
      <div className="space-y-1.5">
        <label htmlFor="comm-notes" className="block text-xs font-mono text-[#8D93A8]">
          ARCHITECTURAL CONTEXT &amp; SITE NOTES (OPTIONAL)
        </label>
        <textarea
          id="comm-notes"
          rows={3}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Specify daylight azimuth, facade orientation, structural load limits, or glass specifications..."
          className="w-full bg-[#0A0B10] border border-[#8D93A8]/30 rounded px-3.5 py-2.5 text-sm text-[#F5F3EF] placeholder-[#8D93A8]/50 focus:border-[#00F0FF] transition-colors resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full ir-btn-primary py-3 text-sm uppercase tracking-wider font-semibold cursor-pointer"
      >
        Transmit Commission Specification →
      </button>

      <p className="text-[11px] font-mono text-center text-[#8D93A8]/80">
        CLIENT-SIDE ENCRYPTION · ZERO EXTERNAL TELEMETRY · ZURICH &amp; KYOTO ARCHIVES
      </p>
    </form>
  );
}

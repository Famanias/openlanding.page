"use client";

import { useState } from "react";
import {
  validateRequisition,
  type RequisitionFormData,
  type RequisitionErrors,
} from "./validate-requisition";

export function RequisitionForm() {
  const [formData, setFormData] = useState<RequisitionFormData>({
    memberName: "",
    memberEmail: "",
    tradeDiscipline: "woodworking",
    loanDuration: 3,
    workshopInductionCertified: false,
    notes: "",
  });

  const [errors, setErrors] = useState<RequisitionErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateRequisition(formData);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Client-side simulated hold generation (zero network requests)
    setTimeout(() => {
      const code = `LH-${Math.floor(1000 + Math.random() * 9000)}-BAY${Math.floor(1 + Math.random() * 12)}`;
      setConfirmationCode(code);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 280);
  };

  if (isSubmitted) {
    return (
      <div className="lh-form-success" role="status" tabIndex={-1} aria-live="polite">
        <div className="lh-success-badge">REQUISITION CONFIRMED ✓</div>
        <h3 className="lh-success-title">Hold Voucher Generated</h3>
        <p className="lh-success-code">VOUCHER ID: {confirmationCode}</p>

        <div className="lh-success-details">
          <div className="lh-success-row">
            <span>Member:</span>
            <strong>{formData.memberName}</strong>
          </div>
          <div className="lh-success-row">
            <span>Contact Email:</span>
            <strong>{formData.memberEmail}</strong>
          </div>
          <div className="lh-success-row">
            <span>Loan Duration:</span>
            <strong>{formData.loanDuration} Days (Hold window active)</strong>
          </div>
          <div className="lh-success-row">
            <span>Pickup Bay:</span>
            <strong>Foundry Way Depot · Smart Locker #04</strong>
          </div>
        </div>

        <p className="lh-success-note">
          Your equipment has been locked for collection. Present this voucher or enter PIN on the smart locker keypad.
        </p>

        <button
          type="button"
          className="lh-btn lh-btn-secondary"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              memberName: "",
              memberEmail: "",
              tradeDiscipline: "woodworking",
              loanDuration: 3,
              workshopInductionCertified: false,
              notes: "",
            });
          }}
        >
          Submit Another Requisition
        </button>
      </div>
    );
  }

  return (
    <form className="lh-requisition-form" onSubmit={handleSubmit} noValidate>
      {/* Member Name */}
      <div className="lh-form-group">
        <label htmlFor="lh-member-name" className="lh-form-label">
          Member Name or Guild Badge ID <span className="lh-required">*</span>
        </label>
        <input
          id="lh-member-name"
          type="text"
          className={`lh-form-input ${errors.memberName ? "is-invalid" : ""}`}
          placeholder="e.g. Alex Mercer (LH-482)"
          value={formData.memberName}
          onChange={(e) => setFormData({ ...formData, memberName: e.target.value })}
          aria-describedby={errors.memberName ? "error-member-name" : undefined}
        />
        {errors.memberName && (
          <p id="error-member-name" className="lh-form-error" role="alert">
            {errors.memberName}
          </p>
        )}
      </div>

      {/* Member Email */}
      <div className="lh-form-group">
        <label htmlFor="lh-member-email" className="lh-form-label">
          Verification Contact Email <span className="lh-required">*</span>
        </label>
        <input
          id="lh-member-email"
          type="email"
          className={`lh-form-input ${errors.memberEmail ? "is-invalid" : ""}`}
          placeholder="alex@neighborhood.org"
          value={formData.memberEmail}
          onChange={(e) => setFormData({ ...formData, memberEmail: e.target.value })}
          aria-describedby={errors.memberEmail ? "error-member-email" : undefined}
        />
        {errors.memberEmail && (
          <p id="error-member-email" className="lh-form-error" role="alert">
            {errors.memberEmail}
          </p>
        )}
      </div>

      {/* Trade Category Selection */}
      <div className="lh-form-group">
        <label htmlFor="lh-trade-category" className="lh-form-label">
          Primary Trade Discipline <span className="lh-required">*</span>
        </label>
        <select
          id="lh-trade-category"
          className={`lh-form-select ${errors.tradeDiscipline ? "is-invalid" : ""}`}
          value={formData.tradeDiscipline}
          onChange={(e) => setFormData({ ...formData, tradeDiscipline: e.target.value })}
          aria-describedby={errors.tradeDiscipline ? "error-trade-category" : undefined}
        >
          <option value="woodworking">01 // Joinery &amp; Woodworking</option>
          <option value="metal">02 // Metalworking &amp; Machinery</option>
          <option value="masonry">03 // Masonry &amp; Rigging</option>
          <option value="cordless">04 // Field Cordless Diagnostics</option>
        </select>
        {errors.tradeDiscipline && (
          <p id="error-trade-category" className="lh-form-error" role="alert">
            {errors.tradeDiscipline}
          </p>
        )}
      </div>

      {/* Loan Days Range Slider */}
      <div className="lh-form-group">
        <div className="lh-form-label-row">
          <label htmlFor="lh-loan-duration" className="lh-form-label">
            Requested Loan Window:
          </label>
          <span className="lh-form-range-val">
            {formData.loanDuration} {formData.loanDuration === 1 ? "Day" : "Days"}
          </span>
        </div>
        <input
          id="lh-loan-duration"
          type="range"
          min={1}
          max={14}
          value={formData.loanDuration}
          onChange={(e) => setFormData({ ...formData, loanDuration: Number(e.target.value) })}
          className="lh-form-range"
        />
        <div className="lh-range-markers" aria-hidden="true">
          <span>1 Day</span>
          <span>7 Days</span>
          <span>14 Days (Max)</span>
        </div>
        {errors.loanDuration && (
          <p className="lh-form-error" role="alert">
            {errors.loanDuration}
          </p>
        )}
      </div>

      {/* Safety Compliance Checkbox */}
      <div className="lh-form-checkbox-group">
        <input
          id="lh-safety-check"
          type="checkbox"
          checked={formData.workshopInductionCertified}
          onChange={(e) => setFormData({ ...formData, workshopInductionCertified: e.target.checked })}
          className="lh-checkbox"
          aria-describedby={errors.workshopInductionCertified ? "error-safety-check" : undefined}
        />
        <label htmlFor="lh-safety-check" className="lh-checkbox-label">
          I confirm that I have completed the basic tool induction safety checklist and agree to return all tools
          cleaned with guards in place.
        </label>
      </div>
      {errors.workshopInductionCertified && (
        <p id="error-safety-check" className="lh-form-error" role="alert">
          {errors.workshopInductionCertified}
        </p>
      )}

      {/* Notes / Project Details */}
      <div className="lh-form-group">
        <label htmlFor="lh-project-notes" className="lh-form-label">
          Project Notes or Special Tooling Requests (Optional)
        </label>
        <textarea
          id="lh-project-notes"
          rows={3}
          maxLength={400}
          className="lh-form-textarea"
          placeholder="e.g. Need 8mm collet adapter and 1400mm track rail connectors."
          value={formData.notes || ""}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="lh-btn lh-btn-primary w-full" disabled={isSubmitting}>
        {isSubmitting ? "Locking Equipment..." : "Confirm Requisition Hold →"}
      </button>
    </form>
  );
}

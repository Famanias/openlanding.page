"use client";

import React, { useState } from "react";

export function EncryptionWidget() {
  const [isEncrypted, setIsEncrypted] = useState<boolean>(true);

  return (
    <div className="bg-[#FAF8F5] rounded-xl p-4 md:p-5 border border-[#E5DDD4] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5DDD4]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ECE6F6] text-[#4B3878] flex items-center justify-center font-bold text-sm shadow-xs">
              🛡️
            </div>
            <div>
              <div className="text-xs font-bold text-[#121417]">Client Cryptography</div>
              <div className="text-[10px] text-[#666E7D]">AES-GCM-256 local key store</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsEncrypted((prev) => !prev)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              isEncrypted
                ? "bg-[#D8EADF] text-[#216143] border border-[#216143]/20"
                : "bg-[#FCE8DC] text-[#8A3E1B] border border-[#8A3E1B]/20"
            }`}
          >
            {isEncrypted ? "E2EE Active" : "Unsealed"}
          </button>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E5DDD4] rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#666E7D]">Zero Telemetry Policy</span>
            <span className="font-bold text-[#216143]">Enforced</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#666E7D]">Email Body Encryption</span>
            <span className="font-bold text-[#121417]">{isEncrypted ? "Client-Only Decrypt" : "Plaintext Cached"}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#666E7D]">Target Contact Scraping</span>
            <span className="font-bold text-[#121417]">Zero Third-Party Sync</span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-[10px] text-[#666E7D] text-center">
        Toggle state to simulate client-side cryptographic isolation.
      </div>
    </div>
  );
}

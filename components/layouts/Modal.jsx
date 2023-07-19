"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

function Modal({ open, onClose, children }) {
  const [isOpen, setIsOpen] = useState(open);
  return (
    <div className={`${(!open || isOpen) && "hidden"} relative z-10 `}>
      <div className="fixed inset-0 bg-black bg-opacity-50">
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div className="flex p-4 relative bg-white w-full max-w-3xl overflow-hidden rounded-lg text-left align-middle">
              <div
                onClick={() => setIsOpen(false)}
                className="absolute right-4 cursor-pointer rounded-[50%] flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition"
              >
                <X size={15} />
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

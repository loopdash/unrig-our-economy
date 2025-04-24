import React from "react";

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null; // Don't render if closed

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose} // Clicking background closes modal
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h2 className="uppercase" style={{ color: "black", fontWeight: 600 , fontSize: "small"}}>
          How Did We Arrive at This Number?
        </h2>
        <p>
          Our price calculation is based on historical trends, real-time
          supplier data, and market analysis to provide accurate pricing
          insights.
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-[#E8EA58] text-black transition-transform duration-200 transform hover:scale-105 uppercase bold"

        >
          Got it!
        </button>
      </div>
    </div>
  );
}

export default Modal;

"use client";

const PrimaryButton = ({ text, onClick }) => {
  return (
    <button
      className="px-4 py-2 rounded-3xl transition font-medium
                bg-[var(--color-buttons)] text-[var(--color-button-text)] 
                hover:bg-[var(--color-secondary)]"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;

const ToggleSwitch = ({ isYearly, setIsYearly, labels }) => {
    return (
      <div className="flex justify-center max-w-[16rem] m-auto mb-10">
        <div
          className="relative flex w-full p-1 rounded-full shadow-md"
          style={{
            backgroundColor: "var(--color-background)",
            border: "2px solid var(--color-border)",
          }}
        >
          <span className="absolute inset-0 m-1 pointer-events-none">
            <span
              className={`absolute inset-0 w-1/2 rounded-full shadow-sm transition-transform duration-200 ease-in-out ${
                isYearly ? "translate-x-0" : "translate-x-full"
              }`}
              style={{ backgroundColor: "var(--color-primary)" }}
            />
          </span>
          <button
            className="relative flex-1 text-sm font-medium h-10 rounded-full transition-colors duration-150"
            style={{
              color: isYearly ? "var(--color-text-button-active)" : "var(--color-text-button-inactive)",
            }}
            onClick={() => setIsYearly(true)}
          >
            {labels.toggle.yearly}
          </button>
          <button
            className="relative flex-1 text-sm font-medium h-10 rounded-full transition-colors duration-150"
            style={{
              color: !isYearly ? "var(--color-text-button-active)" : "var(--color-text-button-inactive)",
            }}
            onClick={() => setIsYearly(false)}
          >
            {labels.toggle.monthly}
          </button>
        </div>
      </div>
    );
  };
  
  export default ToggleSwitch;
  
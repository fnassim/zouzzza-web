import { useState } from "react";
import usePaymentService from "../../hooks/usePaymentService";

const PayButton = ({ plan }) => {
  const { paymentProvider, createCheckout } = usePaymentService();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    await createCheckout({ plan });
    setLoading(false);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`w-full inline-flex justify-center rounded-lg px-4 py-3 text-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      style={{
        backgroundColor: "var(--color-primary)",
        color: "var(--color-text-light)",
      }}
    >
      {loading ? "Processing..." : `Purchase ${plan.details.name}`}
    </button>
  );
};

export default PayButton;

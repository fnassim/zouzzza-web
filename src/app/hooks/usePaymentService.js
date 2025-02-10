import fazzle from "../fazzle.json";

const usePaymentService = () => {
  const paymentProvider = fazzle.paymentProvider || "stripe";

  const createCheckout = async ({ plan }) => {
    if (!paymentProvider) {
      console.error("No payment provider available.");
      return;
    }

    let endpoint = `/api/pay/${paymentProvider}`;
    let requestBody = {};

    switch (paymentProvider) {
      case "stripe":
        requestBody = {
          priceId: plan.priceIdOneTime,
          mode: "payment",
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cancel`,
        };
        break;

       // Add other payment provider here

      default:
        console.error("Unsupported payment provider:", paymentProvider);
        return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (response.ok) {
        window.location.href = data.url;
      } else {
        console.error("Payment Error:", data.error);
        alert(data.error || "Payment failed.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to initiate checkout.");
    }
  };

  return { paymentProvider, createCheckout };
};

export default usePaymentService;

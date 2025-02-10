import PayButton from "../buttons/PayButton";

const PricingCard = ({ plan, isYearly, settings, labels }) => {
  const activePrice = settings.isOneTimePayment
    ? plan.pricing.oneTimePrice
    : isYearly
    ? plan.pricing.priceYearly
    : plan.pricing.priceMonthly;

  const originalPrice = plan.pricing.discountPercentage
    ? (activePrice / (1 - plan.pricing.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <div className="h-full">
      <div
        className="relative flex flex-col h-full p-8 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg"
        style={{
          backgroundColor: plan.details.mostPopular ? "var(--color-secondary)" : "var(--color-background)",
          color: plan.details.mostPopular ? "var(--color-text-light)" : "var(--color-text-primary)",
          border: plan.details.mostPopular ? "none" : "2px solid var(--color-border)",
        }}
      >
        {plan.details.mostPopular && (
          <div className="absolute -top-3 right-3">
            <div
              className="text-xs tracking-widest inline-flex items-center rounded-full py-1 px-4 text-sm font-medium"
              style={{
                backgroundColor: "var(--color-positive)",
                color: "var(--color-text-light)",
              }}
            >
              {labels.badges.mostPopular}
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="text-xl font-semibold">{plan.details.name}</div>
          <div className="inline-flex items-baseline mb-4">
            {originalPrice && (
              <span className="text-xl line-through mr-3" style={{ opacity: 0.7 }}>
                ${originalPrice}
              </span>
            )}
            <span className="font-bold text-3xl">$</span>
            <span className="font-bold text-5xl ml-1">{activePrice}</span>
            <span className="text-lg ml-1">
              {settings.isOneTimePayment ? "" : labels.priceSuffix}
            </span>
          </div>
          <p className="mb-6">
            {plan.details.description}
          </p>

          <PayButton plan={plan} />
        </div>

        <div className="font-medium mb-4">{labels.includes}</div>
        <ul className="text-sm space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg className="w-4 h-4 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" style={{ fill: "var(--color-positive)" }}>
                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;

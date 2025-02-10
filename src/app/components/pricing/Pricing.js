"use client";

import { useState } from "react";
import fazzle from "../../fazzle.json";
import Head from "next/head";
import ToggleSwitch from "./ToggleSwitch";
import PricingCard from "./PricingCard";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);
  const { pricingPlans, settings, labels } = fazzle.pricing;

  return (
    <div id="pricing">
      <Head>
        <title>Pricing - Choose Your Plan</title>
        <meta
          name="description"
          content="Compare our pricing plans and choose the best one for your needs."
        />
      </Head>

      <div className="max-w-6xl mx-auto">
        {!settings.isOneTimePayment && (
          <ToggleSwitch isYearly={isYearly} setIsYearly={setIsYearly} labels={labels} />
        )}

        <div className="grid gap-6 lg:grid-cols-3 items-start">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} isYearly={isYearly} settings={settings} labels={labels} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;

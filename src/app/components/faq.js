"use client";

import { useState } from "react";
import fazzle from "../fazzle.json";

const Faq = () => {
  const { faq } = fazzle;

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="flex justify-center items-center" id="faq">
      <div className="max-w-5xl w-full">
        {/* FAQ Title */}
        <div className="mb-12 text-center">
          <p className="text-[var(--color-primary)] font-semibold uppercase mb-4">
            {faq.title}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)]">
            {faq.description}
          </h2>
        </div>

        {/* FAQ List */}
        <ul className="">
          {faq.items.map((item, index) => (
            <li key={index} className="border-t border-[var(--color-border)]">
              <button
                className="relative flex gap-3 items-center w-full py-5 text-lg font-semibold text-left transition duration-300 text-[var(--color-primary)]"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="flex-1 text-[var(--color-typography)]">
                  {item.question}
                </span>
                {/* Icon */}
                <svg
                  className={`w-4 h-4 transition-transform duration-200`}
                  viewBox="0 0 16 16"
                  fill="var(--color-primary)"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Horizontal line (always visible) */}
                  <rect y="7" width="16" height="2" rx="1" />

                  {/* Vertical line (visible only when closed) */}
                  <rect
                    x="7"
                    width="2"
                    height="16"
                    rx="1"
                    className={`transform origin-center transition-opacity duration-200 ${
                      openIndex === index ? "opacity-0" : "opacity-100"
                    }`}
                  />
                </svg>
              </button>
              {/* Answer */}
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openIndex === index ? "500px" : "0",
                }}
              >
                <p className="pb-5  text-[var(--color-text-primary)] opacity-80 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Faq;

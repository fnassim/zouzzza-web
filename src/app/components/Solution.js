"use client";

import fazzle from "../fazzle.json";
import Image from "next/image";

const Solution = () => {
  const { solutionSection } = fazzle;

  return (
    <section className="max-w-screen-xl mx-auto overflow-hidden text-center sm:text-left">
      {solutionSection.map((item, index) => (
        <div
        key={index}
        className={`flex flex-col md:flex-row items-center justify-between ${
          index !== solutionSection.length - 1 ? "mb-16" : ""
        } ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
      >
          {/* Text Content */}
          <div className="md:w-1/3">
            <h2 className="text-5xl tracking-wide font-medium text-[var(--color-text-primary)] mb-4">
              {item.title}
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] opacity-80 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Image */}
          <div className="md:w-1/2 mt-6 sm:mt-0">
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={600}
              height={400}
              loading="eager"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default Solution;

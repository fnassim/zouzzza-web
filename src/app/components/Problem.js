"use client";

import fazzle from "../fazzle.json";

const Problem = () => {
  const { problemSection } = fazzle;

  return (
    <section className="max-w-6xl mx-auto lg:px-12 py-12">
      {/* Title & Description */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          {problemSection.title.map((word, index) =>
            word.isGradient ? (
              <span
                key={index}
                className="bg-gradient-to-r from-[var(--color-gradient-start)] 
                to-[var(--color-gradient-end)] text-transparent bg-clip-text"
              >
                {word.text}{" "}
              </span>
            ) : (
              <span key={index} className="text-[var(--color-text-primary)]">
                {word.text}{" "}
              </span>
            )
          )}
        </h2>
        <p className="mt-4 text-lg text-[var(--color-text-primary)] opacity-80">
          {problemSection.description}
        </p>
      </div>

      {/* Problem & Solution Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Before Databox (Problem) */}
        <div className="p-8 border-2 border-[var(--color-border)] rounded-xl bg-[var(--color-background)] shadow-lg">
          <h3 className="font-semibold text-md tracking-widest text-[var(--color-text-primary)] mb-4 uppercase">
            {problemSection.problem.title}
          </h3>
          <ul className="space-y-3 text-[var(--color-text-primary)]">
            {problemSection.problem.points.map((point, index) => (
              <li key={index} className="flex items-center">
                <span className="text-red-500 font-bold text-lg mr-2">✖</span>{" "}
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* After Databox (Solution) */}
        <div
          className="p-8 border border-[var(--color-border)] rounded-xl 
          bg-[var(--color-secondary)] 
          text-white shadow-lg"
        >
          <h3 className="font-semibold text-md uppercase tracking-widest text-[var(--color-text-light)] mb-4">
            {problemSection.solution.title}
          </h3>
          <ul className="space-y-3">
            {problemSection.solution.points.map((point, index) => (
              <li key={index} className="flex items-center">
                <svg
                  className="w-4 h-4 mr-3 shrink-0"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ fill: "var(--color-positive)" }}
                >
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>{" "}
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Problem;

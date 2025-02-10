"use client";

import fazzle from "../fazzle.json";
import Image from "next/image";
import PrimaryButton from "./buttons/PrimaryButton";

const Hero = () => {

return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between w-full" id="hero">
      {/* Left Text Content */}
      <div className="max-w-2xl text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mt-8 lg:mt-0">
          {fazzle.heroSection.title.map((word, index) =>
            word.isGradient ? (
              <span
                key={index}
                className="bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] text-transparent bg-clip-text"
              >
                {word.text}{" "}
              </span>
            ) : (
              <span key={index} className="text-[var(--color-text-primary)]">
                {word.text}{" "}
              </span>
            )
          )}
        </h1>
        <p className="relative mt-4 text-lg text-[var(--color-text-primary)] opacity-80">
          {fazzle.heroSection.description}
        </p>
        <div className="mt-6">
          <PrimaryButton text={fazzle.heroSection.buttonText} onClick={() => {}}/>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full max-w-md lg:max-w-lg 2xl:max-w-xl  flex justify-center">
        <Image
          src={fazzle.heroSection.imageUrl}
          alt="Hero Image"
          width={400}
          height={400}
          loading="eager"
          className="w-full rounded-md"
        />
      </div>
    </section>
  );
};

export default Hero;

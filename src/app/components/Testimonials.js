"use client";

import fazzle from "../fazzle.json";
import Image from "next/image";
import Head from "next/head";

const Testimonials = () => {
  const { testimonials } = fazzle;

  return (
    <div className="w-full" id="testimonials">
      <section
        className="text-[var(--color-primary)] bg-[var(--color-background)]"
        id="reviews"
      >
        <div className="max-w-7xl mx-auto md:px-12 xl:px-6">
          {/* Section Title */}
          <div className="mb-10 space-y-4 px-6 md:px-0">
            <h2 className="text-center text-2xl font-bold md:text-4xl">
              {testimonials.sectionTitle}
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="md:columns-2 lg:columns-3 gap-8 space-y-8">
            {testimonials.reviews.map((review, index) => (
              <div
                key={index}
                className="aspect-auto p-8 border-2 border-[var(--color-border)] rounded-3xl bg-[var(--color-background)] shadow-2xl shadow-gray-600/10 dark:shadow-none"
              >
                <div className="flex gap-4">
                  <Image
                    className="w-12 h-12 rounded-full"
                    src={review.image}
                    alt={review.name}
                    width={50}
                    height={50}
                    loading="eager"
                  />
                  <div>
                    <h3 className="text-lg font-medium">{review.name}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">{review.role}</p>
                  </div>
                </div>
                <p className="mt-8 text-[var(--color-text-primary)]">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;

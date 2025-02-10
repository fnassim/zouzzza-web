import Hero from "./components/Hero"
import Pricing from "./components/pricing/Pricing"
import Testimonials from "./components/Testimonials"
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import Faq from "./components/Faq"

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center space-y-8 lg:space-y-32 my-9 sm:my-24">
        <Hero />
        <Problem />
        <Solution />
        <Pricing />
        <Testimonials/>
        <Faq />
      </main>
    </div>
  );
}

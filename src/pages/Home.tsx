import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "../components/Hero";
import { TransformSection } from "../components/TransformSection";
import { HowItWorks } from "../components/HowItWorks";
import { StatsSection } from "../components/StatsSection";
import { Testimonials } from "../components/Testimonials";
import { GuaranteeSection } from "../components/GuaranteeSection";
import { FAQSection } from "../components/FAQSection";
import { Newsletter } from "../components/Newsletter";

export function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
  }, [hash]);

  return (
    <>
      <Hero />
      <HowItWorks />
      <TransformSection />
      <StatsSection />
      <Testimonials />
      <GuaranteeSection />
      <FAQSection />
      <Newsletter />
    </>
  );
}

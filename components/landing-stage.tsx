import { HowItWorks } from "@/components/how-it-works";
import { LineIntro } from "@/components/line-intro";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Audiences } from "@/components/sections/audiences";
import { Hero } from "@/components/sections/hero";
import { Logistics } from "@/components/sections/logistics";
import { Onboarding } from "@/components/sections/onboarding";
import { Overview } from "@/components/sections/overview";
import { Platform } from "@/components/sections/platform";
import { Problem } from "@/components/sections/problem";
import { Standards } from "@/components/sections/standards";

export function LandingStage() {
  return (
    <>
      <LineIntro />
      <div className="stage">
        <a href="#how-it-works" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-canvas focus:px-4 focus:py-2 focus:shadow">
          Skip to content
        </a>
        <SiteNav current="home" />
        <main>
          <Hero />
          <Problem />
          <Overview />
          <Platform />
          <HowItWorks />
          <Logistics />
          <Audiences />
          <Standards />
          <Onboarding />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}

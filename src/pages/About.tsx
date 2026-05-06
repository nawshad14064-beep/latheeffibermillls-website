import * as React from "react";
import LazySection from "../components/home/LazySection";

// Modular Components
import AboutHero from "../components/about/AboutHero";

// Lazy Loaded Sections
const HeritageSection = React.lazy(() => import("../components/about/HeritageSection"));
const MissionVision = React.lazy(() => import("../components/about/MissionVision"));
const CoreValues = React.lazy(() => import("../components/about/CoreValues"));
const AboutCTA = React.lazy(() => import("../components/about/AboutCTA"));
const ThreeDStats = React.lazy(() => import("../components/3d/ThreeDStats"));

export default function About() {
  return (
    <div className="pt-32 pb-24 bg-mesh">
      <AboutHero />

      <LazySection>
        <React.Suspense fallback={<div className="h-[800px] bg-[#050505] animate-pulse" />}>
          <HeritageSection />
        </React.Suspense>
      </LazySection>

      <LazySection>
        <React.Suspense fallback={<div className="h-[600px] bg-primary animate-pulse" />}>
          <MissionVision />
        </React.Suspense>
      </LazySection>

      <LazySection>
        <React.Suspense fallback={<div className="h-[500px] bg-[#050505] animate-pulse" />}>
          <CoreValues />
        </React.Suspense>
      </LazySection>

      <LazySection>
        <React.Suspense fallback={<div className="h-[500px] bg-white/5 animate-pulse" />}>
          <ThreeDStats />
        </React.Suspense>
      </LazySection>

      <LazySection>
        <React.Suspense fallback={<div className="h-[500px] bg-white/5 animate-pulse" />}>
          <AboutCTA />
        </React.Suspense>
      </LazySection>
    </div>
  );
}

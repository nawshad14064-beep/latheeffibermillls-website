import * as React from "react";
import LazySection from "../components/home/LazySection";

// Modular Components
import QualityHero from "../components/quality/QualityHero";

// Lazy Loaded Sections
const ProductionProcess = React.lazy(() => import("../components/quality/ProductionProcess"));
const InternationalStandards = React.lazy(() => import("../components/quality/InternationalStandards"));
const EcoFriendlyBanner = React.lazy(() => import("../components/quality/EcoFriendlyBanner"));

export default function Quality() {
  return (
    <div className="pt-32 pb-24 bg-mesh">
      <QualityHero />

      <LazySection>
        <React.Suspense fallback={<div className="h-[600px] bg-[#050505] animate-pulse" />}>
          <ProductionProcess />
        </React.Suspense>
      </LazySection>

      <LazySection>
        <React.Suspense fallback={<div className="h-[600px] bg-primary animate-pulse" />}>
          <InternationalStandards />
        </React.Suspense>
      </LazySection>

      <LazySection>
        <React.Suspense fallback={<div className="h-[500px] bg-white/5 animate-pulse" />}>
          <EcoFriendlyBanner />
        </React.Suspense>
      </LazySection>
    </div>
  );
}

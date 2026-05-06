import * as React from "react";
import LazySection from "../components/home/LazySection";

// Modular Components
import ExportHero from "../components/export/ExportHero";

// Lazy Loaded Sections
const ExportSpecifications = React.lazy(() => import("../components/export/ExportSpecifications"));
const ShippingProcess = React.lazy(() => import("../components/export/ShippingProcess"));
const FactoryCapacity = React.lazy(() => import("../components/export/FactoryCapacity"));
const InteractiveMap = React.lazy(() => import("../components/export/InteractiveMap"));

export default function Export() {
  return (
    <div className="pt-32 pb-24 bg-mesh">
      <ExportHero />

      <LazySection>
        <React.Suspense fallback={<div className="h-[600px] bg-[#050505] animate-pulse" />}>
          <ExportSpecifications />
        </React.Suspense>
      </LazySection>

      <LazySection>
        <React.Suspense fallback={<div className="h-[600px] bg-[#050505] animate-pulse" />}>
          <InteractiveMap />
        </React.Suspense>
      </LazySection>

      <LazySection>
        <React.Suspense fallback={<div className="h-[600px] bg-primary animate-pulse" />}>
          <ShippingProcess />
        </React.Suspense>
      </LazySection>

      <LazySection>
        <React.Suspense fallback={<div className="h-[500px] bg-white/5 animate-pulse" />}>
          <FactoryCapacity />
        </React.Suspense>
      </LazySection>
    </div>
  );
}

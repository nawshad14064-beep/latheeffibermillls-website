import * as React from "react";
import LazySection from "../components/home/LazySection";

// Modular Components
import ProductHeader from "../components/products/ProductHeader";

// Lazy Loaded Sections
const ProductGrid = React.lazy(() => import("../components/products/ProductGrid"));
const QualityStandards = React.lazy(() => import("../components/products/QualityStandards"));
const ProductFAQ = React.lazy(() => import("../components/products/ProductFAQ"));
const ProductCTA = React.lazy(() => import("../components/products/ProductCTA"));

export default function Products() {
  return (
    <div className="pt-32 pb-24 bg-mesh">
      <ProductHeader />

      <LazySection>
        <React.Suspense fallback={<div className="h-[800px] bg-[#050505] animate-pulse" />}>
          <ProductGrid />
        </React.Suspense>
      </LazySection>

      <LazySection>
        <React.Suspense fallback={<div className="h-[600px] bg-primary animate-pulse" />}>
          <QualityStandards />
        </React.Suspense>
      </LazySection>

      <LazySection>
        <React.Suspense fallback={<div className="h-[500px] bg-[#050505] animate-pulse" />}>
          <ProductFAQ />
        </React.Suspense>
      </LazySection>

      <LazySection>
        <React.Suspense fallback={<div className="h-[500px] bg-accent-teal animate-pulse" />}>
          <ProductCTA />
        </React.Suspense>
      </LazySection>
    </div>
  );
}

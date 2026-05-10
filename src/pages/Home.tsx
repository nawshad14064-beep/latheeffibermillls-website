import * as React from "react";
import { Suspense, lazy } from "react";
import useSound from "use-sound";
import { useScroll, useTransform } from "framer-motion";
import { useDevice } from "../hooks/useDevice";

// Critical Components
import HeroSection from "../components/home/HeroSection";

// Lazy Sections
import LazySection from "../components/home/LazySection";
const JourneySection = lazy(() => import("../components/home/JourneySection"));
const FeaturedProducts = lazy(() => import("../components/home/FeaturedProducts"));
const GlobalReachSection = lazy(() => import("../components/home/GlobalReachSection"));
const GalleryPreview = lazy(() => import("../components/home/GalleryPreview"));
const LinkedInSection = lazy(() => import("../components/home/LinkedInSection"));
const FinalCTA = lazy(() => import("../components/home/FinalCTA"));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="h-96 w-full bg-[#0B0B0F]/50 animate-pulse rounded-[3rem]" />}>
    {children}
  </Suspense>
);

export default function Home() {
  const { isMobile, isLowEnd } = useDevice();
  const [currentLayout, setCurrentLayout] = React.useState<"premium" | "eco">("premium");
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  React.useEffect(() => {
    const handleLayoutSwitch = () => {
      setCurrentLayout(prev => prev === "premium" ? "eco" : "premium");
    };
    const handleThemeSync = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    window.addEventListener("switch-layout", handleLayoutSwitch);
    window.addEventListener("sync-theme", handleThemeSync);
    
    // Initial sync
    setIsDarkMode(document.documentElement.classList.contains("dark"));
    if (document.body.classList.contains("layout-eco")) setCurrentLayout("eco");
    else if (document.body.classList.contains("layout-premium")) setCurrentLayout("premium");

    return () => {
      window.removeEventListener("switch-layout", handleLayoutSwitch);
      window.removeEventListener("sync-theme", handleThemeSync);
    };
  }, []);

  const [playHover] = useSound("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", { volume: 0.1 });
  const [playClick] = useSound("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3", { volume: 0.2 });

  const { scrollYProgress } = useScroll();
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const heroRotate = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const heroImageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);

  return (
    <div className="overflow-hidden">
      <HeroSection 
        currentLayout={currentLayout}
        isMobile={isMobile}
        isLowEnd={isLowEnd}
        heroImageY={heroImageY}
        heroRotate={heroRotate}
        heroImageScale={heroImageScale}
        playClick={playClick} 
        playHover={playHover} 
      />
      
      <LazySection>
        <SuspenseWrapper>
          <JourneySection />
        </SuspenseWrapper>
      </LazySection>

      <LazySection>
        <SuspenseWrapper>
          <FeaturedProducts playClick={playClick} playHover={playHover} />
        </SuspenseWrapper>
      </LazySection>

      <LazySection>
        <SuspenseWrapper>
          <GlobalReachSection />
        </SuspenseWrapper>
      </LazySection>

      <LazySection>
        <SuspenseWrapper>
          <GalleryPreview playClick={playClick} playHover={playHover} />
        </SuspenseWrapper>
      </LazySection>

      <LazySection>
        <SuspenseWrapper>
          <LinkedInSection playClick={playClick} playHover={playHover} />
        </SuspenseWrapper>
      </LazySection>

      <LazySection>
        <SuspenseWrapper>
          <FinalCTA playClick={playClick} playHover={playHover} />
        </SuspenseWrapper>
      </LazySection>
    </div>
  );
}

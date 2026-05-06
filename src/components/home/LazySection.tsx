import * as React from "react";
import { useInView } from "motion/react";

interface LazySectionProps {
  children: React.ReactNode;
  offset?: string;
}

export default function LazySection({ children, offset = "200px" }: LazySectionProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: `0px 0px ${offset} 0px` as any });

  return (
    <div ref={ref} className="min-h-[100px]">
      {isInView ? children : <div className="h-[400px] w-full bg-gray-50/50 animate-pulse rounded-[3rem]" />}
    </div>
  );
}

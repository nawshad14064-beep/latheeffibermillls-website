import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  PerspectiveCamera, 
  Environment,
  OrbitControls,
  Float,
  Sphere,
  Html,
  ContactShadows,
  useTexture,
  Sparkles,
  Stars
} from "@react-three/drei";
import * as THREE from "three";

import { motion, AnimatePresence } from "framer-motion";

// Major Export Hubs
const HUBS = [
  { name: "London", pos: [51.5, -0.12] },
  { name: "Dubai", pos: [25.2, 55.2] },
  { name: "Shanghai", pos: [31.2, 121.4] },
  { name: "Mumbai", pos: [19.0, 72.8] },
  { name: "New York", pos: [40.7, -74.0] },
  { name: "Tokyo", pos: [35.6, 139.6] },
  { name: "Sydney", pos: [-33.8, 151.2] },
];

const SRI_LANKA = [7.8, 80.7];

// Helper to convert lat/long to 3D coordinates
function latLongToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

interface Globe3DProps {
  isMobile?: boolean;
  showOverlay?: boolean;
}

function ExportArc({ start, end, radius, isMobile }: { start: number[], end: number[], radius: number, isMobile: boolean }) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const startVec = latLongToVector3(start[0], start[1], radius);
  const endVec = latLongToVector3(end[0], end[1], radius);
  
  // Create a curve that arcs above the surface
  const midVec = startVec.clone().lerp(endVec, 0.5).normalize().multiplyScalar(radius * 1.5);
  const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.2 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={[curve, isMobile ? 32 : 64, 0.008, 8, false]} />
      <meshBasicMaterial color="#FFD700" transparent opacity={0.2} />
    </mesh>
  );
}

function Globe({ isMobile }: { isMobile: boolean }) {
  const globeRef = React.useRef<THREE.Mesh>(null);
  const groupRef = React.useRef<THREE.Group>(null);
  
  // High-end dark world map texture
  const worldMap = useTexture("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000");

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Very slow, smooth rotation for luxury feel
      groupRef.current.rotation.y = time * 0.03;
    }
  });

  const radius = 3;

  return (
    <group ref={groupRef}>
      {/* Main Globe - Realistic Dark Base */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[radius, isMobile ? 32 : 128, isMobile ? 32 : 128]} />
        <meshStandardMaterial 
          map={worldMap}
          color="#0a0a0a"
          roughness={0.4}
          metalness={0.9}
          emissive="#FFD700"
          emissiveIntensity={0.02}
        />
      </mesh>

      {/* Golden Grid Overlay - Subtle */}
      <mesh scale={[1.005, 1.005, 1.005]}>
        <sphereGeometry args={[radius, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
        <meshStandardMaterial 
          color="#FFD700" 
          wireframe 
          transparent 
          opacity={0.05} 
        />
      </mesh>

      {/* Sri Lanka Origin Point */}
      <mesh position={latLongToVector3(SRI_LANKA[0], SRI_LANKA[1], radius)}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#FFD700" />
        <Html distanceFactor={10}>
          <div className="bg-[#FFD700] text-primary px-2 py-1 rounded text-[8px] font-bold whitespace-nowrap shadow-lg">
            SRI LANKA (HQ)
          </div>
        </Html>
      </mesh>

      {/* Export Hubs and Arcs */}
      {HUBS.map((hub, i) => {
        const pos = latLongToVector3(hub.pos[0], hub.pos[1], radius);
        return (
          <React.Fragment key={i}>
            <mesh position={pos}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial color="#FFD700" />
              {!isMobile && (
                <Html distanceFactor={12}>
                  <div className="text-white/40 text-[6px] font-bold uppercase tracking-widest whitespace-nowrap">
                    {hub.name}
                  </div>
                </Html>
              )}
            </mesh>
            <ExportArc start={SRI_LANKA} end={hub.pos} radius={radius} isMobile={isMobile} />
          </React.Fragment>
        );
      })}

      {/* Atmosphere Glow */}
      <Sphere args={[radius * 1.2, isMobile ? 16 : 32, isMobile ? 16 : 32]}>
        <meshStandardMaterial 
          color="#FFD700" 
          transparent 
          opacity={0.02} 
          side={THREE.BackSide} 
        />
      </Sphere>

      <Stars radius={100} depth={50} count={isMobile ? 1000 : 5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={isMobile ? 20 : 40} scale={radius * 2.5} size={2} speed={0.3} color="#FFD700" />
    </group>
  );
}

export default function Globe3D({ isMobile = false, showOverlay = true }: Globe3DProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full min-h-[700px] relative bg-transparent rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl group">
      <Canvas dpr={[1, isMobile ? 1 : 1.5]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={30} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.2} 
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          enableDamping
          dampingFactor={0.05}
        />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={3} color="#FFD700" />
        <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={5} color="#FFD700" />
        
        <React.Suspense fallback={null}>
          <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
            <Globe isMobile={isMobile} />
          </Float>
          <Environment preset="night" />
          {!isMobile && <ContactShadows position={[0, -4.5, 0]} opacity={0.6} scale={20} blur={3} far={10} color="#FFD700" />}
        </React.Suspense>
      </Canvas>

      {/* Luxury Overlay UI */}
      <AnimatePresence>
        {isLoaded && showOverlay && (
          <>
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-16 left-16 z-10 space-y-6 pointer-events-none"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-[1px] bg-accent-gold/30" />
                <span className="text-accent-gold text-[10px] font-light uppercase tracking-[1em]">Global Export Network</span>
              </div>
              <h4 className="text-white font-serif text-6xl font-bold italic leading-tight tracking-tighter">
                Exporting <br />
                <span className="text-accent-gold">Excellence</span>
              </h4>
              <p className="text-white/30 text-[11px] max-w-xs leading-relaxed font-sans tracking-widest uppercase">
                Premium Sri Lankan craftsmanship <br /> reaching over 30 countries globally.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="absolute bottom-16 right-16 z-10 flex flex-col items-end gap-4 pointer-events-none"
            >
              <p className="text-white/10 text-[9px] font-bold uppercase tracking-[0.6em]">Strategic Global Hubs</p>
              <div className="flex gap-8 items-center px-8 py-4 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10">
                {["EUROPE", "MIDDLE EAST", "ASIA", "AMERICAS"].map((region) => (
                  <span key={region} className="text-white/40 text-[8px] font-bold tracking-[0.3em]">
                    {region}
                  </span>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Decorative Corner Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-gold/5 blur-[120px] rounded-full" />
      
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}

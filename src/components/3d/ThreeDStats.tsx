import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Environment, Text } from "@react-three/drei";
import * as THREE from "three";

function StatBar({ value, index, label }: { value: number, index: number, label: string }) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.y = THREE.MathUtils.lerp(
        meshRef.current.scale.y,
        hovered ? value * 1.2 : value,
        0.1
      );
    }
  });

  return (
    <group position={[index * 2 - 2, 0, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh 
          ref={meshRef} 
          onPointerOver={() => setHovered(true)} 
          onPointerOut={() => setHovered(false)}
          position={[0, value / 2, 0]}
        >
          <boxGeometry args={[1, value, 1]} />
          <meshStandardMaterial 
            color={hovered ? "#D4AF37" : "#8B4513"} 
            emissive={hovered ? "#D4AF37" : "#000000"}
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>
      
      <Text
        position={[0, -1, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

export default function ThreeDStats() {
  const stats = [
    { label: "Experience", value: 2.5, display: "20+ Years" },
    { label: "Countries", value: 3.5, display: "30+ Export" },
    { label: "Capacity", value: 4.5, display: "5000 Tons" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mb-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center bg-white/5 backdrop-blur-3xl rounded-[4rem] p-12 md:p-24 border border-white/10 overflow-hidden relative">
        <div className="space-y-8 relative z-10">
          <h2 className="text-accent-gold font-bold tracking-[0.3em] uppercase text-xs">Growth & Impact</h2>
          <h3 className="text-6xl font-bold text-white font-serif leading-tight">
            Our Legacy in <br /> <span className="text-accent-gold italic">3D Perspective</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <p className="text-4xl font-bold text-white">{stat.display}</p>
                <p className="text-white/40 text-xs uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[400px] relative z-10">
          <Canvas dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={40} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
            <React.Suspense fallback={null}>
              {stats.map((stat, i) => (
                <StatBar key={i} index={i} value={stat.value} label={stat.label} />
              ))}
              <Environment preset="city" />
            </React.Suspense>
          </Canvas>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none" />
      </div>
    </section>
  );
}

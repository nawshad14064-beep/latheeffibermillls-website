import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Environment, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface ThreeDIconProps {
  type: "leaf" | "shield" | "ship";
  color?: string;
}

function IconModel({ type, color = "#D4AF37" }: ThreeDIconProps) {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        {type === "leaf" && <octahedronGeometry args={[1, 2]} />}
        {type === "shield" && <boxGeometry args={[1.2, 1.5, 0.3]} />}
        {type === "ship" && <coneGeometry args={[1, 2, 4]} />}
        
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.3}
          radius={1}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

export default function ThreeDIcon({ type, color }: ThreeDIconProps) {
  return (
    <div className="w-24 h-24">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color={color} />
        <React.Suspense fallback={null}>
          <IconModel type={type} color={color} />
          <Environment preset="city" />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  PresentationControls, 
  PerspectiveCamera, 
  Environment, 
  Float, 
  MeshDistortMaterial, 
  MeshWobbleMaterial,
  Sparkles,
  ContactShadows
} from "@react-three/drei";
import * as THREE from "three";

interface CoirFiber3DProps {
  type?: "roll" | "rope" | "bundle";
  isMobile?: boolean;
}

function FiberModel({ type = "roll", isMobile = false }: CoirFiber3DProps) {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group>
      {type === "roll" && (
        <mesh ref={meshRef} castShadow>
          <cylinderGeometry args={[1, 1, 3, isMobile ? 32 : 64]} />
          <MeshDistortMaterial 
            color="#D4AF37" 
            distort={isMobile ? 0.1 : 0.2} 
            speed={isMobile ? 1 : 2} 
            roughness={0.4} 
            metalness={0.8}
            emissive="#D4AF37"
            emissiveIntensity={0.1}
          />
        </mesh>
      )}
      {type === "rope" && (
        <mesh ref={meshRef} castShadow>
          <torusKnotGeometry args={[1, 0.3, isMobile ? 128 : 256, isMobile ? 16 : 32]} />
          <MeshWobbleMaterial 
            color="#8B4513" 
            factor={isMobile ? 0.3 : 0.5} 
            speed={1} 
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      )}
      {type === "bundle" && (
        <group ref={meshRef as any}>
          {[...Array(isMobile ? 8 : 15)].map((_, i) => (
            <mesh 
              key={i} 
              position={[Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5]} 
              rotation={[Math.random(), Math.random(), Math.random()]}
              castShadow={!isMobile}
            >
              <cylinderGeometry args={[0.03, 0.03, 3, isMobile ? 4 : 8]} />
              <meshStandardMaterial 
                color="#D4AF37" 
                metalness={0.9} 
                roughness={0.1}
                emissive="#D4AF37"
                emissiveIntensity={0.2}
              />
            </mesh>
          ))}
        </group>
      )}
      <Sparkles count={isMobile ? 15 : 30} scale={4} size={2} speed={0.3} color="#D4AF37" />
    </group>
  );
}

export default function CoirFiber3D({ type = "roll", isMobile = false }: CoirFiber3DProps) {
  return (
    <div className="w-full h-full min-h-[400px] bg-black/60 backdrop-blur-3xl rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl relative group">
      <div className="absolute top-8 left-8 z-10">
        <h4 className="text-white font-serif text-2xl font-bold italic tracking-tight">3D Product Viewer</h4>
        <p className="text-accent-gold text-[10px] font-bold uppercase tracking-[0.4em] mt-2">Interactive {type} Showcase</p>
      </div>
      
      {!isMobile && (
        <div className="absolute bottom-8 right-8 z-10 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-white/60 text-[8px] uppercase tracking-widest">Drag to rotate • Scroll to zoom</p>
        </div>
      )}

      <Canvas shadows dpr={[1, isMobile ? 1 : 1.5]} gl={{ antialias: !isMobile }}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <PresentationControls
          global
          snap
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
        >
          <Float speed={isMobile ? 1 : 2} rotationIntensity={0.5} floatIntensity={0.5}>
            <FiberModel type={type} isMobile={isMobile} />
          </Float>
        </PresentationControls>
        
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow={!isMobile} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#D4AF37" />
        
        {!isMobile && <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} />}
        <Environment preset={isMobile ? "city" : "studio"} />
      </Canvas>
    </div>
  );
}

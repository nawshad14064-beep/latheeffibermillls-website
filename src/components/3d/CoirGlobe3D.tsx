import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  Environment,
  ContactShadows,
  PresentationControls,
  useTexture,
  AdaptiveDpr,
  AdaptiveEvents,
  Sparkles
} from "@react-three/drei";
import * as THREE from "three";

function CoirGlobe({ mode, isLowEnd }: { mode: string; isLowEnd: boolean }) {
  const groupRef = React.useRef<THREE.Group>(null);
  const globeRef = React.useRef<THREE.Group>(null);
  
  // Coir rope texture
  const coirTexture = useTexture("https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800");
  coirTexture.wrapS = coirTexture.wrapT = THREE.RepeatWrapping;
  coirTexture.repeat.set(4, 1);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    }
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
      globeRef.current.rotation.z += 0.001;
    }
  });

  const ringCount = isLowEnd ? 8 : 16;
  const radius = 2.5;
  const ropeThickness = 0.08;

  return (
    <group ref={groupRef}>
      <group ref={globeRef}>
        {Array.from({ length: ringCount }).map((_, i) => {
          const rotationX = (i / ringCount) * Math.PI;
          const rotationY = (i / ringCount) * Math.PI * 2;
          
          return (
            <mesh key={i} rotation={[rotationX, rotationY, 0]}>
              <torusGeometry args={[radius, ropeThickness, isLowEnd ? 4 : 8, isLowEnd ? 32 : 64]} />
              {mode === "wireframe" ? (
                <meshStandardMaterial wireframe color="#D4AF37" />
              ) : mode === "glow" ? (
                <meshPhysicalMaterial 
                  color="#D4AF37" 
                  emissive="#D4AF37" 
                  emissiveIntensity={4} 
                  roughness={0} 
                  metalness={1} 
                />
              ) : (
                <meshStandardMaterial 
                  map={coirTexture} 
                  color="#8B4513" 
                  roughness={1} 
                  metalness={0} 
                  emissive="#3D1F0B"
                  emissiveIntensity={0.1}
                />
              )}
            </mesh>
          );
        })}

        {!isLowEnd && mode !== "wireframe" && (
          <mesh>
            <sphereGeometry args={[radius * 0.8, 32, 32]} />
            <meshStandardMaterial 
              color="#D4AF37" 
              transparent 
              opacity={0.05} 
              emissive="#D4AF37"
              emissiveIntensity={0.5}
            />
          </mesh>
        )}
      </group>

      <Sparkles 
        count={isLowEnd ? 20 : 60} 
        scale={[6, 6, 6]} 
        size={2} 
        speed={0.3} 
        color="#D4AF37" 
        opacity={0.5}
      />
      
      {!isLowEnd && (
        <mesh scale={[8, 8, 8]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial 
            color="#D4AF37" 
            transparent 
            opacity={0.02} 
            side={THREE.BackSide} 
          />
        </mesh>
      )}
    </group>
  );
}

export default function CoirGlobe3D({ mode = "solid", isLowEnd = false }: { mode?: string; isLowEnd?: boolean }) {
  return (
    <div className="w-full h-full min-h-[600px] relative cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, isLowEnd ? 1 : 1.5]} camera={{ position: [0, 0, 10], fov: 35 }} gl={{ antialias: !isLowEnd, alpha: true }}>
        <AdaptiveDpr pixelated />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#D4AF37" />
        <spotLight 
          position={[0, 10, 0]} 
          angle={0.5} 
          penumbra={1} 
          intensity={3} 
          castShadow={!isLowEnd} 
          color="#D4AF37"
        />
        
        <React.Suspense fallback={null}>
          <PresentationControls
            global
            snap
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 2, Math.PI / 2]}
          >
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
              <CoirGlobe mode={mode} isLowEnd={isLowEnd} />
            </Float>
          </PresentationControls>

          {!isLowEnd && (
            <ContactShadows 
              position={[0, -4, 0]} 
              opacity={0.3} 
              scale={15} 
              blur={2.5} 
              far={5} 
              color="#D4AF37"
            />
          )}
          <Environment preset={isLowEnd ? "city" : "night"} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

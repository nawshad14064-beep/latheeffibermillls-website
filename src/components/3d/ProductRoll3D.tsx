import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  Environment,
  ContactShadows,
  useTexture,
  AdaptiveDpr,
  AdaptiveEvents,
  Sparkles
} from "@react-three/drei";
import * as THREE from "three";

function CoirRollModel({ isLowEnd }: { isLowEnd: boolean }) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const netRef = React.useRef<THREE.Mesh>(null);
  const fuzzRef = React.useRef<THREE.Mesh>(null);
  
  const coirTexture = useTexture("https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800");
  const displacementMap = useTexture("https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800");
  
  coirTexture.wrapS = coirTexture.wrapT = THREE.RepeatWrapping;
  coirTexture.repeat.set(2, 4);
  
  displacementMap.wrapS = displacementMap.wrapT = THREE.RepeatWrapping;
  displacementMap.repeat.set(2, 4);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const rotationSpeed = time * 0.1;
    const floatEffect = Math.sin(time * 0.5) * 0.05;

    if (meshRef.current) {
      meshRef.current.rotation.y = rotationSpeed;
      meshRef.current.position.y = floatEffect;
    }
    if (netRef.current) {
      netRef.current.rotation.y = rotationSpeed;
      netRef.current.position.y = floatEffect;
    }
    if (fuzzRef.current) {
      fuzzRef.current.rotation.y = rotationSpeed;
      fuzzRef.current.position.y = floatEffect;
      fuzzRef.current.scale.setScalar(1.05 + Math.sin(time * 2) * 0.01);
    }
  });

  return (
    <group>
      <mesh ref={meshRef} castShadow receiveShadow>
        <cylinderGeometry args={[1.8, 1.8, 6, isLowEnd ? 32 : 128, 64]} />
        <meshStandardMaterial 
          map={coirTexture}
          displacementMap={displacementMap}
          displacementScale={0.2}
          color="#7A4F2A"
          roughness={1}
          metalness={0}
          bumpMap={displacementMap}
          bumpScale={0.1}
        />
      </mesh>

      <mesh ref={netRef} scale={[1.03, 1, 1.03]}>
        <cylinderGeometry args={[1.8, 1.8, 6, 24, 12, true]} />
        <meshStandardMaterial 
          color="#3D2B1F" 
          wireframe 
          transparent 
          opacity={0.6}
          wireframeLinewidth={3}
        />
      </mesh>

      <mesh ref={fuzzRef} scale={[1.05, 1.01, 1.05]}>
        <cylinderGeometry args={[1.8, 1.8, 6, 64, 1, true]} />
        <meshStandardMaterial 
          map={coirTexture}
          transparent
          opacity={0.2}
          color="#C5A059"
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <Sparkles 
        count={isLowEnd ? 80 : 300} 
        scale={[3.5, 6.5, 3.5]} 
        size={2.5} 
        speed={0.4} 
        color="#C5A059" 
        opacity={0.7}
      />
    </group>
  );
}

export default function ProductRoll3D({ isLowEnd = false }: { isLowEnd?: boolean }) {
  return (
    <div className="w-full h-full min-h-[600px] relative cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, isLowEnd ? 1 : 1.5]} camera={{ position: [0, 0, 10], fov: 35 }} gl={{ antialias: !isLowEnd, alpha: true }}>
        <AdaptiveDpr pixelated />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#C5A059" />
        <spotLight 
          position={[0, 10, 0]} 
          angle={0.5} 
          penumbra={1} 
          intensity={4} 
          castShadow={!isLowEnd} 
          color="#C5A059"
        />
        
        <React.Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <CoirRollModel isLowEnd={isLowEnd} />
          </Float>

          {!isLowEnd && (
            <ContactShadows 
              position={[0, -3, 0]} 
              opacity={0.4} 
              scale={15} 
              blur={2.5} 
              far={5} 
              color="#000000"
            />
          )}
          <Environment preset="night" />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

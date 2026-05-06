import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  useVideoTexture, 
  Environment, 
  AdaptiveDpr,
  AdaptiveEvents,
  Float,
  PerspectiveCamera,
  ContactShadows,
  Sparkles
} from "@react-three/drei";
import * as THREE from "three";

// Chroma Key Shader for Background Removal
const ChromaKeyShader = {
  uniforms: {
    tDiffuse: { value: null },
    keyColor: { value: new THREE.Color(0x000000) }, // Key color to remove
    similarity: { value: 0.2 },
    smoothness: { value: 0.1 },
    opacity: { value: 1.0 },
    emissive: { value: new THREE.Color(0xFFD700) },
    emissiveIntensity: { value: 0.05 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec3 keyColor;
    uniform float similarity;
    uniform float smoothness;
    uniform float opacity;
    uniform vec3 emissive;
    uniform float emissiveIntensity;
    varying vec2 vUv;

    void main() {
      vec4 texColor = texture2D(tDiffuse, vUv);
      float d = distance(texColor.rgb, keyColor);
      float alpha = smoothstep(similarity, similarity + smoothness, d);
      
      // Add a subtle golden glow to the edges
      vec3 finalColor = texColor.rgb + (emissive * emissiveIntensity * (1.0 - alpha));
      
      gl_FragColor = vec4(finalColor, alpha * opacity);
      
      if (gl_FragColor.a < 0.05) discard;
    }
  `
};

interface VideoRoll3DProps {
  videoUrl: string;
  isLowEnd?: boolean;
}

function VideoMesh({ videoUrl, isLowEnd }: { videoUrl: string; isLowEnd: boolean }) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const materialRef = React.useRef<THREE.ShaderMaterial>(null);
  
  // Load video texture
  const texture = useVideoTexture(videoUrl, {
    unsuspend: "canplay",
    muted: true,
    loop: true,
    start: true,
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Luxury Rotation: Slow, smooth, and cinematic
      meshRef.current.rotation.y = time * 0.15; // Even slower for more luxury
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.15; // Gentle floating
    }
    if (materialRef.current) {
      materialRef.current.uniforms.tDiffuse.value = texture;
      // Subtle emissive pulse
      materialRef.current.uniforms.emissiveIntensity.value = 0.05 + Math.sin(time * 2) * 0.02;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        {/* Full Cylinder for Product Rolls - more realistic shape */}
        <cylinderGeometry args={[3, 3, 4.5, isLowEnd ? 32 : 64, 1, true]} />
        <shaderMaterial 
          ref={materialRef}
          args={[ChromaKeyShader]}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

export default function VideoRoll3D({ videoUrl, isLowEnd = false }: VideoRoll3DProps) {
  return (
    <div className="w-full h-full min-h-[600px] relative">
      {/* Luxury Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFD700]/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />
      
      <Canvas dpr={[1, isLowEnd ? 1 : 1.5]} gl={{ antialias: !isLowEnd, alpha: true }}>
        <AdaptiveDpr pixelated />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
        
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#FFD700" />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={3} color="#FFD700" />
        
        <React.Suspense fallback={null}>
          <VideoMesh videoUrl={videoUrl} isLowEnd={isLowEnd} />
          
          <Sparkles 
            count={isLowEnd ? 20 : 50} 
            scale={[10, 6, 10]} 
            size={2} 
            speed={0.5} 
            color="#D4AF37" 
          />
          
          {!isLowEnd && (
            <ContactShadows 
              position={[0, -2.5, 0]} 
              opacity={0.4} 
              scale={10} 
              blur={2} 
              far={4.5} 
            />
          )}
          
          <Environment preset="studio" />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

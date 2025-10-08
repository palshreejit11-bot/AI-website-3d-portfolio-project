import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

const FrameShape = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Constant slow rotation
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.05;
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Box ref={meshRef} args={[3, 3, 3]} scale={1.2}>
      <meshStandardMaterial
        color="#2563eb" // a deep blue
        wireframe={true}
        emissive="#3b82f6"
        emissiveIntensity={0.3}
        flatShading={true}
      />
    </Box>
  );
};

const PortfolioFrame: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, -10, 10]} intensity={1.2} />
      <FrameShape />
    </Canvas>
  );
};

export default PortfolioFrame;

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Icosahedron } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

// This component creates a subtle parallax effect combined with a slow orbit.
const Rig = () => {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();
  
  return useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const radius = 8; // Match the initial camera z-position

    // Calculate the base orbiting position for a slow, subtle rotation
    const orbitX = Math.sin(t * 0.05) * radius;
    const orbitZ = Math.cos(t * 0.05) * radius;

    // Define the target position including the orbit and the mouse parallax
    const targetX = orbitX + mouse.x * 1; // Slightly reduced parallax effect
    const targetY = mouse.y * 1;
    const targetZ = orbitZ;

    // Smoothly interpolate camera position towards the dynamic target
    camera.position.lerp(vec.set(targetX, targetY, targetZ), 0.02);
    // Always look at the center of the scene
    camera.lookAt(0, 0, 0);
  });
};

// This component defines the 3D shape itself.
const Shape = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { scrollYProgress } = useScroll();

  // Rotate the shape on each frame
  useFrame((_state, delta) => {
    if (meshRef.current) {
      // Maintain existing gentle rotation
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
      
      // Link Z-rotation to scroll progress for a full 360-degree turn
      meshRef.current.rotation.z = scrollYProgress.get() * Math.PI * 2;
    }
  });

  // Material with increased emissive intensity for a stronger glow
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#4f46e5",
    wireframe: true,
    emissive: "#6366f1",
    emissiveIntensity: 0.4,
    flatShading: true,
  }), []);

  return (
    <Icosahedron ref={meshRef} args={[2, 0]} scale={1.5} material={material} />
  );
};

// Main component that sets up the 3D scene
const GeometricShape: React.FC = () => {
  return (
    // Adjusted camera position and fov for a slightly different perspective
    <Canvas camera={{ position: [0, 0, 8], fov: 70 }}>
      {/* Fix: Use idiomatic declarative light components. This resolves TypeScript errors for unrecognized JSX elements. */}
      <ambientLight intensity={0.5} />
      <pointLight intensity={1.5} position={[10, 10, 10]} />
      <Shape />
      <Rig />
    </Canvas>
  );
};

export default GeometricShape;
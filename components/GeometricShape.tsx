import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

// This component creates a subtle parallax effect based on mouse position.
const Rig = () => {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();
  
  return useFrame(() => {
    // Smoothly interpolate camera position towards a point influenced by the mouse
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 1, camera.position.z), 0.02);
    // Always look at the center of the scene
    camera.lookAt(0, 0, 0);
  });
};

// This component defines the 3D shape itself.
const Shape = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Rotate the shape on each frame
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[2, 0]} scale={1.5}>
      {/* FIX: Replaced imperative <primitive> with declarative <meshStandardMaterial>. This is the idiomatic react-three-fiber way and resolves the TypeScript error for unrecognized JSX elements. */}
      <meshStandardMaterial
        color="#4f46e5"
        wireframe
        emissive="#6366f1"
        emissiveIntensity={0.2}
        flatShading
      />
    </Icosahedron>
  );
};

// Main component that sets up the 3D scene
const GeometricShape: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 7.5], fov: 75 }}>
      {/* FIX: Replaced imperative <primitive> with declarative light components. This is the idiomatic react-three-fiber way and resolves the TypeScript error for unrecognized JSX elements. */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Shape />
      <Rig />
    </Canvas>
  );
};

export default GeometricShape;
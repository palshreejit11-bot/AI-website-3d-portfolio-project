import React, { useRef, useMemo } from 'react';
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

  // FIX: Using <primitive> with a memoized material to work around a TypeScript error where
  // the declarative <meshStandardMaterial> component is not recognized in JSX.
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#4f46e5',
    wireframe: true,
    emissive: '#6366f1',
    emissiveIntensity: 0.2,
    flatShading: true
  }), []);

  return (
    <Icosahedron ref={meshRef} args={[2, 0]} scale={1.5}>
      <primitive object={material} attach="material" />
    </Icosahedron>
  );
};

// Main component that sets up the 3D scene
const GeometricShape: React.FC = () => {
  // FIX: Using <primitive> with memoized lights to work around a TypeScript error where
  // the declarative <ambientLight> and <pointLight> components are not recognized in JSX.
  const ambientLight = useMemo(() => new THREE.AmbientLight(0xffffff, 0.5), []);
  const pointLight = useMemo(() => {
    const light = new THREE.PointLight(0xffffff, 1.5);
    light.position.set(10, 10, 10);
    return light;
  }, []);
  
  return (
    <Canvas camera={{ position: [0, 0, 7.5], fov: 75 }}>
      <primitive object={ambientLight} />
      <primitive object={pointLight} />
      <Shape />
      <Rig />
    </Canvas>
  );
};

export default GeometricShape;

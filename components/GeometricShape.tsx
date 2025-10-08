
import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, useScroll, Dodecahedron } from '@react-three/drei';
import * as THREE from 'three';

// This component creates a subtle parallax effect combined with a slow orbit for the camera.
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
    const targetX = orbitX + mouse.x * 1;
    const targetY = mouse.y * 1;
    const targetZ = orbitZ;

    // Smoothly interpolate camera position towards the dynamic target
    camera.position.lerp(vec.set(targetX, targetY, targetZ), 0.02);
    // Always look at the center of the scene
    camera.lookAt(0, 0, 0);
  });
};

// This component defines the 3D model itself.
const Model = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  // useScroll from @react-three/drei provides scroll offset within a <ScrollControls> wrapper.
  const scroll = useScroll();

  // Rotate and move the shape on each frame based on time and scroll position.
  useFrame((_state, delta) => {
    if (mesh.current) {
      // Maintain existing gentle rotation
      mesh.current.rotation.x += delta * 0.1;
      mesh.current.rotation.y += delta * 0.15;
      
      // `scroll.offset` gives a value from 0 to 1 based on scroll position.
      const scrollValue = scroll.offset;

      // Link Z-rotation to scroll progress for a full 360-degree turn
      mesh.current.rotation.z = scrollValue * Math.PI * 2;
      
      // Create an aggressive negative parallax effect by moving the model down and back
      // as the user scrolls down. This makes it appear to scroll "slower" than the page.
      mesh.current.position.y = -scrollValue * 8; // Move down
      mesh.current.position.z = scrollValue * 4;  // Move farther away
    }
  });

  return (
    <Dodecahedron ref={mesh} args={[1.2, 0]} scale={1.8}>
      <meshStandardMaterial 
        color="#1e1b4b" 
        wireframe 
        emissive="#4f46e5" 
        emissiveIntensity={0.3} 
        roughness={0.5} 
        metalness={0.8}
      />
    </Dodecahedron>
  );
};

// Main component that sets up the 3D scene
const AIAgentModel: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 70 }}>
      <hemisphereLight intensity={0.6} groundColor="black" />
      <pointLight intensity={2.5} position={[5, 5, 5]} color="#6366f1" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize={1024}
      />
      {/* ScrollControls is necessary for the @react-three/drei useScroll hook to work. */}
      <ScrollControls pages={4} damping={0.1}>
        <Model />
        <Rig />
      </ScrollControls>
    </Canvas>
  );
};

export default AIAgentModel;

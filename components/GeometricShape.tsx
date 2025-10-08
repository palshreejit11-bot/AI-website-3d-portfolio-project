import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
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

// This component defines the 3D model itself.
const Model = () => {
  const group = useRef<THREE.Group>(null!);
  const { scene, animations } = useGLTF('/network_node.glb');
  const { actions } = useAnimations(animations, group);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const animationName = Object.keys(actions)[0];
    if (animationName) {
      actions[animationName]?.play();
    }
  }, [actions]);

  // Rotate and move the shape on each frame
  useFrame((_state, delta) => {
    if (group.current) {
      // Maintain existing gentle rotation
      group.current.rotation.x += delta * 0.1;
      group.current.rotation.y += delta * 0.15;
      
      const scrollValue = scrollYProgress.get();

      // Link Z-rotation to scroll progress for a full 360-degree turn
      group.current.rotation.z = scrollValue * Math.PI * 2;
      
      // Create an aggressive negative parallax effect by moving the model down and back
      // as the user scrolls down. This makes it appear to scroll "slower" than the page.
      group.current.position.y = -scrollValue * 8; // Move down
      group.current.position.z = scrollValue * 4;  // Move farther away
    }
  });

  return <primitive ref={group} object={scene} scale={1.5} />;
};

// Preload the model for a smoother loading experience.
useGLTF.preload('/network_node.glb');

// Main component that sets up the 3D scene
const AIAgentModel: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 70 }}>
       {/* Lighting setup from AiAgent.tsx, better for models */}
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
      <Model />
      <Rig />
    </Canvas>
  );
};

export default AIAgentModel;

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
// Fix: Add missing import for 'three' to resolve the "Cannot find namespace 'THREE'" error.
import * as THREE from 'three';

// This component loads and renders the GLB model.
function Model(props: any) {
  const group = useRef<THREE.Group>(null!);
  // Load the GLB file from the public directory.
  const { scene, animations } = useGLTF('/network_node.glb');
  
  // This hook extracts animation actions from the loaded model.
  const { actions } = useAnimations(animations, group);

  // Play the first animation clip when the component mounts.
  // The animation name (e.g., 'Scene') depends on how the GLB was exported.
  useEffect(() => {
    // A common default animation name is 'Scene', but it might vary.
    // You can console.log(actions) to see available animation names.
    const animationName = Object.keys(actions)[0];
    if (animationName) {
      actions[animationName]?.play();
    }
  }, [actions]);

  // Rotate the model slightly on each frame for a floating effect.
  useFrame((_state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.15;
    }
  });

  // The 'primitive' object allows us to render the entire loaded scene graph.
  return <primitive ref={group} object={scene} scale={1.5} {...props} />;
}

// Main component that sets up the 3D scene.
const AiAgent: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
      {/* 
        Lighting setup to complement a dark/metallic model.
        - HemisphereLight provides soft ambient light.
        - PointLight acts like a key light to create highlights.
        - SpotLight adds dramatic directional lighting.
      */}
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
    </Canvas>
  );
};

// Preload the model for a smoother loading experience.
useGLTF.preload('/network_node.glb');

export default AiAgent;

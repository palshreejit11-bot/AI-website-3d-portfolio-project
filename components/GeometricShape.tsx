import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, useScroll, Dodecahedron } from '@react-three/drei';
import * as THREE from 'three';
import ServiceNode from './ServiceNode';

// Data moved from Services.tsx to be used in the 3D canvas
const services = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Frontend Development',
    description: 'Crafting responsive, high-performance web applications with modern frameworks like React and TypeScript.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: 'UI/UX Design',
    description: 'Designing intuitive and beautiful user interfaces that provide a seamless user experience and drive engagement.',
  },
  {
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9" />
        </svg>
    ),
    title: 'API Integration',
    description: 'Connecting your applications to third-party services and building robust, scalable backend integrations.',
  },
   {
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
    ),
    title: 'Cloud Solutions',
    description: 'Leveraging cloud platforms like AWS and Vercel to build and deploy scalable, resilient, and cost-effective infrastructure.',
  },
];


// This vector will live outside the component to persist between re-renders
// and will store the intermediate look-at target for smooth interpolation.
const currentLookAt = new THREE.Vector3(0, 0, 0);

// This component creates the camera rig with parallax, orbit, and focus effects.
const Rig = ({ hoveredNodePosition }: { hoveredNodePosition: [number, number, number] | null }) => {
  const { camera, mouse } = useThree();
  const finalPosition = new THREE.Vector3();
  
  // Determine the target for the lookAt interpolation.
  // If a node is hovered, target its position. Otherwise, target the scene center.
  const targetLookAt = hoveredNodePosition ? new THREE.Vector3(...hoveredNodePosition) : new THREE.Vector3(0, 0, 0);
  
  return useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Determine the target camera distance (radius) from the center. Zoom in when hovered.
    const baseRadius = 8;
    const targetRadius = hoveredNodePosition ? baseRadius * 0.85 : baseRadius;

    // Smoothly interpolate the camera's radius for the zoom effect.
    const currentRadius = camera.position.length();
    const lerpedRadius = THREE.MathUtils.lerp(currentRadius, targetRadius, 0.05);
    
    // Calculate the orbital position based on the new, interpolated radius.
    const orbitXWithZoom = Math.sin(t * 0.05) * lerpedRadius;
    const orbitZWithZoom = Math.cos(t * 0.05) * lerpedRadius;
    
    // Add the mouse parallax effect as an offset to the zoomed orbital position.
    const targetX = orbitXWithZoom + mouse.x * 1.5;
    const targetY = mouse.y * 1.5;
    const targetZ = orbitZWithZoom;

    // Smoothly move the camera towards its final target position.
    camera.position.lerp(finalPosition.set(targetX, targetY, targetZ), 0.02);
    
    // Smoothly interpolate the point the camera is looking at for the pan effect.
    currentLookAt.lerp(targetLookAt, 0.05);
    
    // Apply the look-at.
    camera.lookAt(currentLookAt);
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
    <Dodecahedron ref={mesh} args={[1.2, 0]} scale={2.0}>
      <meshStandardMaterial 
        color="#1e1b4b" 
        wireframe 
        emissive="#4f46e5" 
        emissiveIntensity={1.0} 
        roughness={0.5} 
        metalness={0.8}
      />
    </Dodecahedron>
  );
};

// Main component that sets up the 3D scene
const GeometricShape: React.FC = () => {
    // State to track the position of the currently hovered service node.
    const [hoveredNodePosition, setHoveredNodePosition] = useState<[number, number, number] | null>(null);

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
        {/* Render service nodes in a circular pattern */}
        {services.map((service, index) => {
          const angle = (index / services.length) * Math.PI * 2;
          const radius = 4.5;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          // Stagger y position for visual interest
          const y = (index % 2 - 0.5) * 2.5;
          return (
            <ServiceNode 
              key={index} 
              position={[x, y, z]} 
              setHoveredPosition={setHoveredNodePosition}
              {...service} 
            />
          );
        })}
        <Rig hoveredNodePosition={hoveredNodePosition} />
      </ScrollControls>
    </Canvas>
  );
};

export default GeometricShape;
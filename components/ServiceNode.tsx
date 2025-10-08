import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Html } from '@react-three/drei';
import * as THREE from 'three';

interface ServiceNodeProps {
  position: [number, number, number];
  title: string;
  description: string;
  icon: React.ReactNode;
  setHoveredPosition: (position: [number, number, number] | null) => void;
}

const ServiceNode: React.FC<ServiceNodeProps> = ({ position, title, description, icon, setHoveredPosition }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  const targetColor = hovered ? new THREE.Color('#a78bfa') : new THREE.Color('#4338ca'); // purple-400 : indigo-700
  const targetEmissive = hovered ? new THREE.Color('#8b5cf6') : new THREE.Color('#4f46e5'); // violet-500 : indigo-600
  const targetScale = hovered ? 1.2 : 1.0;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    const mesh = groupRef.current.children[0] as THREE.Mesh;
    if (!mesh) return;

    // Smoothly animate color
    (mesh.material as THREE.MeshStandardMaterial).color.lerp(targetColor, delta * 10);
    (mesh.material as THREE.MeshStandardMaterial).emissive.lerp(targetEmissive, delta * 10);
    
    // Smoothly animate scale
    mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);

    // Subtle floating animation
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.sin(t * 2 + position[0]) * 0.1;
  });

  return (
    <group 
      position={position}
      ref={groupRef}
      onPointerOver={(e) => { 
        e.stopPropagation(); 
        setHovered(true);
        setHoveredPosition(position);
      }}
      onPointerOut={(e) => { 
        e.stopPropagation(); 
        setHovered(false); 
        setHoveredPosition(null);
      }}
    >
      <Box args={[0.8, 0.8, 0.8]}>
        <meshStandardMaterial 
          wireframe
          color="#4338ca"
          emissive="#4f46e5"
          emissiveIntensity={1.5}
        />
      </Box>
      <Html 
        position={[0, 0, 0.5]} 
        center 
        distanceFactor={10}
        // This transform style ensures the HTML element doesn't block raycasting for the objects behind it
        style={{ pointerEvents: 'none' }}
      >
        <div className="bg-gray-900/60 backdrop-blur-sm p-4 rounded-lg border border-indigo-700/50 w-64 text-left transition-all duration-300"
             style={{
                transform: `scale(${hovered ? 1.05 : 1})`,
                borderColor: hovered ? 'rgba(167, 139, 250, 0.7)' : 'rgba(67, 56, 202, 0.5)',
             }}
        >
          <div className="mb-2">{icon}</div>
          <h3 className="text-lg font-bold mb-1 text-white">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </Html>
    </group>
  );
};

export default ServiceNode;
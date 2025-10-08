
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface InfoNodeProps {
  position: [number, number, number];
  children: React.ReactNode;
  setHoveredPosition: (position: [number, number, number] | null) => void;
}

const InfoNode: React.FC<InfoNodeProps> = ({ position, children, setHoveredPosition }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  const targetScale = hovered ? 1.1 : 1.0;

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    
    // Smoothly animate scale on hover
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);
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
      <Html 
        center 
        distanceFactor={12}
        transform
        occlude
        style={{ pointerEvents: 'none', opacity: 0 }} // Initial opacity managed by parent
      >
        <div 
          className="bg-black/60 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/20 text-center transition-all duration-300"
          style={{
            borderColor: hovered ? 'rgba(34, 211, 238, 0.7)' : 'rgba(34, 211, 238, 0.2)',
            boxShadow: hovered ? '0 0 25px rgba(34, 211, 238, 0.5)' : 'none',
            minWidth: '200px',
            color: 'white',
          }}
        >
          {children}
        </div>
      </Html>
    </group>
  );
};

export default InfoNode;

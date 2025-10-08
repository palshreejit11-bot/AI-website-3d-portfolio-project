
import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, useScroll, Cylinder, Icosahedron, Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';
import InfoNode from './ServiceNode'; // Re-using ServiceNode as InfoNode

// --- DATA FOR EACH 3D SCENE ---
const services = [
  { title: 'Frontend Development' },
  { title: 'UI/UX Design' },
  { title: 'API Integration' },
  { title: 'Cloud Solutions' },
];
const projects = [
  { title: 'QuantumLeap AI' },
  { title: 'Nova Financials' },
  { title: 'Synergy Connect' },
];
const philosophy = [
  { title: 'Innovation' },
  { title: 'Performance' },
  { title: 'Scalability' },
];
const contactDetails = [
    { title: 'Email', value: 'info@synapse.com' },
    { title: 'Phone', value: '+1 (555) 123-4567' },
    { title: 'Social', value: '@SynapseDigital' },
]

const sceneContent = [
  { id: 'hero', title: 'SYNAPSE DIGITAL', subtitle: 'Innovate. Perform. Scale.', nodes: [], range: [0, 1/6] },
  { id: 'services', title: 'OUR SERVICES', nodes: services, range: [1/6, 1/6] },
  { id: 'portfolio', title: 'OUR WORK', nodes: projects, range: [2.5/6, 1.5/6] },
  { id: 'about', title: 'OUR PHILOSOPHY', nodes: philosophy, range: [4/6, 1/6] },
  { id: 'contact', title: 'CONTACT US', nodes: contactDetails, range: [5/6, 1/6] },
];

const currentLookAt = new THREE.Vector3(0, 1.5, 0);

const Rig = ({ hoveredNodePosition }: { hoveredNodePosition: [number, number, number] | null }) => {
  const { camera, mouse } = useThree();
  const finalPosition = new THREE.Vector3();
  const targetLookAt = hoveredNodePosition ? new THREE.Vector3(...hoveredNodePosition) : new THREE.Vector3(0, 1.5, 0);
  
  return useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const baseRadius = 10;
    const isHovered = !!hoveredNodePosition;
    const targetRadius = isHovered ? baseRadius * 0.8 : baseRadius;
    const parallaxStrength = isHovered ? 0.5 : 1.5;
    
    const lerpedRadius = THREE.MathUtils.lerp(camera.position.length(), targetRadius, 0.08);
    
    const orbitX = Math.sin(t * 0.05) * lerpedRadius;
    const orbitZ = Math.cos(t * 0.05) * lerpedRadius;
    
    camera.position.lerp(finalPosition.set(orbitX + mouse.x * parallaxStrength, 2 + mouse.y * parallaxStrength, orbitZ), 0.05);
    currentLookAt.lerp(targetLookAt, 0.08);
    camera.lookAt(currentLookAt);
  });
};

const materialProps = {
    wireframe: true,
    color: new THREE.Color("#0891b2"), // cyan-600
    emissive: new THREE.Color("#22d3ee"), // cyan-400
    emissiveIntensity: 1,
    roughness: 0.5,
    metalness: 0.8,
    transparent: true,
    opacity: 1
};

const FadingMaterial = new THREE.MeshStandardMaterial(materialProps);

const HolographicTree = () => {
  const treeRef = useRef<THREE.Group>(null!);
  const rootsRef = useRef<THREE.Group>(null!);
  const scroll = useScroll();

  const branches = useMemo(() => Array.from({ length: 15 }, () => ({
    position: [(Math.random() - 0.5) * 2, 2 + Math.random() * 1.5, (Math.random() - 0.5) * 2],
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
    scale: 0.3 + Math.random() * 0.3
  })), []);

  const roots = useMemo(() => Array.from({ length: 10 }, () => ({
    position: [(Math.random() - 0.5) * 1.5, -1.8, (Math.random() - 0.5) * 1.5],
    rotation: [Math.random() * Math.PI/2 - Math.PI/4, Math.random() * Math.PI, 0],
    scale: 0.1 + Math.random() * 0.2
  })), []);

  const apples = useMemo(() => Array.from({length: 10}, () => ({
    position: [(Math.random() - 0.5) * 4, 1.5 + Math.random() * 2, (Math.random() - 0.5) * 4],
  })), [])

  useFrame((_state, delta) => {
    if (treeRef.current) {
      treeRef.current.rotation.y += delta * 0.05;
    }
    if(rootsRef.current) {
        const visibility = THREE.MathUtils.smoothstep(scroll.offset, 0.85, 1.0);
        ((rootsRef.current.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial).opacity = visibility;
    }
  });

  return (
    <group ref={treeRef} position={[0, -1, 0]} dispose={null}>
      <Icosahedron args={[2.5, 2]} position={[0, 2.5, 0]}>
        <meshStandardMaterial {...materialProps} roughness={0.2} metalness={1} emissiveIntensity={0.5} />
      </Icosahedron>
      {branches.map((b, i) => 
        <Icosahedron key={i} args={[b.scale * 2, 1]} position={b.position as any} rotation={b.rotation as any} >
            <meshStandardMaterial {...materialProps} />
        </Icosahedron>
      )}
      <Cylinder args={[0.1, 0.3, 4.5, 8]} position={[0, 0, 0]}>
        <meshStandardMaterial {...materialProps} />
      </Cylinder>
      <group ref={rootsRef}>
        <Cylinder args={[0.3, 0.01, 1.5, 8]} position={[0, -2.2, 0]}>
            <meshStandardMaterial {...materialProps} transparent opacity={0} />
        </Cylinder>
        {roots.map((r, i) =>
            <Cylinder key={i} args={[r.scale * 0.5, 0.01, 1, 6]} position={r.position as any} rotation={r.rotation as any}>
                <meshStandardMaterial {...materialProps} transparent opacity={0} />
            </Cylinder>
        )}
      </group>
      {apples.map((a, i) =>
        <Sphere key={i} args={[0.1, 8, 8]} position={a.position as any}>
            <meshStandardMaterial color="#0891b2" emissive="#67e8f9" emissiveIntensity={2} />
        </Sphere>
      )}
    </group>
  );
};


// Fix: Define props interface for Section3D to correctly type the component.
// This resolves the error where TypeScript incorrectly flags the 'key' prop as an issue.
interface Section3DProps {
  data: (typeof sceneContent)[number];
  setHoveredNodePosition: (position: [number, number, number] | null) => void;
}

const Section3D = ({ data, setHoveredNodePosition }: Section3DProps) => {
    const { title, subtitle, nodes, range } = data;
    const groupRef = useRef<THREE.Group>(null!);
    const scroll = useScroll();

    useFrame(() => {
        if (!groupRef.current) return;
        const visibility = scroll.range(range[0], range[1]);
        groupRef.current.visible = visibility > 0;
        
        // Update opacity on all materials
        groupRef.current.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                (child.material as THREE.MeshStandardMaterial).opacity = visibility;
            }
        });

        // Also update HTML elements
        const htmlElements = groupRef.current.children.filter(c => c.type === 'Object3D' && c.children.length > 0 && c.children[0].type === 'Group');
        htmlElements.forEach(el => {
            const htmlDiv = (el as any).el.firstChild;
            if(htmlDiv) htmlDiv.style.opacity = visibility;
        });
    });

    const isContact = data.id === 'contact';

    return (
        <group ref={groupRef}>
            <Text
                position={[0, 3.5, 0]}
                fontSize={data.id === 'hero' ? 0.8 : 0.5}
                color="#67e8f9"
                anchorX="center"
                anchorY="middle"
                material={FadingMaterial}
            >
                {title}
            </Text>
            {subtitle && <Text position={[0, 2.8, 0]} fontSize={0.25} color="white" anchorX="center" material={FadingMaterial}>{subtitle}</Text>}

            {nodes.map((node, index) => {
                const angle = (index / nodes.length) * Math.PI * 2;
                const radius = isContact ? 2.5 : 4;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                const y = isContact ? 1.5 - index * 0.7 : 1 + (index % 2 - 0.5) * 1.5;

                return (
                    <InfoNode
                        key={index}
                        position={[x, y, z]}
                        setHoveredPosition={setHoveredNodePosition}
                    >
                        {isContact ? 
                            <div className="text-left w-full"><strong className="text-cyan-400">{node.title}:</strong> {node.value}</div> : 
                            <h3 className="text-lg font-bold text-white">{node.title}</h3>
                        }
                    </InfoNode>
                )
            })}
        </group>
    );
};


const GeometricShape: React.FC = () => {
    const [hoveredNodePosition, setHoveredNodePosition] = useState<[number, number, number] | null>(null);

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <hemisphereLight intensity={0.8} groundColor="black" />
      <pointLight intensity={2} position={[5, 5, 5]} color="#06b6d4" />
      <spotLight position={[-20, 50, 10]} angle={0.12} penumbra={1} intensity={1} castShadow shadow-mapSize={1024} />
      <ScrollControls pages={6} damping={0.1}>
        <HolographicTree />
        {sceneContent.map(section => (
            <Section3D key={section.id} data={section} setHoveredNodePosition={setHoveredNodePosition} />
        ))}
        <Rig hoveredNodePosition={hoveredNodePosition} />
      </ScrollControls>
    </Canvas>
  );
};

export default GeometricShape;
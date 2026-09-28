import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Float } from '@react-three/drei'
import type { Group, Mesh } from 'three'

function HouseModel({ isNight }: { isNight: boolean }) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  const wallColor = isNight ? '#1a1a2e' : '#f5f5f0'
  const accentColor = '#c9a96e'
  const glassColor = isNight ? '#1a3a5c' : '#87ceeb'
  const roofColor = '#2d2d2d'

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Foundation/Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6, 0.2, 4]} />
        <meshStandardMaterial color="#333" roughness={0.8} />
      </mesh>

      {/* First Floor - Main Body */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[5.8, 2.2, 3.8]} />
        <meshStandardMaterial color={wallColor} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Second Floor - Offset */}
      <mesh position={[-0.5, 3.3, 0]}>
        <boxGeometry args={[4.5, 2, 3.6]} />
        <meshStandardMaterial color={wallColor} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Roof - Flat modern style */}
      <mesh position={[-0.5, 4.35, 0]}>
        <boxGeometry args={[4.8, 0.15, 3.9]} />
        <meshStandardMaterial color={roofColor} roughness={0.6} metalness={0.3} />
      </mesh>

      {/* First floor overhang */}
      <mesh position={[0, 2.35, 0]}>
        <boxGeometry args={[6.2, 0.1, 4.2]} />
        <meshStandardMaterial color={roofColor} roughness={0.6} metalness={0.3} />
      </mesh>

      {/* Large Windows - Ground Floor Front */}
      <mesh position={[-1.5, 1.2, 1.91]}>
        <boxGeometry args={[1.8, 1.6, 0.05]} />
        <meshStandardMaterial color={glassColor} roughness={0.1} metalness={0.8} transparent opacity={0.7} />
      </mesh>
      <mesh position={[1.2, 1.2, 1.91]}>
        <boxGeometry args={[1.4, 1.6, 0.05]} />
        <meshStandardMaterial color={glassColor} roughness={0.1} metalness={0.8} transparent opacity={0.7} />
      </mesh>

      {/* Windows - Second Floor */}
      <mesh position={[-1.2, 3.3, 1.81]}>
        <boxGeometry args={[1.5, 1.4, 0.05]} />
        <meshStandardMaterial color={glassColor} roughness={0.1} metalness={0.8} transparent opacity={0.7} />
      </mesh>
      <mesh position={[0.5, 3.3, 1.81]}>
        <boxGeometry args={[1, 1.4, 0.05]} />
        <meshStandardMaterial color={glassColor} roughness={0.1} metalness={0.8} transparent opacity={0.7} />
      </mesh>

      {/* Side Windows */}
      <mesh position={[2.91, 1.2, 0]}>
        <boxGeometry args={[0.05, 1.6, 2]} />
        <meshStandardMaterial color={glassColor} roughness={0.1} metalness={0.8} transparent opacity={0.5} />
      </mesh>

      {/* Front Door */}
      <mesh position={[0, 0.85, 1.92]}>
        <boxGeometry args={[0.8, 1.5, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Door Handle */}
      <mesh position={[0.3, 0.85, 1.96]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color={accentColor} roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Balcony */}
      <mesh position={[-2.5, 2.4, 1.5]}>
        <boxGeometry args={[1.2, 0.08, 1.5]} />
        <meshStandardMaterial color={roofColor} roughness={0.5} metalness={0.4} />
      </mesh>
      {/* Balcony railing */}
      <mesh position={[-2.5, 2.8, 2.2]}>
        <boxGeometry args={[1.2, 0.04, 0.04]} />
        <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[-2.5, 2.6, 2.2]}>
        <boxGeometry args={[0.03, 0.4, 0.03]} />
        <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[-3.0, 2.6, 2.2]}>
        <boxGeometry args={[0.03, 0.4, 0.03]} />
        <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[-2.0, 2.6, 2.2]}>
        <boxGeometry args={[0.03, 0.4, 0.03]} />
        <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Accent Lines */}
      <mesh position={[0, 0.15, 1.95]}>
        <boxGeometry args={[5.8, 0.03, 0.03]} />
        <meshStandardMaterial color={accentColor} roughness={0.2} metalness={0.9} emissive={accentColor} emissiveIntensity={isNight ? 0.5 : 0.1} />
      </mesh>

      {/* Landscaping - Bushes */}
      {[[-2.5, 0.3, 2.5], [2.5, 0.3, 2.5], [-1, 0.25, 2.8], [1.5, 0.25, 2.8]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.3 + Math.random() * 0.15, 12, 12]} />
          <meshStandardMaterial color="#2d5a27" roughness={0.9} />
        </mesh>
      ))}

      {/* Pathway */}
      <mesh position={[0, 0.02, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.2, 2.5]} />
        <meshStandardMaterial color="#555" roughness={0.8} />
      </mesh>

      {/* Garage */}
      <mesh position={[2.2, 0.8, 1.92]}>
        <boxGeometry args={[1.5, 1.4, 0.05]} />
        <meshStandardMaterial color="#222" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Garage lines */}
      {[0.3, 0.6, 0.9, 1.2].map((y, i) => (
        <mesh key={`garage-${i}`} position={[2.2, y, 1.95]}>
          <boxGeometry args={[1.4, 0.02, 0.02]} />
          <meshStandardMaterial color="#444" />
        </mesh>
      ))}

      {/* Interior lights glow (night mode) */}
      {isNight && (
        <>
          <pointLight position={[-1.5, 1.2, 1.5]} intensity={2} color="#ffcc66" distance={3} />
          <pointLight position={[1.2, 1.2, 1.5]} intensity={1.5} color="#ffcc66" distance={2} />
          <pointLight position={[-1.2, 3.3, 1.5]} intensity={1.5} color="#ffcc66" distance={2} />
        </>
      )}
    </group>
  )
}

function Hotspot({ position, label, onClick }: { position: [number, number, number]; label: string; onClick: () => void }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} onClick={onClick}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#c9a96e" emissive="#c9a96e" emissiveIntensity={0.5} transparent opacity={0.9} />
      </mesh>
    </Float>
  )
}

function InteriorScene({ room }: { room: string }) {
  const roomColors: Record<string, { wall: string; floor: string; accent: string }> = {
    living: { wall: '#f0ebe3', floor: '#8b7355', accent: '#c9a96e' },
    kitchen: { wall: '#f5f5f5', floor: '#4a4a4a', accent: '#2d2d2d' },
    bedroom: { wall: '#e8e0d4', floor: '#a0896e', accent: '#c9a96e' },
    bathroom: { wall: '#f8f8f8', floor: '#d4d4d4', accent: '#4a90a4' },
  }

  const colors = roomColors[room] || roomColors.living

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color={colors.floor} roughness={0.6} />
      </mesh>
      {/* Back Wall */}
      <mesh position={[0, 1, -4]}>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color={colors.wall} roughness={0.4} />
      </mesh>
      {/* Left Wall */}
      <mesh position={[-4, 1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color={colors.wall} roughness={0.4} />
      </mesh>
      {/* Right Wall */}
      <mesh position={[4, 1, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color={colors.wall} roughness={0.4} />
      </mesh>

      {/* Room-specific furniture */}
      {room === 'living' && (
        <>
          {/* Sofa */}
          <mesh position={[0, -0.4, -2]}>
            <boxGeometry args={[3, 0.8, 1]} />
            <meshStandardMaterial color="#4a4a4a" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0, -2.4]}>
            <boxGeometry args={[3, 0.6, 0.2]} />
            <meshStandardMaterial color="#3a3a3a" roughness={0.8} />
          </mesh>
          {/* Coffee Table */}
          <mesh position={[0, -0.5, -0.5]}>
            <boxGeometry args={[1.5, 0.05, 0.8]} />
            <meshStandardMaterial color={colors.accent} roughness={0.3} metalness={0.5} />
          </mesh>
          <mesh position={[0, -0.75, -0.5]}>
            <cylinderGeometry args={[0.03, 0.03, 0.5]} />
            <meshStandardMaterial color="#333" metalness={0.8} />
          </mesh>
          {/* TV */}
          <mesh position={[0, 1, -3.9]}>
            <boxGeometry args={[2.5, 1.5, 0.05]} />
            <meshStandardMaterial color="#111" roughness={0.1} metalness={0.9} />
          </mesh>
        </>
      )}

      {room === 'kitchen' && (
        <>
          {/* Counter */}
          <mesh position={[0, -0.3, -3]}>
            <boxGeometry args={[6, 0.1, 1.5]} />
            <meshStandardMaterial color="#e0e0e0" roughness={0.2} metalness={0.3} />
          </mesh>
          <mesh position={[0, -0.7, -3]}>
            <boxGeometry args={[6, 0.7, 1.4]} />
            <meshStandardMaterial color={colors.accent} roughness={0.5} />
          </mesh>
          {/* Island */}
          <mesh position={[0, -0.4, 0]}>
            <boxGeometry args={[2.5, 0.8, 1.2]} />
            <meshStandardMaterial color="#555" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[2.6, 0.05, 1.3]} />
            <meshStandardMaterial color="#ddd" roughness={0.2} metalness={0.3} />
          </mesh>
        </>
      )}

      {room === 'bedroom' && (
        <>
          {/* Bed */}
          <mesh position={[0, -0.5, -1.5]}>
            <boxGeometry args={[2.5, 0.5, 3]} />
            <meshStandardMaterial color="#f0f0f0" roughness={0.9} />
          </mesh>
          <mesh position={[0, -0.1, -2.8]}>
            <boxGeometry args={[2.5, 0.8, 0.3]} />
            <meshStandardMaterial color="#ddd" roughness={0.7} />
          </mesh>
          {/* Pillows */}
          <mesh position={[-0.5, -0.1, -2.3]}>
            <boxGeometry args={[0.6, 0.2, 0.4]} />
            <meshStandardMaterial color="#fff" roughness={0.9} />
          </mesh>
          <mesh position={[0.5, -0.1, -2.3]}>
            <boxGeometry args={[0.6, 0.2, 0.4]} />
            <meshStandardMaterial color="#fff" roughness={0.9} />
          </mesh>
          {/* Nightstands */}
          <mesh position={[-1.8, -0.5, -2]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color={colors.accent} roughness={0.4} metalness={0.3} />
          </mesh>
          <mesh position={[1.8, -0.5, -2]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color={colors.accent} roughness={0.4} metalness={0.3} />
          </mesh>
        </>
      )}

      {room === 'bathroom' && (
        <>
          {/* Bathtub */}
          <mesh position={[-2, -0.6, -2]}>
            <boxGeometry args={[1.8, 0.7, 0.9]} />
            <meshStandardMaterial color="#f5f5f5" roughness={0.2} metalness={0.3} />
          </mesh>
          {/* Vanity */}
          <mesh position={[2, -0.4, -3]}>
            <boxGeometry args={[2, 0.8, 0.8]} />
            <meshStandardMaterial color={colors.accent} roughness={0.4} />
          </mesh>
          {/* Mirror */}
          <mesh position={[2, 1, -3.95]}>
            <boxGeometry args={[1.5, 2, 0.05]} />
            <meshStandardMaterial color="#aaa" roughness={0.05} metalness={0.9} />
          </mesh>
          {/* Toilet */}
          <mesh position={[2.5, -0.5, 1]}>
            <boxGeometry args={[0.5, 0.6, 0.7]} />
            <meshStandardMaterial color="#fff" roughness={0.3} />
          </mesh>
        </>
      )}
    </group>
  )
}

export function HouseViewer({ isNight, onHotspotClick }: { isNight: boolean; onHotspotClick: (room: string) => void }) {
  return (
    <Canvas
      camera={{ position: [8, 5, 8], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={isNight ? 0.1 : 0.4} />
      <directionalLight
        position={isNight ? [-5, 8, -5] : [5, 8, 5]}
        intensity={isNight ? 0.3 : 1.2}
        color={isNight ? '#4466aa' : '#ffffff'}
        castShadow
      />
      {isNight && (
        <pointLight position={[0, 6, 0]} intensity={0.5} color="#ffcc66" />
      )}

      <HouseModel isNight={isNight} />

      <Hotspot position={[-1.5, 1.5, 2.5]} label="Living Room" onClick={() => onHotspotClick('living')} />
      <Hotspot position={[1.5, 1.5, 2.5]} label="Kitchen" onClick={() => onHotspotClick('kitchen')} />
      <Hotspot position={[-1, 3.8, 2.5]} label="Master Bedroom" onClick={() => onHotspotClick('bedroom')} />
      <Hotspot position={[0.5, 3.8, 2.5]} label="Bathroom" onClick={() => onHotspotClick('bathroom')} />

      <ContactShadows position={[0, -0.5, 0]} opacity={0.4} blur={2} far={4} />
      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={15}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  )
}

export function InteriorViewer({ room }: { room: string }) {
  return (
    <Canvas
      camera={{ position: [0, 1, 5], fov: 60 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 3]} intensity={0.8} />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#ffcc66" />

      <InteriorScene room={room} />

      <OrbitControls
        enablePan={false}
        minDistance={2}
        maxDistance={8}
        minPolarAngle={0.5}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </Canvas>
  )
}

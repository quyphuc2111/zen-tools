import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

interface RaceModeProps {
  items: string[];
  onRaceEnd: (winner: string) => void;
  triggerRace: number;
  duration: number; // seconds
}

const LANE_COLORS = [
  '#FF3B30', '#34C759', '#007AFF', '#FFCC00',
  '#AF52DE', '#5AC8FA', '#FF2D55', '#FF9500',
  '#30D158', '#64D2FF',
];

const TRACK_LENGTH = 40;
const BASE_LANE_WIDTH = 1.8;
const BASE_LANE_GAP = 0.3;

function getLaneMetrics(count: number) {
  // Shrink lanes when many participants so they fit on screen
  const scale = count <= 6 ? 1 : Math.max(0.4, 6 / count);
  return {
    laneWidth: BASE_LANE_WIDTH * scale,
    laneGap: BASE_LANE_GAP * scale,
    duckScale: 0.55 * scale,
  };
}

// --- Procedural Duck geometry ---
function DuckModel({ color, duckScale }: { color: string; duckScale: number }) {
  const wingRef = useRef<THREE.Group>(null);
  const timeRef = useRef(Math.random() * 100);

  useFrame((_, delta) => {
    timeRef.current += delta * 8;
    if (wingRef.current) {
      wingRef.current.rotation.z = Math.sin(timeRef.current) * 0.3;
    }
  });

  return (
    <group scale={duckScale}>
      {/* Body - ellipsoid */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Body stretch */}
      <mesh position={[-0.2, -0.15, 0]} scale={[1.3, 0.85, 0.9]} castShadow>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Head */}
      <mesh position={[0.9, 0.7, 0]} castShadow>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Beak - orange cone */}
      <mesh position={[1.45, 0.6, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.18, 0.45, 12]} />
        <meshStandardMaterial color="#FF9500" roughness={0.3} />
      </mesh>
      {/* Lower beak */}
      <mesh position={[1.35, 0.48, 0]} rotation={[0, 0, -Math.PI / 2]} scale={[0.7, 0.8, 1]}>
        <coneGeometry args={[0.14, 0.35, 12]} />
        <meshStandardMaterial color="#E8850A" roughness={0.3} />
      </mesh>

      {/* Eyes */}
      <mesh position={[1.15, 0.85, 0.3]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[1.25, 0.87, 0.35]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[1.15, 0.85, -0.3]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[1.25, 0.87, -0.35]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Wings - animated */}
      <group ref={wingRef}>
        {/* Right wing */}
        <mesh position={[0, 0.15, 0.85]} rotation={[0.3, 0, 0.2]} scale={[0.7, 0.15, 0.45]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
        {/* Left wing */}
        <mesh position={[0, 0.15, -0.85]} rotation={[-0.3, 0, 0.2]} scale={[0.7, 0.15, 0.45]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
      </group>

      {/* Tail feathers */}
      <mesh position={[-1.1, 0.3, 0]} rotation={[0, 0, 0.6]} scale={[0.4, 0.12, 0.35]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh position={[-1.2, 0.5, 0]} rotation={[0, 0, 0.8]} scale={[0.35, 0.1, 0.25]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>

      {/* Feet - orange */}
      <mesh position={[0.2, -0.85, 0.35]} rotation={[0, 0, 0]} scale={[0.4, 0.08, 0.25]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#FF9500" roughness={0.3} />
      </mesh>
      <mesh position={[0.2, -0.85, -0.35]} rotation={[0, 0, 0]} scale={[0.4, 0.08, 0.25]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#FF9500" roughness={0.3} />
      </mesh>
    </group>
  );
}

const RAINBOW_COLORS = [
  '#FF0000', '#FF7700', '#FFFF00', '#00FF00',
  '#0000FF', '#4B0082', '#9400D3',
];

// --- Duck racer with rainbow trail ---
function Racer({
  laneIndex,
  totalLanes,
  progress,
  color,
  label,
}: {
  laneIndex: number;
  totalLanes: number;
  progress: number;
  color: string;
  label: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const trailPositions = useRef<THREE.Vector3[]>([]);
  const [trailPoints, setTrailPoints] = useState<THREE.Vector3[]>([]);
  const timeRef = useRef(Math.random() * 100);

  const { laneWidth, laneGap, duckScale } = getLaneMetrics(totalLanes);
  const totalWidth = totalLanes * (laneWidth + laneGap) - laneGap;
  const z = -totalWidth / 2 + laneIndex * (laneWidth + laneGap) + laneWidth / 2;
  const x = -TRACK_LENGTH / 2 + (progress / 100) * TRACK_LENGTH;
  const trailSize = Math.max(10, Math.round(21 * (duckScale / 0.55)));

  useFrame((_, delta) => {
    timeRef.current += delta * 6;
    if (groupRef.current) {
      groupRef.current.position.x = x;
      groupRef.current.position.z = z;
      groupRef.current.rotation.z = Math.sin(timeRef.current) * 0.12;
      groupRef.current.position.y = 0.6 + Math.abs(Math.sin(timeRef.current * 1.5)) * 0.15;
    }

    trailPositions.current.push(new THREE.Vector3(x, 0.35, z));
    if (trailPositions.current.length > trailSize) trailPositions.current.shift();
    setTrailPoints([...trailPositions.current]);
  });

  const maxTrailRadius = 0.22 * (duckScale / 0.55);

  return (
    <group>
      {/* Rainbow trail */}
      {trailPoints.map((pos, i) => {
        const colorIndex = i % RAINBOW_COLORS.length;
        const scale = ((i + 1) / trailPoints.length) * maxTrailRadius;
        const opacity = ((i + 1) / trailPoints.length) * 0.7;
        return (
          <mesh key={i} position={[pos.x, pos.y + Math.sin(i * 0.5) * 0.08, pos.z]}>
            <sphereGeometry args={[scale, 8, 8]} />
            <meshStandardMaterial
              color={RAINBOW_COLORS[colorIndex]}
              emissive={RAINBOW_COLORS[colorIndex]}
              emissiveIntensity={0.6}
              transparent
              opacity={opacity}
            />
          </mesh>
        );
      })}

      {/* Duck */}
      <group ref={groupRef} position={[x, 0.6, z]}>
        <DuckModel color={color} duckScale={duckScale} />
      </group>

      {/* Name label */}
      <Text
        position={[-TRACK_LENGTH / 2 - 1.5, 0.5, z]}
        fontSize={Math.max(0.2, 0.35 * (duckScale / 0.55))}
        color="white"
        anchorX="right"
        anchorY="middle"
        maxWidth={3}
        font={undefined}
      >
        {label.length > 12 ? label.substring(0, 10) + '..' : label}
      </Text>
    </group>
  );
}

// --- Race track ground ---
function Track({ laneCount }: { laneCount: number }) {
  const { laneWidth, laneGap } = getLaneMetrics(laneCount);
  const totalWidth = laneCount * (laneWidth + laneGap) - laneGap;

  return (
    <group>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[TRACK_LENGTH + 10, totalWidth + 4]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>

      {/* Lanes */}
      {Array.from({ length: laneCount }).map((_, i) => {
        const z = -totalWidth / 2 + i * (laneWidth + laneGap) + laneWidth / 2;
        return (
          <group key={i}>
            {/* Lane surface */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, z]} receiveShadow>
              <planeGeometry args={[TRACK_LENGTH, laneWidth]} />
              <meshStandardMaterial color="#252540" />
            </mesh>
            {/* Lane dashes */}
            {Array.from({ length: 20 }).map((_, j) => (
              <mesh
                key={j}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[-TRACK_LENGTH / 2 + j * 2 + 1, 0.01, z]}
              >
                <planeGeometry args={[1, 0.05]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
              </mesh>
            ))}
          </group>
        );
      })}

      {/* Finish line */}
      <RoundedBox
        args={[0.3, 2, totalWidth + 1]}
        radius={0.05}
        position={[TRACK_LENGTH / 2 - 2, 1, 0]}
      >
        <meshStandardMaterial color="#FFCC00" emissive="#FFCC00" emissiveIntensity={0.5} />
      </RoundedBox>

      {/* Finish checkered pattern (simplified) */}
      {Array.from({ length: 8 }).map((_, i) =>
        Array.from({ length: Math.ceil(totalWidth / 0.5) }).map((_, j) => {
          const isWhite = (i + j) % 2 === 0;
          return (
            <mesh
              key={`${i}-${j}`}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[
                TRACK_LENGTH / 2 - 2 + (i - 4) * 0.5,
                0.02,
                -totalWidth / 2 + j * 0.5 + 0.25,
              ]}
            >
              <planeGeometry args={[0.5, 0.5]} />
              <meshBasicMaterial
                color={isWhite ? '#ffffff' : '#000000'}
                transparent
                opacity={0.6}
              />
            </mesh>
          );
        }),
      )}

      {/* Side barriers */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[0, 0.15, side * (totalWidth / 2 + 0.5)]}
        >
          <boxGeometry args={[TRACK_LENGTH + 4, 0.3, 0.15]} />
          <meshStandardMaterial
            color="#ff3b30"
            emissive="#ff3b30"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// --- Floating position indicators ---
function PositionBadges({
  items,
  progress,
}: {
  items: string[];
  progress: number[];
}) {
  const sorted = items
    .map((name, i) => ({ name, progress: progress[i] }))
    .sort((a, b) => b.progress - a.progress);

  return (
    <group position={[TRACK_LENGTH / 2 + 2, 0, 0]}>
      {sorted.slice(0, 3).map((entry, i) => (
        <Float key={i} speed={2} floatIntensity={0.3}>
          <Text
            position={[0, 2 - i * 0.8, 0]}
            fontSize={0.3}
            color={i === 0 ? '#FFCC00' : i === 1 ? '#C0C0C0' : '#CD7F32'}
            anchorX="left"
            font={undefined}
          >
            {`${i + 1}. ${entry.name.length > 10 ? entry.name.substring(0, 8) + '..' : entry.name}`}
          </Text>
        </Float>
      ))}
    </group>
  );
}

// --- Dynamic camera that adjusts to lane count ---
function CameraController({ laneCount }: { laneCount: number }) {
  const { laneWidth, laneGap } = getLaneMetrics(laneCount);
  const totalWidth = laneCount * (laneWidth + laneGap) - laneGap;
  // Gentle zoom: only pull back slightly for many lanes
  const extraHeight = Math.max(0, (totalWidth - 10) * 0.45);
  const extraDepth = Math.max(0, (totalWidth - 10) * 0.4);
  const targetY = 18 + extraHeight;
  const targetZ = 22 + extraDepth;

  useFrame(({ camera }) => {
    camera.position.x += (0 - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// --- Main RaceMode component ---
export function RaceMode({ items, onRaceEnd, triggerRace, duration }: RaceModeProps) {
  const [progress, setProgress] = useState<number[]>(items.map(() => 0));
  const [isRacing, setIsRacing] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (triggerRace > 0 && items.length > 1) {
      setProgress(items.map(() => 0));
      setIsRacing(true);
      setElapsed(0);
      let currentProgress = items.map(() => 0);
      let tickCount = 0;

      // Calculate speed: we want the race to last ~duration seconds
      // interval = 50ms, so totalTicks = duration * 1000 / 50
      // Each tick, average progress = 95 / totalTicks (to reach 95% at the end)
      const intervalMs = 50;
      const totalTicks = (duration * 1000) / intervalMs;
      const baseSpeed = 95 / totalTicks;

      const interval = setInterval(() => {
        tickCount++;
        // Update elapsed time
        setElapsed(tickCount * intervalMs / 1000);

        // Near the end, add dramatic tension — slow down then burst
        const timeRatio = tickCount / totalTicks;
        let speedMultiplier = 1;
        if (timeRatio > 0.85) {
          // Final stretch: dramatic burst for leader
          speedMultiplier = 1.3;
        } else if (timeRatio > 0.7) {
          // Tension zone: slow down a bit
          speedMultiplier = 0.7;
        }

        currentProgress = currentProgress.map((p) => {
          const burst = Math.random() > 0.93 ? baseSpeed * 3 : 0;
          const randomFactor = 0.3 + Math.random() * 1.4; // 0.3x to 1.7x
          return Math.min(p + baseSpeed * randomFactor * speedMultiplier + burst, 100);
        });
        setProgress([...currentProgress]);

        const winnerIndex = currentProgress.findIndex((p) => p >= 95);
        if (winnerIndex !== -1) {
          clearInterval(interval);
          setIsRacing(false);
          setTimeout(() => onRaceEnd(items[winnerIndex]), 800);
        }
      }, intervalMs);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRace]);

  return (
    <div className="w-full h-full min-h-[500px] rounded-3xl overflow-hidden relative">
      {/* Timer overlay */}
      {isRacing && (
        <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
            Thời gian
          </p>
          <p className="text-2xl font-black text-white tabular-nums">
            {elapsed.toFixed(1)}s
            <span className="text-sm font-medium text-white/40 ml-1">/ {duration}s</span>
          </p>
          <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 rounded-full transition-all duration-100"
              style={{ width: `${Math.min((elapsed / duration) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Leaderboard overlay */}
      {isRacing && (
        <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 min-w-[160px]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">
            Leaderboard
          </p>
          <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
          {[...items]
            .map((name, i) => ({ name, p: progress[i] }))
            .sort((a, b) => b.p - a.p)
            .map((entry, i) => (
              <div
                key={i}
                className="flex items-center gap-2 py-1 text-xs text-white/80"
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                    i === 0
                      ? 'bg-yellow-400 text-black'
                      : i === 1
                        ? 'bg-gray-300 text-black'
                        : 'bg-white/10 text-white/50'
                  }`}
                >
                  {i + 1}
                </span>
                <span className="truncate max-w-[100px]">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Canvas
        shadows
        camera={{ position: [0, 18, 22], fov: 50 }}
        style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #1a1a3e 100%)' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[TRACK_LENGTH / 2 - 2, 5, 0]} intensity={2} color="#FFCC00" distance={15} />

        <Environment preset="night" />

        <CameraController laneCount={items.length} />

        <Track laneCount={items.length} />

        {items.map((item, i) => (
          <Racer
            key={i}
            laneIndex={i}
            totalLanes={items.length}
            progress={progress[i]}
            color={LANE_COLORS[i % LANE_COLORS.length]}
            label={item}
          />
        ))}

        <PositionBadges items={items} progress={progress} />

        {/* Fog for depth */}
        <fog attach="fog" args={['#0a0a1a', 40, 120]} />
      </Canvas>
    </div>
  );
}

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';

import { PALETTE } from '@/configs';
import { Ball } from '@/scene/primitives';

const SWAY_SPEED = 1.1;
const SWAY_ANGLE = 0.04;

export default function Plant() {
  const leaves = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!leaves.current) return;

    leaves.current.rotation.z =
      Math.sin(clock.elapsedTime * SWAY_SPEED) * SWAY_ANGLE;
  });

  return (
    <group>
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.38, 0.28, 0.6, 24]} />
        <meshStandardMaterial color={PALETTE.pot} roughness={0.7} />
      </mesh>
      <group ref={leaves} position={[0, 0.6, 0]}>
        <Ball
          r={0.3}
          color={PALETTE.leaf}
          position={[0, 0.3, 0]}
          scale={[1, 1.3, 1]}
        />
        <Ball
          r={0.24}
          color={PALETTE.leafDark}
          position={[-0.25, 0.25, 0.05]}
          scale={[1, 1.3, 1]}
        />
        <Ball
          r={0.24}
          color={PALETTE.leafLight}
          position={[0.25, 0.3, -0.05]}
          scale={[1, 1.3, 1]}
        />
        <Ball
          r={0.2}
          color={PALETTE.leafDark}
          position={[0.05, 0.62, 0.1]}
          scale={[1, 1.2, 1]}
        />
      </group>
    </group>
  );
}

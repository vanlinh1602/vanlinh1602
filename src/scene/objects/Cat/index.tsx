import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';

import { PALETTE } from '@/configs';
import { Ball } from '@/scene/primitives';

import CatHead from './CatHead';

const HEAD_TILT_SPEED = 1.4;
const HEAD_TILT_ANGLE = 0.07;
const TAIL_WAG_SPEED = 2.2;
const TAIL_WAG_ANGLE = 0.35;

export default function Cat() {
  const head = useRef<Group>(null);
  const tail = useRef<Group>(null);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;

    if (head.current) {
      head.current.rotation.z =
        Math.sin(time * HEAD_TILT_SPEED) * HEAD_TILT_ANGLE;
    }

    if (tail.current) {
      tail.current.rotation.y =
        Math.sin(time * TAIL_WAG_SPEED) * TAIL_WAG_ANGLE;
    }
  });

  return (
    <group>
      <Ball
        r={0.5}
        color={PALETTE.catFur}
        position={[0, 0.42, 0]}
        scale={[1, 0.85, 1.15]}
      />
      <Ball
        r={0.13}
        color={PALETTE.catFur}
        position={[-0.2, 0.1, 0.5]}
        scale={[1, 0.8, 1.2]}
      />
      <Ball
        r={0.13}
        color={PALETTE.catFur}
        position={[0.2, 0.1, 0.5]}
        scale={[1, 0.8, 1.2]}
      />
      <group ref={tail} position={[0, 0.3, -0.55]}>
        <mesh castShadow>
          <torusGeometry args={[0.28, 0.07, 12, 24, Math.PI]} />
          <meshStandardMaterial color={PALETTE.catFurDark} roughness={0.7} />
        </mesh>
      </group>
      <group ref={head} position={[0, 1.0, 0.3]}>
        <CatHead />
      </group>
    </group>
  );
}

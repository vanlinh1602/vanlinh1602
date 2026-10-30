import { DoubleSide } from 'three';

import { PALETTE } from '@/configs';
import { Ball } from '@/scene/primitives';

export default function Lamp() {
  return (
    <group>
      <mesh position={[0, 0.03, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.2, 0.06, 24]} />
        <meshStandardMaterial color={PALETTE.white} />
      </mesh>
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.66, 12]} />
        <meshStandardMaterial color={PALETTE.white} />
      </mesh>
      <mesh position={[0, 0.78, 0]} castShadow>
        <coneGeometry args={[0.26, 0.28, 24, 1, true]} />
        <meshStandardMaterial color={PALETTE.yellow} side={DoubleSide} />
      </mesh>
      <Ball r={0.07} color={PALETTE.lampBulb} position={[0, 0.7, 0]} />
      <pointLight
        position={[0, 0.7, 0.1]}
        color={PALETTE.lampLight}
        intensity={1.2}
        distance={4}
      />
    </group>
  );
}

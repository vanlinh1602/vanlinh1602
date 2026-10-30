import { PALETTE } from '@/configs';
import { Ball } from '@/scene/primitives';

export default function CatHead() {
  return (
    <>
      <Ball r={0.38} color={PALETTE.catFur} scale={[1.1, 0.95, 1]} />
      <mesh position={[-0.24, 0.34, 0]} rotation={[0, 0, 0.35]} castShadow>
        <coneGeometry args={[0.13, 0.26, 16]} />
        <meshStandardMaterial color={PALETTE.catFurDark} roughness={0.7} />
      </mesh>
      <mesh position={[0.24, 0.34, 0]} rotation={[0, 0, -0.35]} castShadow>
        <coneGeometry args={[0.13, 0.26, 16]} />
        <meshStandardMaterial color={PALETTE.catFurDark} roughness={0.7} />
      </mesh>
      <Ball r={0.05} color={PALETTE.ink} position={[-0.14, 0.04, 0.33]} />
      <Ball r={0.05} color={PALETTE.ink} position={[0.14, 0.04, 0.33]} />
      <Ball
        r={0.035}
        color={PALETTE.catNose}
        position={[0, -0.04, 0.37]}
        scale={[1.3, 0.9, 0.8]}
      />
      <Ball
        r={0.07}
        color={PALETTE.blush}
        position={[-0.26, -0.07, 0.28]}
        scale={[1, 0.6, 0.3]}
      />
      <Ball
        r={0.07}
        color={PALETTE.blush}
        position={[0.26, -0.07, 0.28]}
        scale={[1, 0.6, 0.3]}
      />
    </>
  );
}

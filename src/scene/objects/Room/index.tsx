import { PALETTE } from '@/configs';
import { Box } from '@/scene/primitives';

const RUG_SEGMENTS = 48;

/** Floor, walls and rug. */
export default function Room() {
  return (
    <group>
      <Box
        size={[8, 0.3, 7.5]}
        color={PALETTE.floor}
        position={[0, -0.15, 0.4]}
        radius={0.08}
      />
      <Box
        size={[8, 4.2, 0.25]}
        color={PALETTE.wallBack}
        position={[0, 2.1, -2.95]}
        radius={0.06}
      />
      <Box
        size={[0.25, 4.2, 7.5]}
        color={PALETTE.wallSide}
        position={[-3.95, 2.1, 0.4]}
        radius={0.06}
      />
      <mesh position={[-1.6, 0.012, 0.8]} receiveShadow>
        <cylinderGeometry args={[1.4, 1.4, 0.03, RUG_SEGMENTS]} />
        <meshStandardMaterial color={PALETTE.blush} roughness={0.9} />
      </mesh>
      <mesh position={[-1.6, 0.03, 0.8]}>
        <cylinderGeometry args={[1.0, 1.0, 0.01, RUG_SEGMENTS]} />
        <meshStandardMaterial color={PALETTE.blushPale} roughness={0.9} />
      </mesh>
    </group>
  );
}

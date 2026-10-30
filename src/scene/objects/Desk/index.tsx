import { PALETTE } from '@/configs';
import { Box } from '@/scene/primitives';

const LEG_POSITIONS: readonly [x: number, z: number][] = [
  [-1.55, -1.5],
  [1.55, -1.5],
  [-1.55, -2.5],
  [1.55, -2.5],
];

export default function Desk() {
  return (
    <group>
      <Box
        size={[3.4, 0.14, 1.3]}
        color={PALETTE.desk}
        position={[0, 1.0, -2.0]}
        radius={0.06}
      />
      {LEG_POSITIONS.map(([x, z]) => (
        <Box
          key={`${x}:${z}`}
          size={[0.14, 1.0, 0.14]}
          color={PALETTE.deskLeg}
          position={[x, 0.5, z]}
          radius={0.04}
        />
      ))}
    </group>
  );
}

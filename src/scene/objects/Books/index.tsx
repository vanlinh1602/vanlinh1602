import { PALETTE } from '@/configs';
import { Ball, Box } from '@/scene/primitives';

export default function Books() {
  return (
    <group>
      <Box
        size={[0.7, 0.14, 0.5]}
        color={PALETTE.pink}
        position={[0, 0.07, 0]}
      />
      <Box
        size={[0.62, 0.14, 0.45]}
        color={PALETTE.blue}
        position={[0.02, 0.21, 0]}
        rotation={[0, 0.25, 0]}
      />
      <Box
        size={[0.55, 0.14, 0.4]}
        color={PALETTE.yellow}
        position={[-0.02, 0.35, 0]}
        rotation={[0, -0.2, 0]}
      />
      <Ball
        r={0.09}
        color={PALETTE.pinkDeep}
        position={[0, 0.5, 0]}
        scale={[1, 0.9, 0.6]}
      />
    </group>
  );
}

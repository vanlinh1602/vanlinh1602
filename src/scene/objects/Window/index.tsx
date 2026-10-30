import { PALETTE } from '@/configs';
import { Ball, Box } from '@/scene/primitives';

export default function Window() {
  return (
    <group>
      <Box
        size={[1.9, 1.6, 0.1]}
        color={PALETTE.white}
        position={[0, 0, 0]}
        radius={0.06}
      />
      <mesh position={[0, 0, 0.056]}>
        <planeGeometry args={[1.7, 1.4]} />
        <meshBasicMaterial color={PALETTE.sky} toneMapped={false} />
      </mesh>
      <Ball
        r={0.22}
        color={PALETTE.sun}
        position={[0.45, 0.35, 0.1]}
        scale={[1, 1, 0.1]}
      />
      <Ball
        r={0.2}
        color={PALETTE.white}
        position={[-0.4, -0.1, 0.1]}
        scale={[1.6, 1, 0.1]}
      />
      <Ball
        r={0.16}
        color={PALETTE.white}
        position={[-0.2, -0.02, 0.1]}
        scale={[1.4, 1, 0.1]}
      />
      <Box
        size={[0.05, 1.4, 0.06]}
        color={PALETTE.white}
        position={[0, 0, 0.08]}
        radius={0.02}
      />
      <Box
        size={[1.7, 0.05, 0.06]}
        color={PALETTE.white}
        position={[0, 0, 0.08]}
        radius={0.02}
      />
    </group>
  );
}

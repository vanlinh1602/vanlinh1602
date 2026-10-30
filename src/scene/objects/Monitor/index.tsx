import { PALETTE } from '@/configs';
import { Box } from '@/scene/primitives';

const CIRCLE_SEGMENTS = 24;

export default function Monitor() {
  return (
    <group>
      <Box
        size={[0.5, 0.06, 0.35]}
        color={PALETTE.white}
        position={[0, 0.03, 0]}
      />
      <Box
        size={[0.14, 0.45, 0.1]}
        color={PALETTE.offWhite}
        position={[0, 0.25, -0.05]}
      />
      <Box
        size={[1.6, 1.0, 0.12]}
        color={PALETTE.white}
        position={[0, 0.95, -0.05]}
        radius={0.08}
      />
      <mesh position={[0, 0.95, 0.016]}>
        <planeGeometry args={[1.4, 0.82]} />
        <meshBasicMaterial color={PALETTE.screen} toneMapped={false} />
      </mesh>
      <ScreenFace />
    </group>
  );
}

function ScreenFace() {
  return (
    <>
      <mesh position={[-0.25, 1.05, 0.02]}>
        <circleGeometry args={[0.06, CIRCLE_SEGMENTS]} />
        <meshBasicMaterial color={PALETTE.ink} toneMapped={false} />
      </mesh>
      <mesh position={[0.25, 1.05, 0.02]}>
        <circleGeometry args={[0.06, CIRCLE_SEGMENTS]} />
        <meshBasicMaterial color={PALETTE.ink} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.88, 0.02]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.16, 0.025, 8, CIRCLE_SEGMENTS, Math.PI]} />
        <meshBasicMaterial color={PALETTE.ink} toneMapped={false} />
      </mesh>
      <mesh position={[-0.42, 0.9, 0.02]}>
        <circleGeometry args={[0.07, CIRCLE_SEGMENTS]} />
        <meshBasicMaterial color={PALETTE.blush} toneMapped={false} />
      </mesh>
      <mesh position={[0.42, 0.9, 0.02]}>
        <circleGeometry args={[0.07, CIRCLE_SEGMENTS]} />
        <meshBasicMaterial color={PALETTE.blush} toneMapped={false} />
      </mesh>
    </>
  );
}

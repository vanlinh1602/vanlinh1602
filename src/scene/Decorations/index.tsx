import { Float, Sparkles } from '@react-three/drei';

import { PALETTE } from '@/configs';
import { Ball } from '@/scene/primitives';

/** Floating bubbles and sparkles; purely decorative and not clickable. */
export default function Decorations() {
  return (
    <>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <Ball
          r={0.18}
          color={PALETTE.pink}
          position={[2.3, 3.4, -1.4]}
          scale={[1, 0.9, 0.6]}
        />
      </Float>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
        <Ball r={0.14} color={PALETTE.blue} position={[-3.0, 3.6, -0.5]} />
      </Float>
      <Sparkles
        count={45}
        scale={[8, 4.5, 6]}
        position={[0, 2.5, 0]}
        size={4}
        speed={0.35}
        color={PALETTE.sparkle}
      />
    </>
  );
}

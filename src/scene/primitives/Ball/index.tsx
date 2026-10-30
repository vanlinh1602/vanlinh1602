import type { ThreeElements } from '@react-three/fiber';

type BallProps = ThreeElements['mesh'] & {
  r?: number;
  color: string;
};

const SEGMENTS = 32;

export default function Ball({ r = 0.5, color, ...rest }: BallProps) {
  return (
    <mesh castShadow {...rest}>
      <sphereGeometry args={[r, SEGMENTS, SEGMENTS]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
  );
}

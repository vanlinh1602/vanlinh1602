import { RoundedBox } from '@react-three/drei';
import type { ComponentProps } from 'react';

import type { Vec3 } from '@/types';

type BoxProps = Omit<ComponentProps<typeof RoundedBox>, 'args'> & {
  size: Vec3;
  color: string;
  radius?: number;
};

export default function Box({ size, color, radius = 0.05, ...rest }: BoxProps) {
  return (
    <RoundedBox
      args={size}
      radius={radius}
      smoothness={3}
      castShadow
      receiveShadow
      {...rest}
    >
      <meshStandardMaterial color={color} roughness={0.7} />
    </RoundedBox>
  );
}

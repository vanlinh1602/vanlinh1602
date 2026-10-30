import { Html, useCursor } from '@react-three/drei';
import { type ThreeEvent, useFrame } from '@react-three/fiber';
import clsx from 'clsx';
import { type ReactNode, useRef, useState } from 'react';
import { type Group, MathUtils } from 'three';

import { SECTIONS } from '@/content';
import type { ActiveSection, ENUM_SECTION, Vec3 } from '@/types';

import styles from './index.module.css';

interface HotspotProps {
  id: ENUM_SECTION;
  active: ActiveSection;
  onSelect: (section: ENUM_SECTION) => void;
  position: Vec3;
  rotation?: Vec3;
  /** Position of the floating tag, relative to the hotspot. */
  labelPosition?: Vec3;
  children: ReactNode;
}

const HOVER_SCALE = 1.07;
const SCALE_DAMPING = 10;
const LABEL_DISTANCE_FACTOR = 9;
const LABEL_Z_INDEX_RANGE: [number, number] = [10, 0];

export default function Hotspot({
  id,
  active,
  onSelect,
  position,
  rotation,
  labelPosition = [0, 1, 0],
  children,
}: HotspotProps) {
  const [isHovered, setIsHovered] = useState(false);
  const group = useRef<Group>(null);

  useCursor(isHovered);

  useFrame((_, delta) => {
    if (!group.current) return;

    const target = isHovered && active !== id ? HOVER_SCALE : 1;
    const scale = MathUtils.damp(
      group.current.scale.x,
      target,
      SCALE_DAMPING,
      delta,
    );

    group.current.scale.setScalar(scale);
  });

  const { label, emoji } = SECTIONS[id];

  const handleClick = (event: ThreeEvent<MouseEvent>): void => {
    event.stopPropagation();
    onSelect(id);
  };

  const handlePointerOver = (event: ThreeEvent<PointerEvent>): void => {
    event.stopPropagation();
    setIsHovered(true);
  };

  return (
    <group
      ref={group}
      position={position}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={() => setIsHovered(false)}
    >
      {children}
      <Html
        position={labelPosition}
        center
        distanceFactor={LABEL_DISTANCE_FACTOR}
        zIndexRange={LABEL_Z_INDEX_RANGE}
      >
        <button
          className={clsx(
            styles.tag,
            active && styles.hidden,
            isHovered && styles.hovered,
          )}
          onClick={() => onSelect(id)}
        >
          {emoji} {label}
        </button>
      </Html>
    </group>
  );
}

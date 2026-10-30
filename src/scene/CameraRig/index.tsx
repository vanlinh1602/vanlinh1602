import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Vector3 } from 'three';

import { HOME_VIEW, SECTION_VIEWS } from '@/configs';
import type { ActiveSection } from '@/types';

interface CameraRigProps {
  active: ActiveSection;
}

/** Fraction of the distance left after one second; lower is snappier. */
const SMOOTHING = 0.002;
/** Below this aspect ratio (portrait phones) the camera pulls back. */
const PORTRAIT_ASPECT = 0.9;
const POINTER_SWAY_HOME = 0.5;
const POINTER_SWAY_FOCUSED = 0.12;

export default function CameraRig({ active }: CameraRigProps) {
  const lookAt = useRef(new Vector3(...HOME_VIEW.target));
  const wantPosition = useRef(new Vector3());
  const wantTarget = useRef(new Vector3());

  useFrame((state, delta) => {
    const view = active ? SECTION_VIEWS[active] : HOME_VIEW;
    const position = wantPosition.current;
    const target = wantTarget.current;
    // Frame-rate independent exponential smoothing.
    const factor = 1 - Math.pow(SMOOTHING, delta);

    target.set(...view.target);
    position.set(...view.position);

    const aspect = state.size.width / state.size.height;

    if (aspect < PORTRAIT_ASPECT) {
      position
        .sub(target)
        .multiplyScalar(1.5 - aspect * 0.5)
        .add(target);
    }

    const sway = active ? POINTER_SWAY_FOCUSED : POINTER_SWAY_HOME;

    position.x += state.pointer.x * sway;
    position.y += state.pointer.y * sway * 0.5;

    state.camera.position.lerp(position, factor);
    lookAt.current.lerp(target, factor);
    state.camera.lookAt(lookAt.current);
  });

  return null;
}

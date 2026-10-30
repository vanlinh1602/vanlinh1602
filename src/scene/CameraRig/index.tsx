import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
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
  const wantPosition = useMemo(() => new Vector3(), []);
  const wantTarget = useMemo(() => new Vector3(), []);

  useFrame((state, delta) => {
    const view = active ? SECTION_VIEWS[active] : HOME_VIEW;
    // Frame-rate independent exponential smoothing.
    const factor = 1 - Math.pow(SMOOTHING, delta);

    wantTarget.set(...view.target);
    wantPosition.set(...view.position);

    const aspect = state.size.width / state.size.height;

    if (aspect < PORTRAIT_ASPECT) {
      wantPosition
        .sub(wantTarget)
        .multiplyScalar(1.5 - aspect * 0.5)
        .add(wantTarget);
    }

    const sway = active ? POINTER_SWAY_FOCUSED : POINTER_SWAY_HOME;

    wantPosition.x += state.pointer.x * sway;
    wantPosition.y += state.pointer.y * sway * 0.5;

    state.camera.position.lerp(wantPosition, factor);
    lookAt.current.lerp(wantTarget, factor);
    state.camera.lookAt(lookAt.current);
  });

  return null;
}

import { type CameraView, ENUM_SECTION } from '@/types';

export const HOME_VIEW: CameraView = {
  position: [5.6, 4.2, 7],
  target: [0, 1.4, -0.4],
};

/**
 * Targets sit slightly right of each object so it stays left of the content
 * panel. Update these when moving a hotspot in `scene/Scene`.
 */
export const SECTION_VIEWS: Readonly<Record<ENUM_SECTION, CameraView>> = {
  [ENUM_SECTION.PROJECTS]: {
    position: [0.8, 2.3, 2.3],
    target: [1.0, 1.6, -2.0],
  },
  [ENUM_SECTION.ABOUT]: { position: [0.4, 2.0, 4.4], target: [-0.5, 0.8, 0.8] },
  [ENUM_SECTION.CONTACT]: {
    position: [2.8, 2.5, 1.2],
    target: [2.3, 1.3, -1.9],
  },
};

export const CAMERA_FOV = 40;

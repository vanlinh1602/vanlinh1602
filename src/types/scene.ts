export type Vec3 = [x: number, y: number, z: number];

export interface CameraView {
  /** Camera position. */
  readonly position: Vec3;
  /** Point the camera looks at. */
  readonly target: Vec3;
}

export type Vec2 = readonly [x: number, y: number];

export interface MapView {
  /** Map point that the view centers on. */
  readonly center: Vec2;
  /** Zoom factor; 1 shows the whole map. */
  readonly scale: number;
}

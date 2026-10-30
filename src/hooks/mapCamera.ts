import {
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { MAP_SIZE, MAP_ZOOM } from '@/configs';
import type { ActiveSection, Vec2 } from '@/types';

interface MapCameraOptions {
  active: ActiveSection;
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

interface ZoomOrigin {
  point: Vec2;
  screen: Vec2;
}

interface MapDrag {
  point: Vec2;
  scroll: Vec2;
}

interface MapPinch {
  distance: number;
  zoom: number;
  point: Vec2;
}

interface MapCamera {
  viewportRef: RefObject<HTMLDivElement | null>;
  mapRef: RefObject<SVGSVGElement | null>;
  minimumZoom: number;
  changeZoom: (zoom: number, screen?: Vec2, point?: Vec2) => void;
  resetZoom: () => void;
  handlePointerDown: (event: PointerEvent<HTMLDivElement>) => void;
  handlePointerMove: (event: PointerEvent<HTMLDivElement>) => void;
  handlePointerEnd: (event: PointerEvent<HTMLDivElement>) => void;
  handleClickCapture: (event: MouseEvent<HTMLDivElement>) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
}

function getCanvasSize(width: number, height: number): Vec2 {
  return [
    Math.max(width, (height * MAP_SIZE.width) / MAP_SIZE.height),
    Math.max(height, (width * MAP_SIZE.height) / MAP_SIZE.width),
  ];
}

function getMinimumZoom(width: number, height: number): number {
  if (width <= 0 || height <= 0) return MAP_ZOOM.initial;
  const [canvasWidth, canvasHeight]: Vec2 = getCanvasSize(width, height);
  return Math.min(width / canvasWidth, height / canvasHeight);
}

function applyZoomOrigin(
  viewport: HTMLDivElement,
  origin: ZoomOrigin,
  zoom: number,
): void {
  const [baseWidth, baseHeight]: Vec2 = getCanvasSize(
    viewport.clientWidth,
    viewport.clientHeight,
  );
  const width: number = baseWidth * zoom;
  const height: number = baseHeight * zoom;
  viewport.scrollLeft =
    Math.max(0, (viewport.clientWidth - width) / 2) +
    origin.point[0] * width -
    origin.screen[0];
  viewport.scrollTop =
    Math.max(0, (viewport.clientHeight - height) / 2) +
    origin.point[1] * height -
    origin.screen[1];
}

export function useMapCamera({
  active,
  zoom,
  onZoomChange,
}: MapCameraOptions): MapCamera {
  const viewportRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<SVGSVGElement>(null);
  const zoomRef = useRef<number>(zoom);
  const originRef = useRef<ZoomOrigin | null>(null);
  const pointersRef = useRef<Map<number, Vec2>>(new Map());
  const dragRef = useRef<MapDrag | null>(null);
  const pinchRef = useRef<MapPinch | null>(null);
  const hasDraggedRef = useRef<boolean>(false);
  const [minimumZoom, setMinimumZoom] = useState<number>(() =>
    getMinimumZoom(window.innerWidth, window.innerHeight),
  );

  const changeZoom = useCallback(
    (requested: number, screen?: Vec2, point?: Vec2): void => {
      const viewport = viewportRef.current;
      const map = mapRef.current;
      if (!viewport || !map) return;
      const lowerBound: number = getMinimumZoom(
        viewport.clientWidth,
        viewport.clientHeight,
      );
      const next: number = Math.max(
        lowerBound,
        Math.min(MAP_ZOOM.maximum, requested),
      );
      const location: Vec2 = screen ?? [
        viewport.clientWidth / 2,
        viewport.clientHeight / 2,
      ];
      const mapBounds: DOMRect = map.getBoundingClientRect();
      const viewportBounds: DOMRect = viewport.getBoundingClientRect();
      const origin: ZoomOrigin = {
        screen: location,
        point: point ?? [
          (location[0] + viewportBounds.left - mapBounds.left) /
            mapBounds.width,
          (location[1] + viewportBounds.top - mapBounds.top) / mapBounds.height,
        ],
      };
      originRef.current = origin;
      zoomRef.current = next;
      if (Number(map.dataset.zoom) === next) {
        applyZoomOrigin(viewport, origin, next);
        originRef.current = null;
      } else onZoomChange(next);
    },
    [onZoomChange],
  );

  const resetZoom = (): void =>
    changeZoom(MAP_ZOOM.initial, undefined, [0.5, 0.5]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    if (event.button !== 0) return;
    const pointers = pointersRef.current;
    if (pointers.size === 0) hasDraggedRef.current = false;
    pointers.set(event.pointerId, [event.clientX, event.clientY]);
    if (pointers.size === 1) {
      dragRef.current = {
        point: [event.clientX, event.clientY],
        scroll: [event.currentTarget.scrollLeft, event.currentTarget.scrollTop],
      };
      return;
    }
    const [first, second]: Vec2[] = [...pointers.values()];
    if (!first || !second || !mapRef.current) return;
    const mapBounds: DOMRect = mapRef.current.getBoundingClientRect();
    const midpoint: Vec2 = [
      (first[0] + second[0]) / 2,
      (first[1] + second[1]) / 2,
    ];
    pinchRef.current = {
      distance: Math.max(
        1,
        Math.hypot(first[0] - second[0], first[1] - second[1]),
      ),
      zoom: zoomRef.current,
      point: [
        (midpoint[0] - mapBounds.left) / mapBounds.width,
        (midpoint[1] - mapBounds.top) / mapBounds.height,
      ],
    };
    hasDraggedRef.current = true;
    for (const id of pointers.keys()) event.currentTarget.setPointerCapture(id);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    const pointers = pointersRef.current;
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, [event.clientX, event.clientY]);
    const pinch = pinchRef.current;
    if (pinch && pointers.size >= 2) {
      const [first, second]: Vec2[] = [...pointers.values()];
      if (!first || !second) return;
      const bounds: DOMRect = event.currentTarget.getBoundingClientRect();
      const distance: number = Math.hypot(
        first[0] - second[0],
        first[1] - second[1],
      );
      changeZoom(
        (pinch.zoom * distance) / pinch.distance,
        [
          (first[0] + second[0]) / 2 - bounds.left,
          (first[1] + second[1]) / 2 - bounds.top,
        ],
        pinch.point,
      );
      event.preventDefault();
      return;
    }
    const drag = dragRef.current;
    if (!drag) return;
    const deltaX: number = event.clientX - drag.point[0];
    const deltaY: number = event.clientY - drag.point[1];
    if (
      !hasDraggedRef.current &&
      Math.hypot(deltaX, deltaY) < MAP_ZOOM.dragThreshold
    )
      return;
    hasDraggedRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.scrollLeft = drag.scroll[0] - deltaX;
    event.currentTarget.scrollTop = drag.scroll[1] - deltaY;
    event.preventDefault();
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>): void => {
    // Touch capture transfers from the SVG child to the viewport when dragging.
    if (
      event.type === 'lostpointercapture' &&
      event.target !== event.currentTarget
    )
      return;
    pointersRef.current.delete(event.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current = null;
    const remaining: Vec2 | undefined = [...pointersRef.current.values()][0];
    dragRef.current = remaining
      ? {
          point: remaining,
          scroll: [
            event.currentTarget.scrollLeft,
            event.currentTarget.scrollTop,
          ],
        }
      : null;
  };

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>): void => {
    if (!hasDraggedRef.current) return;
    event.stopPropagation();
    event.preventDefault();
    hasDraggedRef.current = false;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (['+', '='].includes(event.key))
      changeZoom(zoomRef.current * MAP_ZOOM.step);
    else if (['-', '_'].includes(event.key))
      changeZoom(zoomRef.current / MAP_ZOOM.step);
    else if (event.key === '0') resetZoom();
    else return;
    event.preventDefault();
  };

  useLayoutEffect(() => {
    zoomRef.current = zoom;
    const viewport = viewportRef.current;
    const origin = originRef.current;
    if (viewport && origin) applyZoomOrigin(viewport, origin, zoom);
    originRef.current = null;
  }, [zoom]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const handleWheel = (event: WheelEvent): void => {
      if (event.deltaY === 0) return;
      event.preventDefault();
      const bounds: DOMRect = viewport.getBoundingClientRect();
      const multiplier: number =
        event.deltaMode === 1
          ? MAP_ZOOM.wheelLineSize
          : event.deltaMode === 2
            ? viewport.clientHeight
            : 1;
      changeZoom(
        zoomRef.current *
          Math.exp(-event.deltaY * multiplier * MAP_ZOOM.wheelSensitivity),
        [event.clientX - bounds.left, event.clientY - bounds.top],
      );
    };
    viewport.addEventListener('wheel', handleWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', handleWheel);
  }, [changeZoom]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    let lastWidth: number | null = null;
    const centerView = (): void => {
      const minimum: number = getMinimumZoom(
        viewport.clientWidth,
        viewport.clientHeight,
      );
      setMinimumZoom(minimum);
      if (zoomRef.current < minimum) changeZoom(minimum);
      // Height-only resizes (mobile address bar) must not undo the user's pan.
      if (lastWidth === viewport.clientWidth) return;
      lastWidth = viewport.clientWidth;
      viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2;
      viewport.scrollTop = (viewport.scrollHeight - viewport.clientHeight) / 2;
    };
    centerView();
    const observer = new ResizeObserver(centerView);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [active, changeZoom]);

  return {
    viewportRef,
    mapRef,
    minimumZoom,
    changeZoom,
    resetZoom,
    handlePointerDown,
    handlePointerMove,
    handlePointerEnd,
    handleClickCapture,
    handleKeyDown,
  };
}

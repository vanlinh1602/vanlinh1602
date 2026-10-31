import {
  type CSSProperties,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  DISTRICT_POSITIONS,
  FOCUS_ANCHOR,
  HOME_ANCHOR,
  HOME_VIEW,
  MAP_SIZE,
  MAP_ZOOM,
  MOBILE_FOCUS_ANCHOR,
  PALETTE,
  SECTION_VIEWS,
  TOWN_ARTWORK,
} from '@/configs';
import { SECTION_IDS } from '@/content';
import { useContent, useMapCamera } from '@/hooks';
import type { ActiveSection, Ambience } from '@/types';

import Daylight from './Daylight';
import District from './District';
import styles from './index.module.css';
import LivingScenery from './LivingScenery';
import SeasonalWeather from './SeasonalWeather';

interface TownMapProps {
  active: ActiveSection;
  onSelect: (section: ActiveSection) => void;
  isMotionRunning: boolean;
  ambience: Ambience;
  /** Section the tour is presenting; its building keeps its greeting open. */
  greetingSection: ActiveSection;
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

interface WorldStyle extends CSSProperties {
  '--mobile-transform': string;
}

interface ZoomStyle extends CSSProperties {
  '--map-zoom': number;
}

interface MapTap {
  x: number;
  y: number;
  id: number;
}

function clampOffset(offset: number, extent: number, scale: number): number {
  return Math.max(extent * (1 - scale), Math.min(0, offset));
}

export default function TownMap({
  active,
  onSelect,
  isMotionRunning,
  ambience,
  greetingSection,
  zoom,
  onZoomChange,
}: TownMapProps) {
  const { copy } = useContent();
  const worldRef = useRef<SVGGElement>(null);
  const [mapTap, setMapTap] = useState<MapTap | null>(null);
  const {
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
  } = useMapCamera({ active, zoom, onZoomChange });
  const view = active ? SECTION_VIEWS[active] : HOME_VIEW;
  const anchor = active ? FOCUS_ANCHOR : HOME_ANCHOR;
  const offsetX: number = clampOffset(
    anchor[0] - view.center[0] * view.scale,
    MAP_SIZE.width,
    view.scale,
  );
  const offsetY: number = clampOffset(
    anchor[1] - view.center[1] * view.scale,
    MAP_SIZE.height,
    view.scale,
  );
  const zoomStyle: ZoomStyle = { '--map-zoom': zoom };
  const worldStyle: WorldStyle = {
    transform: `translate(${offsetX}px, ${offsetY}px) scale(${view.scale})`,
    '--mobile-transform': `translate(${MOBILE_FOCUS_ANCHOR[0] - view.center[0] * view.scale}px, ${clampOffset(MOBILE_FOCUS_ANCHOR[1] - view.center[1] * view.scale, MAP_SIZE.height, view.scale)}px) scale(${view.scale})`,
  };

  const handleBackgroundClick = (event: MouseEvent<SVGImageElement>): void => {
    if (active) {
      onSelect(null);
      return;
    }
    if (!isMotionRunning) return;
    const matrix: DOMMatrix | null | undefined =
      worldRef.current?.getScreenCTM();
    if (!matrix) return;
    const point: DOMPoint = new DOMPoint(
      event.clientX,
      event.clientY,
    ).matrixTransform(matrix.inverse());
    setMapTap((previous: MapTap | null) => ({
      x: point.x,
      y: point.y,
      id: (previous?.id ?? 0) + 1,
    }));
  };
  const handleReset = (): void => {
    resetZoom();
    onSelect(null);
  };

  useEffect(() => {
    const scene = mapRef.current;
    if (!scene) return;
    if (isMotionRunning) scene.unpauseAnimations();
    else scene.pauseAnimations();
  }, [isMotionRunning, mapRef]);

  return (
    <>
      <div
        className={styles.viewport}
        ref={viewportRef}
        role="region"
        aria-label={copy.mapDescription}
        tabIndex={0}
        style={zoomStyle}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onLostPointerCapture={handlePointerEnd}
        onClickCapture={handleClickCapture}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.canvas}>
          <svg
            ref={mapRef}
            className={styles.map}
            viewBox={`0 0 ${MAP_SIZE.width} ${MAP_SIZE.height}`}
            data-focused={active !== null}
            data-zoom={zoom}
            aria-hidden="true"
          >
            <g
              ref={worldRef}
              className={styles.world}
              style={worldStyle}
              data-motion={isMotionRunning ? 'running' : 'paused'}
            >
              <image
                href={TOWN_ARTWORK}
                width={MAP_SIZE.width}
                height={MAP_SIZE.height}
                preserveAspectRatio="none"
                onClick={handleBackgroundClick}
              >
                <title>{copy.mapDescription}</title>
              </image>
              <LivingScenery
                isRunning={isMotionRunning}
                dayPhase={ambience.dayPhase}
              />
              <Daylight
                dayPhase={ambience.dayPhase}
                isRunning={isMotionRunning}
              />
              <SeasonalWeather
                season={ambience.season}
                dayPhase={ambience.dayPhase}
                isRunning={isMotionRunning}
              />
              {mapTap && (
                <g
                  key={mapTap.id}
                  transform={`translate(${mapTap.x} ${mapTap.y})`}
                  pointerEvents="none"
                >
                  <g
                    className={styles.tapEffect}
                    data-map-tap="true"
                    onAnimationEnd={(event) => {
                      if (event.target === event.currentTarget) setMapTap(null);
                    }}
                  >
                    <ellipse
                      className={styles.tapRing}
                      rx="11"
                      ry="6"
                      fill="none"
                      stroke={PALETTE.white}
                      strokeWidth="2"
                    />
                    <path
                      className={styles.tapSparkle}
                      d="M 0 -14 V -8 M -3 -11 H 3 M -17 0 V 6 M -20 3 H -14 M 17 -5 V 1 M 14 -2 H 20"
                      stroke={PALETTE.yellow}
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </g>
                </g>
              )}
              {SECTION_IDS.map((id) => (
                <District
                  key={id}
                  id={id}
                  position={DISTRICT_POSITIONS[id]}
                  isActive={active === id}
                  isDimmed={active !== null && active !== id}
                  isGreeting={greetingSection === id}
                  onSelect={onSelect}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
      <div
        className={styles.zoomControls}
        role="group"
        aria-label={copy.zoomControls}
        data-focused={active !== null}
      >
        <button
          type="button"
          aria-label={copy.zoomIn}
          title={copy.zoomIn}
          disabled={zoom >= MAP_ZOOM.maximum - MAP_ZOOM.epsilon}
          onClick={() => changeZoom(zoom * MAP_ZOOM.step)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M 12 5 V 19 M 5 12 H 19" />
          </svg>
        </button>
        <output className={styles.zoomValue} aria-label={copy.zoomLevel}>
          {Math.round(zoom * 100)}%
        </output>
        <button
          type="button"
          aria-label={copy.zoomOut}
          title={copy.zoomOut}
          disabled={zoom <= minimumZoom + MAP_ZOOM.epsilon}
          onClick={() => changeZoom(zoom / MAP_ZOOM.step)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M 5 12 H 19" />
          </svg>
        </button>
        <button
          type="button"
          aria-label={copy.resetView}
          title={copy.resetView}
          onClick={handleReset}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M 4 9 V 4 H 9 M 15 4 H 20 V 9 M 20 15 V 20 H 15 M 9 20 H 4 V 15" />
          </svg>
        </button>
      </div>
    </>
  );
}

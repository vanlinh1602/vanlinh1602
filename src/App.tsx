import { useCallback, useState } from 'react';

import { Hint, Panel, TopBar, TownMap } from '@/components';
import { MAP_ZOOM } from '@/configs';
import { useKeyDown, useSceneMotion } from '@/hooks';
import type { ActiveSection } from '@/types';

import styles from './App.module.css';

export default function App() {
  const [active, setActive] = useState<ActiveSection>(null);
  const [zoom, setZoom] = useState<number>(MAP_ZOOM.initial);
  const motion = useSceneMotion();

  const selectSection = useCallback((section: ActiveSection): void => {
    setActive(section);
    setZoom(MAP_ZOOM.initial);
  }, []);
  const closeSection = useCallback(() => selectSection(null), [selectSection]);

  useKeyDown('Escape', closeSection);

  return (
    <>
      <div className={styles.stage}>
        <TownMap
          active={active}
          onSelect={selectSection}
          zoom={zoom}
          onZoomChange={setZoom}
          isMotionRunning={motion.isRunning}
        />
      </div>
      <TopBar
        active={active}
        onSelect={selectSection}
        isMotionEnabled={motion.isEnabled}
        onToggleMotion={motion.toggle}
      />
      <Panel active={active} onClose={closeSection} />
      {!active && <Hint />}
    </>
  );
}

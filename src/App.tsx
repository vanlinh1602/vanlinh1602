import { useCallback, useState } from 'react';

import { Hint, Panel, TopBar, TourControls, TownMap } from '@/components';
import { MAP_ZOOM } from '@/configs';
import { CONTENT } from '@/content';
import {
  ContentContext,
  useAmbience,
  useBackgroundMusic,
  useHashSection,
  useKeyDown,
  useLocale,
  useSceneMotion,
  useTour,
} from '@/hooks';
import type { ActiveSection } from '@/types';

import styles from './App.module.css';

interface SectionZoom {
  readonly section: ActiveSection;
  readonly zoom: number;
}

export default function App() {
  const [active, navigate] = useHashSection();
  const [sectionZoom, setSectionZoom] = useState<SectionZoom>({
    section: active,
    zoom: MAP_ZOOM.initial,
  });
  const motion = useSceneMotion();
  const music = useBackgroundMusic();
  const language = useLocale();
  const ambience = useAmbience();

  // Manual zoom belongs to one section; any navigation (Back included) resets it.
  const zoom: number =
    sectionZoom.section === active ? sectionZoom.zoom : MAP_ZOOM.initial;

  const changeZoom = useCallback(
    (next: number): void => setSectionZoom({ section: active, zoom: next }),
    [active],
  );
  const selectSection = useCallback(
    (section: ActiveSection, isReplace?: boolean): void => {
      navigate(section, isReplace);
      setSectionZoom({ section, zoom: MAP_ZOOM.initial });
    },
    [navigate],
  );
  const closeSection = useCallback(() => selectSection(null), [selectSection]);

  const tour = useTour({
    active,
    onSelect: selectSection,
    isAutoPlay: motion.isRunning,
  });

  useKeyDown('Escape', closeSection);

  return (
    <ContentContext value={CONTENT[language.locale]}>
      <div className={styles.stage}>
        <TownMap
          active={active}
          onSelect={selectSection}
          zoom={zoom}
          onZoomChange={changeZoom}
          isMotionRunning={motion.isRunning}
          ambience={ambience}
          greetingSection={tour.section}
        />
      </div>
      <TopBar
        active={active}
        onSelect={selectSection}
        isMotionEnabled={motion.isEnabled}
        onToggleMotion={motion.toggle}
        isMusicEnabled={music.isEnabled}
        onToggleMusic={music.toggle}
        onToggleLanguage={language.toggle}
      />
      <Panel active={active} onClose={closeSection} />
      {!active && <Hint onStartTour={tour.start} />}
      {tour.step !== null && tour.section && (
        <TourControls
          step={tour.step}
          total={tour.total}
          section={tour.section}
          isAutoPlay={motion.isRunning}
          onPrevious={tour.previous}
          onNext={tour.next}
          onStop={tour.stop}
        />
      )}
    </ContentContext>
  );
}

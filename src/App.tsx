import { Canvas } from '@react-three/fiber';
import { Suspense, useCallback, useState } from 'react';
import { NoToneMapping } from 'three';

import { Hint, Panel, TopBar } from '@/components';
import { CAMERA_FOV, HOME_VIEW } from '@/configs';
import { useKeyDown } from '@/hooks';
import { Scene } from '@/scene';
import type { ActiveSection } from '@/types';

import styles from './App.module.css';

const PIXEL_RATIO_RANGE: [min: number, max: number] = [1, 1.75];

export default function App() {
  const [active, setActive] = useState<ActiveSection>(null);

  const closeSection = useCallback(() => setActive(null), []);

  useKeyDown('Escape', closeSection);

  return (
    <>
      <div className={styles.stage}>
        <Canvas
          shadows
          dpr={PIXEL_RATIO_RANGE}
          camera={{ fov: CAMERA_FOV, position: HOME_VIEW.position }}
          gl={{ toneMapping: NoToneMapping }}
        >
          <Suspense fallback={null}>
            <Scene active={active} onSelect={setActive} />
          </Suspense>
        </Canvas>
      </div>
      <TopBar active={active} onSelect={setActive} />
      <Panel active={active} onClose={closeSection} />
      {!active && <Hint />}
    </>
  );
}

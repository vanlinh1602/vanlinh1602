import { PALETTE } from '@/configs';
import CameraRig from '@/scene/CameraRig';
import Decorations from '@/scene/Decorations';
import Hotspot from '@/scene/Hotspot';
import Lights from '@/scene/Lights';
import {
  Books,
  Cat,
  Desk,
  Lamp,
  Monitor,
  Plant,
  Room,
  Window,
} from '@/scene/objects';
import { type ActiveSection, ENUM_SECTION } from '@/types';

interface SceneProps {
  active: ActiveSection;
  onSelect: (section: ActiveSection) => void;
}

/** Height of the desk top; objects standing on the desk use it as their y. */
const DESK_TOP_Y = 1.07;

export default function Scene({ active, onSelect }: SceneProps) {
  return (
    <>
      <color attach="background" args={[PALETTE.background]} />
      <CameraRig active={active} />
      <Lights />

      <Room />
      <Desk />
      <group position={[-2.3, 2.7, -2.88]}>
        <Window />
      </group>
      <group position={[3, 0, -2.2]} scale={1.2}>
        <Plant />
      </group>
      <group position={[-1.2, DESK_TOP_Y, -2.1]}>
        <Lamp />
      </group>

      <Hotspot
        id={ENUM_SECTION.PROJECTS}
        active={active}
        onSelect={onSelect}
        position={[0, DESK_TOP_Y, -2.1]}
        labelPosition={[0, 2.25, 0]}
      >
        <Monitor />
      </Hotspot>
      <Hotspot
        id={ENUM_SECTION.CONTACT}
        active={active}
        onSelect={onSelect}
        position={[1.3, DESK_TOP_Y, -1.8]}
        labelPosition={[0.35, 1.0, 0]}
      >
        <Books />
      </Hotspot>
      <Hotspot
        id={ENUM_SECTION.ABOUT}
        active={active}
        onSelect={onSelect}
        position={[-1.6, 0.03, 0.8]}
        rotation={[0, 0.5, 0]}
        labelPosition={[0, 1.9, 0]}
      >
        <Cat />
      </Hotspot>

      <Decorations />
    </>
  );
}

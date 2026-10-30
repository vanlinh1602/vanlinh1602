import { PALETTE } from '@/configs';

const SHADOW_MAP_SIZE: [number, number] = [2048, 2048];
const SHADOW_EXTENT = 7;

export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.9} />
      <hemisphereLight args={[PALETTE.white, PALETTE.wallSide, 0.5]} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={SHADOW_MAP_SIZE}
        shadow-camera-left={-SHADOW_EXTENT}
        shadow-camera-right={SHADOW_EXTENT}
        shadow-camera-top={SHADOW_EXTENT}
        shadow-camera-bottom={-SHADOW_EXTENT}
        shadow-bias={-0.0005}
      />
    </>
  );
}

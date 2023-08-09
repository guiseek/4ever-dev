import sun from '../../../../../assets/textures/cosmo/our-system/sun.png'
import mercury from '../../../../../assets/textures/cosmo/our-system/mercury.png'
import venus from '../../../../../assets/textures/cosmo/our-system/venus.png'
import earth from '../../../../../assets/textures/cosmo/our-system/earth.png'
import mars from '../../../../../assets/textures/cosmo/our-system/mars.png'
// import jupiter from '../../../../../assets/textures/cosmo/our-system/jupiter.png'
// import saturn from '../../../../../assets/textures/cosmo/our-system/saturn.png'
// import uranus from '../../../../../assets/textures/cosmo/our-system/uranus.png'
// import neptune from '../../../../../assets/textures/cosmo/our-system/neptune.png'
import type {PlanetOptions, TextureName} from './interfaces'

function getUrl(path: string) {
  return new URL(path, import.meta.url).href as TextureName
}

export const sunPath = getUrl(sun)

const x = innerWidth * 0.5
const y = x

export const appConfig = {
  mercury: {
    path: getUrl(mercury),
    color: 10066329,
    degree: 7,
    radius: 70,
    speed: 0.8,
    radian: 0,
    size: 4,
    x,
    y,
  },
  venus: {
    path: getUrl(venus),
    color: 12551737,
    degree: 3.39,
    radius: 110,
    speed: 0.3,
    radian: 0,
    size: 8,
    x,
    y,
  },
  earth: {
    path: getUrl(earth),
    color: 26316,
    degree: 0,
    radius: 140,
    speed: 0.2,
    radian: 0,
    size: 8,
    x,
    y,
  },
  mars: {
    path: getUrl(mars),
    color: 11158016,
    degree: 1.85,
    radius: 190,
    speed: 0.1,
    radian: 0,
    size: 6,
    x,
    y,
  },
  // jupiter: {
  //   path: getUrl(jupiter),
  //   color: 14724719,
  //   degree: 1.31,
  //   radius: 310,
  //   speed: 0.06,
  //   radian: 0,
  //   size: 20,
  //   x,
  //   y,
  // },
  // saturn: {
  //   path: getUrl(saturn),
  //   color: 14724719,
  //   degree: 2.49,
  //   radius: 410,
  //   speed: 0.03,
  //   radian: 0,
  //   size: 17,
  //   x,
  //   y,
  // },
  // uranus: {
  //   path: getUrl(uranus),
  //   color: 14724719,
  //   degree: 0.77,
  //   radius: 510,
  //   speed: 0.03,
  //   radian: 0,
  //   size: 10,
  //   x,
  //   y,
  // },
  // neptune: {
  //   path: getUrl(neptune),
  //   color: 14724719,
  //   degree: 1.77,
  //   radius: 610,
  //   speed: 0.03,
  //   radian: 0,
  //   size: 10,
  //   x,
  //   y,
  // },
} satisfies Record<string, PlanetOptions>

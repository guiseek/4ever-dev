import type {ModelOptions} from './model'

interface PlanetOptions extends ModelOptions {
  radius: number
  speed: number
  degree: number
  radian: number
  color: number
  x: number
  y: number
}

export type {PlanetOptions}

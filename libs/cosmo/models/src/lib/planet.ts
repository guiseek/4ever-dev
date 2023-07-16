import type {PlanetOptions} from './interfaces'
import {Model} from './model'

export class Planet extends Model<PlanetOptions> {
  update() {
    this.options.degree += this.options.speed
    this.options.radian = (this.options.degree / 180) * Math.PI

    this.position.x = this.options.x =
      Math.cos(this.options.radian) * this.options.radius

    this.position.y = this.options.y =
      -Math.sin(this.options.radian) * this.options.radius

    this.position.z = 0
    this.rotation.y += 0.01
  }
}

import {Loader} from '@4ever-dev/shared/util-three'
import {Entity} from '../../interfaces'

export class Cityscape extends Entity {
  override name = 'cityscape'

  constructor(private loader: Loader) {
    super()
  }

  initialize() {
    if (this.initialized) return

    this.loader.load('cityscape.glb').then(({scene}) => {
      this.position.set(0, 0, 0)
      this.add(scene)
    })
  }
}

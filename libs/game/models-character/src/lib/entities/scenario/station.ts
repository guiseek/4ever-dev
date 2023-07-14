import {Loader} from '@4ever-dev/shared/util-three'
import {Entity} from '../../interfaces'

export class Station extends Entity {
  override name = 'station'

  constructor(private loader: Loader) {
    super()
  }

  initialize() {
    if (this.initialized) return

    this.loader.load('station.glb').then(({scene}) => {
      this.position.set(0, 0, 0)
      this.add(scene)
    })
  }
}

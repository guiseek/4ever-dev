import {Group, Mesh, MeshBasicMaterial, SphereGeometry} from 'three'
import type {ModelOptions} from './interfaces'
import {Loader} from './core'

export class Model<T extends ModelOptions> extends Group {
  constructor(override readonly name: string, readonly options: T) {
    super()
  }

  async initialize(loader: Loader) {
    return loader.loadTexture(this.options.path).then((map) => {
      const geometry = new SphereGeometry(this.options.size, 32, 32)
      const material = new MeshBasicMaterial({map, toneMapped: true})
      this.rotation.set(0, 0, 0)

      this.add(new Mesh(geometry, material))
    })
  }
}

import {GltfName, LoaderOptions, OnProgressFn, TextureName} from '../interfaces'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {TextureLoader} from 'three'

export class Loader {
  #gltf = new GLTFLoader()
  #texture = new TextureLoader()

  constructor(options: LoaderOptions = {}) {
    this.#gltf.setPath(options.gltfPath ?? '')
    this.#texture.setPath(options.texturePath ?? '')
  }

  loadGlb(name: GltfName, fn: OnProgressFn = () => {}) {
    return this.#gltf.loadAsync(name, fn)
  }

  loadTexture(name: TextureName, fn: OnProgressFn = () => {}) {
    return this.#texture.loadAsync(name, fn)
  }
}

import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'
import {noop} from '../utilities'
import {Subject} from 'rxjs'

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('assets/js/')

export class Loader {
  #onLoaded = new Subject<GLTF>()
  onLoaded$ = this.#onLoaded.asObservable()

  #loader = new GLTFLoader()

  constructor(private basePath: string) {
    this.#loader.setDRACOLoader(dracoLoader)
  }

  async load(
    path: `${string}.glb`,
    onProgress: (value: ProgressEvent) => void = noop
  ) {
    return await this.#loader.loadAsync(`${this.basePath}/${path}`, onProgress)
  }
}

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {Scene, Clock, WebGLRenderer, PerspectiveCamera} from 'three'
import {Spaceship, Laser, Station} from '@4ever-dev/game/models-character'
import {Input, Light, Loader} from '@4ever-dev/shared/util-three'
import {GameUiMenuService} from '@4ever-dev/game/ui-menu'
import {Dialog} from '@angular/cdk/dialog'

export class AppProviders {
  static forRoot() {
    return [
      Scene,
      Clock,
      Light,
      Input,
      Laser,
      {
        provide: 'loader.path',
        useValue: 'assets/models',
      },
      {
        provide: Loader,
        deps: ['loader.path'],
      },
      {
        provide: Spaceship,
        deps: [Input, Loader],
      },
      {
        provide: Station,
        deps: [Loader],
      },
      {
        provide: GameUiMenuService,
        deps: [Dialog],
      },
      {
        provide: PerspectiveCamera,
        useFactory: () => {
          return new PerspectiveCamera(
            45,
            innerWidth / innerHeight,
            10,
            10000000
          )
        },
      },
      {
        provide: WebGLRenderer,
        useFactory: () => {
          const renderer = new WebGLRenderer({antialias: true})
          renderer.setPixelRatio(devicePixelRatio)
          renderer.setClearColor(0x121214, 1)
          return renderer
        },
      },
      {
        provide: OrbitControls,
        useFactory: (camera: PerspectiveCamera, renderer: WebGLRenderer) => {
          return new OrbitControls(camera, renderer.domElement)
        },
        deps: [PerspectiveCamera, WebGLRenderer],
      },
    ]
  }
}

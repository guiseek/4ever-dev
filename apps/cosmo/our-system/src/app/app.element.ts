import {appConfig, sunPath, Loader, Planet, Sun} from '@4ever-dev/cosmo/models'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {Scene, WebGLRenderer, PerspectiveCamera} from 'three'
import './app.element.scss'

const loader = new Loader()

export class AppElement extends HTMLElement {
  #renderer!: WebGLRenderer
  #camera!: PerspectiveCamera
  #controls!: OrbitControls

  #scene = new Scene()

  #sun = new Sun('sun', {
    path: sunPath,
    size: 50,
  })

  #planets = Object.entries(appConfig).map(([name, options]) => {
    const planet = new Planet(name, options)
    planet.initialize(loader)
    return planet
  })

  connectedCallback() {
    this.#camera = new PerspectiveCamera(
      75,
      innerWidth / innerHeight,
      0.4,
      10000
    )
    this.#camera.position.z = 1000

    this.#renderer = new WebGLRenderer({antialias: true})
    this.#renderer.setPixelRatio(window.devicePixelRatio)
    this.#renderer.setSize(window.innerWidth, window.innerHeight)
    this.#renderer.setAnimationLoop(() => this.#animation())
    document.body.appendChild(this.#renderer.domElement)

    this.#sun.initialize(loader)

    this.#scene.add(this.#sun, ...this.#planets)

    this.#controls = new OrbitControls(this.#camera, this.#renderer.domElement)
    this.#controls.minDistance = 100
    this.#controls.autoRotate = true

    onresize = this.#onResized
  }

  #animation = () => {
    for (const planet of Object.values(this.#planets)) {
      planet.update()
    }

    this.#controls.update()

    this.#renderer.render(this.#scene, this.#camera)
  }

  #onResized = () => {
    this.#renderer.setSize(innerWidth, innerHeight)

    this.#camera.aspect = innerWidth / innerHeight
    this.#camera.updateProjectionMatrix()
  }
}
customElements.define('app-root', AppElement)

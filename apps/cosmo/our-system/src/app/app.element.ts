import {appConfig, sunPath, Loader, Planet, Sun} from '@4ever-dev/cosmo/models'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  CircleGeometry,
  LineDashedMaterial,
  EdgesGeometry,
  LineSegments,
} from 'three'
import {appControl} from './app.control'
import './app.element.scss'

const loader = new Loader()
appControl.listen()

function createOrbit(radius: number) {
  const geometry = new CircleGeometry(radius, radius / 5)
  const edges = new EdgesGeometry(geometry)
  const material = new LineDashedMaterial({
    color: 0xffffff,
    dashSize: radius / 20,
    gapSize: radius / 10,
    transparent: true,
    opacity: 0.5,
  })
  return new LineSegments(edges, material).computeLineDistances()
}

export class AppElement extends HTMLElement {
  #renderer!: WebGLRenderer
  #camera!: PerspectiveCamera
  #controls!: OrbitControls

  #scene = new Scene()

  #pause = false

  #sun = new Sun('sun', {
    path: sunPath,
    size: 40,
  })

  #planets = Object.entries(appConfig).map(([name, options]) => {
    const planet = new Planet(name, options)
    planet.initialize(loader)
    return planet
  })

  connectedCallback() {
    appControl.state$.subscribe((state) => {
      this.#pause = state.KeyP
    })

    this.#camera = new PerspectiveCamera(65, innerWidth / innerHeight, 1, 10000)
    this.#camera.position.z = 1000

    this.#renderer = new WebGLRenderer({antialias: true})
    this.#renderer.setPixelRatio(window.devicePixelRatio)
    this.#renderer.setSize(window.innerWidth, window.innerHeight)
    this.#renderer.setAnimationLoop(() => this.#animation())
    document.body.appendChild(this.#renderer.domElement)

    this.#sun.initialize(loader)

    this.#scene.add(this.#sun, ...this.#planets)

    const orbits = Object.values(appConfig).map(({radius}) =>
      createOrbit(radius)
    )

    this.#scene.add(...orbits)

    this.#controls = new OrbitControls(this.#camera, this.#renderer.domElement)
    this.#controls.minDistance = 100
    this.#controls.maxDistance = 400
    this.#controls.autoRotate = true

    onresize = this.#onResized
  }

  #animation = () => {
    if (this.#pause === true) return

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

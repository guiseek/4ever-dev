import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GameUiMenuService as MenuService} from '@4ever-dev/game/ui-menu'
import {Scene, Clock, WebGLRenderer, PerspectiveCamera} from 'three'
import {Spaceship, Station} from '@4ever-dev/game/models-character'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import {Input, Light} from '@4ever-dev/shared/util-three'
import {DialogModule} from '@angular/cdk/dialog'
import {Router} from '@angular/router'
import {
  inject,
  OnInit,
  Component,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core'
import {AppProviders} from '../app.providers'
import {take} from 'rxjs'

@Component({
  template: ``,
  standalone: true,
  selector: 'game-canvas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AppProviders.forRoot()],
  imports: [DialogModule],
})
export class CanvasContainer implements OnInit {
  #scene = inject(Scene)
  #clock = inject(Clock)

  #renderer = inject(WebGLRenderer)
  #controls = inject(OrbitControls)

  #camera = inject(PerspectiveCamera)

  #light = inject(Light)
  #input = inject(Input)
  #spaceship = inject(Spaceship)
  #station = inject(Station)
  #menu = inject(MenuService)
  #router = inject(Router)

  #stats = new Stats()

  #paused = false

  elRef = inject(ElementRef<HTMLElement>)

  get element() {
    return this.elRef.nativeElement
  }

  constructor() {}

  ngOnInit() {
    this.element.append(this.#renderer.domElement, this.#stats.dom)

    this.#controls.maxDistance = 60
    this.#controls.minDistance = 30

    this.#camera.position.set(4, 5, 20)
    this.#controls.update()

    this.#scene.add(this.#station, this.#spaceship)
    this.#scene.add(...this.#light.toArray())

    this.#input.initialize()

    this.#spaceship.initialize()
    this.#station.initialize()

    onresize = this.#resizeHandler

    this.#resizeHandler()

    this.#animate(1)

    this.#input.onKeyDown = () => {
      if (this.#input.key.Escape) {
        let options = [
          {label: 'Quit', value: 'quit'},
          {label: 'Cancel', value: 'cancel'},
        ]

        if (this.#paused) {
          options.push({label: 'Play', value: 'play'})
        } else {
          options.push({label: 'Pause', value: 'pause'})
        }

        options = options.reverse()

        const {closed} = this.#menu.open({options})

        this.#paused = true

        closed.pipe(take(1)).subscribe((option) => {
          this.#paused = false

          if (option) {
            if (option.value === 'quit') {
              this.#router.navigate(['/'])
            }
            if (option.value === 'pause') {
              this.#paused = true
              this.#spaceship.pause()
            }
            if (option.value === 'play') {
              this.#paused = false
            }
          }
        })
      }
    }
  }

  #animate = (timeStep: number) => {
    requestAnimationFrame(this.#animate)

    if (!this.#paused) {
      this.#input.update()

      const delta = this.#clock.getDelta()

      this.#spaceship.update(timeStep, delta)

      this.#controls.target = this.#spaceship.position
    }

    this.#controls.update()

    this.#stats.update()

    this.#renderer.render(this.#scene, this.#camera)
  }

  #resizeHandler = () => {
    const {innerHeight, innerWidth} = window
    this.#renderer.setSize(innerWidth, innerHeight)
    this.#camera.aspect = innerWidth / innerHeight
    this.#camera.updateProjectionMatrix()
  }
}

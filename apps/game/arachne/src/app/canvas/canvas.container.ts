import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {Scene, Clock, WebGLRenderer, PerspectiveCamera} from 'three'
import {Cityscape, Arachne} from '@4ever-dev/game/models-character'
import {Input, Light} from '@4ever-dev/shared/util-three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import {
  inject,
  OnInit,
  Component,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core'
import {GameUiMenuService} from '@4ever-dev/game/ui-menu'
import {Router} from '@angular/router'
import {take} from 'rxjs'

@Component({
  selector: 'game-canvas',
  template: `<canvas #canvas></canvas>`,
  styles: [
    `
      :host {
        flex: 1;
        display: flex;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasContainer implements OnInit {
  @ViewChild('canvas', {static: true})
  canvasRef!: ElementRef<HTMLCanvasElement>
  get canvas() {
    return this.canvasRef.nativeElement
  }

  #scene = inject(Scene)
  #clock = inject(Clock)

  #renderer!: WebGLRenderer
  #controls!: OrbitControls

  #camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000)

  #light = inject(Light)
  #input = inject(Input)
  #arachne = inject(Arachne)
  #cityscape = inject(Cityscape)
  #menu = inject(GameUiMenuService)
  #router = inject(Router)

  #stats = new Stats()

  #paused = false

  ngOnInit() {
    this.#renderer = new WebGLRenderer({antialias: true, canvas: this.canvas})
    this.#renderer.setPixelRatio(devicePixelRatio)
    this.#renderer.setClearColor(0x121214, 1)

    this.#controls = new OrbitControls(this.#camera, this.#renderer.domElement)

    this.#camera.position.set(4, 5, 20)
    this.#controls.update()

    this.#scene.add(this.#cityscape, this.#arachne)
    this.#scene.add(...this.#light.toArray())

    this.#input.initialize()

    this.#arachne.initialize()
    this.#cityscape.initialize()

    onresize = this.#resizeHandler

    this.#resizeHandler()

    this.#animate(1)

    this.canvas.before(this.#stats.dom)

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

      this.#arachne.update(timeStep, delta)
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

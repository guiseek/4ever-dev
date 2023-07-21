import {AnimationAction, AnimationMixer, Quaternion, Vector3} from 'three'
import {AudioControl} from '@4ever-dev/game/util-audio'
import {Controllable, Entity, Updatable} from '../../interfaces'
import {Input, Loader, isMobile} from '@4ever-dev/shared/util-three'

export class Spaceship extends Entity implements Updatable, Controllable {
  name = 'spaceship'

  order = 2

  #speed = 1.2
  #maxSpeed = 4
  #minSpeed = 1
  #acceleration = 0.6

  #rotationAngle = 0.02
  #yaw = new Vector3(0, 1, 0)
  #rotation = new Quaternion()

  #audio = new AudioControl()

  #mixer?: AnimationMixer
  #actions: AnimationAction[] = []

  actions = {}

  constructor(private input: Input, private loader: Loader) {
    super()
  }

  initialize() {
    if (this.initialized) return

    console.log('initialize')

    this.loader.load('spaceship.glb').then(({scene, animations}) => {
      this.add(scene)

      this.position.set(0, 0, 0)

      this.#mixer = new AnimationMixer(scene)

      for (const animation of animations) {
        this.#actions.push(this.#mixer.clipAction(animation))
      }

      this.#activateActions(0.3)

      this.input.onTouched = () => {
        if (!this.#audio.connected) {
          this.#audio.connect(`assets/audio/engine-01.wav`)
        }
      }

      this.input.onRotation = (deviceRotation) => {
        this.#rotation.copy(deviceRotation)
      }

      this.initialized = true
    })
  }

  pause() {
    this.#audio.pause()
  }

  unPause() {
    this.#audio.unPause()
  }

  update(timeStep: number, delta: number): void {
    this.#handleInput()

    if (this.#audio.connected) {
      this.#toForward(this.#speed)
    }

    if (isMobile()) {
      this.#rotateSmoothly(Math.min(4 + delta, 1))
    }

    if (this.#mixer && delta) {
      this.#mixer.update(delta * this.#speed)
    }
  }

  #handleInput() {
    // if (this.input.direction.Some) {
    //   console.log(this.#currentRotation)
    //   console.log(this.rotation)

    //   /**
    //    * KeyS | ArrowDown: { _w: 1, _x: 0, _y: 0, _z: 0 }
    //    * KeyW | ArrowUp:
    //    */
    // }

    if (this.input.key.A) {
      this.#toLeft(this.#rotationAngle)
    }

    if (this.input.key.D) {
      this.#toRight(this.#rotationAngle)
    }

    if (this.input.key.W) {
      this.#toDown(this.#rotationAngle)
    }

    if (this.input.key.S) {
      this.#toUp(this.#rotationAngle)
    }

    if (this.input.key.Space) {
      this.#onBrakeShip()
    } else if (!this.input.key.ShiftLeft) {
      this.#onBackToForward()
    }

    if (this.input.key.ShiftLeft) {
      this.#onFastForward(this.#speed)
    }
  }

  #onBrakeShip() {
    this.#audio.setGain(0.4)
    this.#updatePropellant(0.2)
    this.#toBrake(this.#speed)
  }

  #onBackToForward() {
    this.#updatePropellant(0.6)
    this.#audio.setGain(0.6)
  }

  #onFastForward(speed = 0) {
    this.#audio.setGain(1)
    this.#updatePropellant(1)
    this.#toForward(speed)
  }

  #updatePropellant(weight: number) {
    if (this.#mixer) {
      for (const action of this.#actions) {
        action.setEffectiveWeight(weight)
        action.setEffectiveWeight(weight)
      }
    }
  }

  #toUp(angle: number) {
    this.rotateX(-angle)
  }

  #toDown(angle: number) {
    this.rotateX(angle)
  }

  #toLeft(angle: number) {
    const quaternion = new Quaternion().setFromAxisAngle(this.#yaw, angle)
    this.#rotation.multiply(quaternion)
    this.rotateZ(-angle)
  }

  #toRight(angle: number) {
    const quaternion = new Quaternion().setFromAxisAngle(this.#yaw, -angle)
    this.#rotation.multiply(quaternion)
    this.rotateZ(angle)
  }

  #rotateSmoothly(alpha: number) {
    const quaternion = new Quaternion()
    quaternion.slerpQuaternions(this.quaternion, this.#rotation, alpha)
    this.quaternion.copy(quaternion)
  }

  #toForward(speed = 0) {
    const currentSpeed = Math.min(speed + this.#acceleration, this.#maxSpeed)
    const direction = new Vector3(0, 0, -1).applyQuaternion(this.quaternion)
    this.position.addScaledVector(direction, -currentSpeed)
  }

  #toBrake(speed = 0) {
    const currentSpeed = Math.max(speed - this.#acceleration, this.#minSpeed)
    const direction = new Vector3(0, 0, -1).applyQuaternion(this.quaternion)
    this.position.addScaledVector(direction, currentSpeed)
  }

  #activateActions(weight: number) {
    this.#actions.forEach((action) => {
      action.enabled = true
      action.setEffectiveWeight(1)
      action.setEffectiveWeight(weight)
      action.play()
    })
  }
}

import {Vector3, Quaternion, AnimationAction, AnimationMixer} from 'three'
import {Input, Loader} from '@4ever-dev/shared/util-three'
import {Entity, Updatable} from '../../interfaces'

type BeeAction = '_bee_hover' | '_bee_idle' | '_bee_take_off_and_land'

export class Bee extends Entity implements Updatable {
  override name = 'bee'
  order = 2

  #mixer?: AnimationMixer
  #action?: Record<BeeAction, AnimationAction>

  #yaw = new Vector3(0, 1, 0)
  #currentRotation = new Quaternion()

  constructor(private input: Input, private loader: Loader) {
    super()
  }

  #handleInput(delta: number) {
    if (this.input.direction.Some) {
      this.#playAction('_bee_take_off_and_land')
      // this.#unPauseAction('walk')
    } else {
      this.#stopAction('_bee_take_off_and_land')
    }

    if (this.input.direction.North) {
      this.#toNorth(delta)
    }

    if (this.input.direction.West) {
      this.#toWest(delta)
    }

    if (this.input.direction.East) {
      this.#toEast(delta)
    }

    if (this.input.direction.South) {
      this.#toSouth(delta)
    }

    if (this.input.key.ShiftLeft) {
      this.#playAction('_bee_hover')
    } else {
      this.#stopAction('_bee_hover')
    }
  }

  update(timeStep: number, delta: number): void {
    this.#handleInput(delta)

    if (this.#mixer && delta) {
      this.#mixer.update(delta)
    }

    this.#rotateSmoothly(Math.min(4 * timeStep, 1))
  }

  #toNorth(speed: number) {
    const direction = new Vector3(0, 0, 1).applyQuaternion(this.quaternion)
    this.position.addScaledVector(direction, speed)
  }

  #toSouth(speed: number) {
    const direction = new Vector3(0, 0, -1).applyQuaternion(this.quaternion)
    this.position.addScaledVector(direction, speed)
  }

  #toWest(angle: number) {
    const quaternion = new Quaternion().setFromAxisAngle(this.#yaw, angle)
    this.#currentRotation.multiply(quaternion)
  }

  #toEast(angle: number) {
    const quaternion = new Quaternion().setFromAxisAngle(this.#yaw, -angle)
    this.#currentRotation.multiply(quaternion)
  }

  #rotateSmoothly(alpha: number) {
    const quaternion = new Quaternion()
    quaternion.slerpQuaternions(this.quaternion, this.#currentRotation, alpha)
    this.quaternion.copy(quaternion)
  }

  initialize() {
    if (this.initialized) return

    this.loader.load('bee-big.glb').then(({scene, animations}) => {
      this.add(scene)

      console.log(animations)

      this.#mixer = new AnimationMixer(scene)
      const actions: AnimationAction[] = []

      for (const animation of animations) {
        console.log(animation.name)

        actions.push(this.#mixer.clipAction(animation))
      }

      const [_bee_hover, _bee_idle, _bee_take_off_and_land] = actions
      this.#action = {_bee_hover, _bee_idle, _bee_take_off_and_land}
      this.#activateAction('_bee_hover', 1, 1)
      this.#activateAction('_bee_idle', 1, 1)
      this.#activateAction('_bee_take_off_and_land', 1, 1)

      this.#playAction('_bee_idle')

      this.position.set(0, 0, 0)
    })
  }

  #playAction(action: BeeAction) {
    const act = this.#getAction(action)
    // if (act && act.paused === false) return
    if (act) act.play()
  }

  #activateAction(action: BeeAction, weight: number, timeScale: number) {
    const act = this.#getAction(action)
    if (act) {
      act.enabled = true
      act.setEffectiveWeight(weight)
      act.setEffectiveTimeScale(timeScale)
    }
  }

  #pauseAction(action: BeeAction) {
    const act = this.#getAction(action)
    if (act) act.paused = true
  }

  #unPauseAction(action: BeeAction) {
    const act = this.#getAction(action)
    if (act) act.paused = false
  }

  #stopAction(action: BeeAction) {
    const act = this.#getAction(action)
    if (act) act.stop()
  }

  #getAction(action: BeeAction) {
    return this.#action && this.#action[action] ? this.#action[action] : null
  }
}

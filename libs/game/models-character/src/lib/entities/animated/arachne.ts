import {Vector3, Quaternion, AnimationAction, AnimationMixer} from 'three'
import {Input, Loader} from '@4ever-dev/shared/util-three'
import {Entity, Updatable} from '../../interfaces'

type ArachneAction = 'jumpAttack' | 'idle' | 'walk' | 'jumpStomp' | 'sideDodge'

export class Arachne extends Entity implements Updatable {
  override name = 'arachne'
  order = 2
  #speed = 1

  #mixer?: AnimationMixer
  #action?: Record<ArachneAction, AnimationAction>

  #yaw = new Vector3(0, 1, 0)
  #currentRotation = new Quaternion()

  constructor(private input: Input, private loader: Loader) {
    super()
  }

  initialize() {
    if (this.initialized) return

    this.loader.load('arachne.glb').then(({scene, animations}) => {
      this.add(scene)

      this.position.set(0, 0, 0)

      this.#mixer = new AnimationMixer(scene)
      const actions: AnimationAction[] = []

      for (const animation of animations) {
        actions.push(this.#mixer.clipAction(animation))
      }

      const [jumpAttack, idle, walk, jumpStomp, sideDodge] = actions
      this.#action = {jumpAttack, idle, walk, jumpStomp, sideDodge}
      this.#activateAction('idle', 1, 1)
      this.#activateAction('walk', 1, 1)
      this.#activateAction('sideDodge', 1, 1)
      this.#activateAction('jumpAttack', 1, 1)

      this.#playAction('idle')
    })
  }

  update(timeStep: number, delta: number): void {
    this.#handleInput(delta * this.#speed)

    if (this.#mixer && delta) {
      this.#mixer.update(delta * this.#speed)
    }

    this.#rotateSmoothly(Math.min(4 * timeStep, 1))
  }

  #handleInput(delta: number) {
    if (this.input.direction.Some) {
      this.#playAction('walk')
    } else {
      this.#stopAction('walk')
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
      this.#playAction('jumpStomp')
    } else {
      this.#stopAction('jumpStomp')
    }

    if (this.input.key.ControlLeft) {
      this.#playAction('jumpAttack')
    } else {
      this.#stopAction('jumpAttack')
    }

    if (this.input.key.Space) {
      this.#speed = 3
    } else {
      this.#speed = 1
    }
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

  #playAction(action: ArachneAction) {
    const act = this.#getAction(action)
    if (act) act.play()
  }

  #activateAction(action: ArachneAction, weight: number, timeScale: number) {
    const act = this.#getAction(action)
    if (act) {
      act.enabled = true
      act.setEffectiveWeight(weight)
      act.setEffectiveTimeScale(timeScale)
    }
  }

  #pauseAction(action: ArachneAction) {
    const act = this.#getAction(action)
    if (act) act.paused = true
  }

  #unPauseAction(action: ArachneAction) {
    const act = this.#getAction(action)
    if (act) act.paused = false
  }

  #stopAction(action: ArachneAction) {
    const act = this.#getAction(action)
    if (act) act.stop()
  }

  #getAction(action: ArachneAction) {
    return this.#action && this.#action[action] ? this.#action[action] : null
  }
}

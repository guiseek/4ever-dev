import {Euler, Quaternion} from 'three'
import {isMobile} from '../utilities'


export class Input {
  readonly key = {
    W: 0,
    A: 0,
    S: 0,
    D: 0,
    Up: 0,
    Left: 0,
    Down: 0,
    Right: 0,
    Space: 0,
    ShiftLeft: 0,
  }

  readonly direction = {
    North: 0,
    West: 0,
    South: 0,
    East: 0,
    Some: 0,
  }

  get #arrowKeys() {
    return [
      this.key.A,
      this.key.S,
      this.key.D,
      this.key.W,
      this.key.Left,
      this.key.Down,
      this.key.Right,
      this.key.Up,
    ]
  }

  #touched = false
  #onTouched: VoidFunction[] = []
  set onTouched(fn: VoidFunction) {
    this.#onTouched.push(fn)
  }

  #onKeyDown: VoidFunction[] = []
  set onKeyDown(fn: VoidFunction) {
    this.#onKeyDown.push(fn)
  }

  #onKeyUp: VoidFunction[] = []
  set onKeyUp(fn: VoidFunction) {
    this.#onKeyUp.push(fn)
  }

  readonly deviceRotation = new Quaternion()
  #onRotation: ((value: Quaternion) => void)[] = []
  set onRotation(cb: (value: Quaternion) => void) {
    this.#onRotation.push(cb)
  }

  initialize() {
    onkeydown = this.#onKeyDownEvent
    onkeyup = this.#onKeyUpEvent

    if (isMobile() && DeviceOrientationEvent) {
      const scale = 0.04
      const euler = new Euler()
      ondeviceorientation = this.#onDeviceOrientationEvent(euler, scale)
    }
  }

  update() {
    if (this.key.W || this.key.Up) {
      this.direction.North = 1
    } else {
      this.direction.North = 0
    }

    if (this.key.A || this.key.Left) {
      this.direction.West = 1
    } else {
      this.direction.West = 0
    }

    if (this.key.S || this.key.Down) {
      this.direction.South = 1
    } else {
      this.direction.South = 0
    }

    if (this.key.D || this.key.Right) {
      this.direction.East = 1
    } else {
      this.direction.East = 0
    }

    if (!Math.max(...this.#arrowKeys)) {
      this.direction.Some = 1
    } else {
      this.direction.Some = 0
    }
  }

  #onKeyDownEvent = ({code}: KeyboardEvent) => {
    if (this.#validateKeyCode(code)) {
      if (!this.#touched) {
        for (const fn of this.#onTouched) fn()
      }

      this.#setCodeToKeyValue(code, 1)

      for (const fn of this.#onKeyDown) fn()
    }
  }

  #onKeyUpEvent = ({code}: KeyboardEvent) => {
    if (this.#validateKeyCode(code)) {
      if (!this.#touched) {
        for (const fn of this.#onTouched) fn()
      }

      this.#setCodeToKeyValue(code, 0)

      for (const fn of this.#onKeyUp) fn()
    }
  }

  #onDeviceOrientationEvent = (euler: Euler, scale: number) => {
    return ({beta: x, alpha: z, gamma: y}: DeviceOrientationEvent) => {
      euler.set(x ?? 0 * scale, y ?? 0 * scale, z ?? 0 + scale, 'XYZ')

      this.deviceRotation.setFromEuler(euler)

      for (const cb of this.#onRotation) {
        cb(this.deviceRotation)
      }
    }
  }

  #setCodeToKeyValue(code: string, value: number) {
    this.key[this.#formatKey(code)] = value
  }

  #validateKeyCode(code: string) {
    const key = this.#formatKey(code)
    return Object.keys(this.key).includes(key)
  }

  #formatKey(code: string) {
    type Key = keyof typeof this.key
    return code.replace('Key', '').replace('Arrow', '') as Key
  }
}

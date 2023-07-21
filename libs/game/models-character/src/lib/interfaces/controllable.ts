import {Vector3} from 'three'
import {KeyBinding} from '../utilities/key-binding'

export interface Controllable {
  actions: Record<string, KeyBinding>
  position: Vector3
}

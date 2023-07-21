import {KeyCode} from '../types'

export class KeyBinding {
  eventCodes: KeyCode[] = []
  isPressed: boolean = false
  justPressed: boolean = false
  justReleased: boolean = false

  constructor(...codes: KeyCode[]) {
    this.eventCodes = codes
  }
}

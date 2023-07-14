import {Group} from 'three'

export abstract class Entity extends Group {
  abstract override name: string

  protected initialized = false
  abstract initialize(): void
}

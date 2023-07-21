import {BehaviorSubject} from 'rxjs'

type Shortcuts<T extends KeyCode> = Record<T, boolean>

export class Shortcut<T extends KeyCode> {
  #state
  state$

  #codes: string[]

  constructor(...codes: T[]) {
    this.#codes = codes

    const state = this.#buildState(...codes)
    this.#state = new BehaviorSubject<Shortcuts<T>>(state)
    this.state$ = this.#state.asObservable()
  }

  listen() {
    addEventListener('keydown', this.#onKey(true))
    addEventListener('keyup', this.#onKey(false))
  }

  unlisten() {
    removeEventListener('keydown', this.#onKey(true))
    removeEventListener('keyup', this.#onKey(false))
  }

  #onKey = (state: boolean) => (e: KeyboardEvent) => {
    if (this.#codes.includes(e.code)) {
      this.#state.next({
        ...this.#state.value,
        [e.code]: state,
      })
    }
  }

  #buildState(...codes: KeyCode[]) {
    const state = codes.reduce((prev, curr) => {
      return {...prev, [curr]: false}
    }, {} as Shortcuts<T>)

    return Object.freeze(state)
  }
}

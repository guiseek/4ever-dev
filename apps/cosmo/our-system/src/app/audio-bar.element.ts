import {runWhenActive, AudioAnalyser} from '@4ever-dev/game/util-audio'
import {create} from '@4ever-dev/shared/util-dom'
import {audioBarConfig} from './audio-bar.config'

export class AudioBarElement extends HTMLElement {
  connectedCallback() {
    const audio = new Audio(audioBarConfig.src)
    audio.controls = true

    runWhenActive('hasBeenActive', () => {
      const canvas = create('canvas', {width: 300, height: 42})
      const analyser = new AudioAnalyser({
        color: '#111111',
        canvas,
        audio,
      })
      analyser.initialize()
      audio.before(canvas)
      this.#setSession()
      audio.play()
    })

    this.append(audio)

    this.setStyles()
  }

  #setSession() {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = audioBarConfig.meta
    }
  }

  setStyles() {
    this.style.accentColor = 'green'
    this.style.display = 'flex'
    this.style.alignItems = 'center'
    this.style.justifyContent = 'flex-end'
    this.style.backgroundColor = '#f1f3f4'
    this.style.position = 'fixed'
    this.style.width = '100vw'
    this.style.bottom = '0'
  }
}
customElements.define('audio-bar', AudioBarElement)

import './app.element.scss'
import ogg from './audio.ogg'
import mp3 from './audio.mp3'

const WIDTH = innerWidth
const HEIGHT = innerHeight

const VIEW_ANGLE = 45
const ASPECT = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 10000

export class AppElement extends HTMLElement {
  public static observedAttributes = []

  width = innerWidth
  height = innerHeight

  title = 'cosmo-solar-system'
  html = /*html*/ `
    <h1>${this.title}</h1>
    <div id="desc">
      <strong>Solar System</strong> -
      Mouse scroll to zoom in/out. Click and drag to rotate camera.
      More <a href="http://www.webdev20.pl">demos</a> and <a href="http://designconcept.webdev20.pl">projects</a>.
      Music by <a href="http://www.jamendo.com/pl/artist/342706/raccoon-fink">Raccoon Fink</a>
      <a id="music" href="#">Music off</a>
    </div>
    <div id="bg"> </div>
    <div id="container">
    </div>
    <audio autoplay="autoplay" loop="loop">
      <source src="${ogg}" type="audio/ogg">
      <source src="${mp3}" type="audio/mpeg">
    </audio>
  `

  connectedCallback() {
    this.innerHTML += this.html

    const container = this.querySelector('#container') as HTMLDivElement
    let mouseX = 0
    let mouseY = 0
    let mouseDown = false
    let roll = false


  }
}
customElements.define('app-root', AppElement)

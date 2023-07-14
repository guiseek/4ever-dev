import {DirectionalLight, HemisphereLight, SpotLight} from 'three'

export class Light {
  sun = new DirectionalLight(0xcccccc, 1)
  directional = new SpotLight(0x121214, 0.8, 7, 0.8, 1, 1)
  hemisphere = new HemisphereLight(0xffffff, 0x000000, 0.9)

  toArray() {
    return [this.sun, this.directional, this.hemisphere]
  }
}

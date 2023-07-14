import {Component} from '@angular/core'

@Component({
  selector: 'game-root',
  template: ` <router-outlet></router-outlet> `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AppComponent {
  title = 'game-arachne'
}

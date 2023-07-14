import {Laser, Spaceship} from '@4ever-dev/game/models-character'
import {Input, Light, Loader} from '@4ever-dev/shared/util-three'
import {Component, inject} from '@angular/core'
import {RouterModule} from '@angular/router'
import {Clock, Scene} from 'three'

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'game-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    Scene,
    Clock,
    Light,
    Input,
    Laser,
    {
      provide: 'loader.path',
      useValue: 'assets/models',
    },
    {
      provide: Loader,
      deps: ['loader.path'],
    },
    {
      provide: Spaceship,
      deps: [Input, Loader]
    },
  ],
})
export class AppComponent {
  #spaceship = inject(Spaceship)
}

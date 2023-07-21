import {OnInit, Component, ChangeDetectionStrategy, inject} from '@angular/core'
import {GameUiMenuService} from '@4ever-dev/game/ui-menu'
import {Router} from '@angular/router'

@Component({
  template: ``,
  selector: 'game-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
})
export class HomeContainer implements OnInit {
  #menu = inject(GameUiMenuService)
  #router = inject(Router)

  ngOnInit() {
    const {closed} = this.#menu.open({
      message: 'Arachne 1.0',
      options: [
        {label: 'Play', value: 'play'},
        {label: 'Settings', value: 'settings'},
      ],
    })

    closed.subscribe((result) => {
      if (result && result.value === 'play') {
        this.#router.navigate(['canvas'])
      }
    })
  }
}

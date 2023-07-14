import {OnInit, Component, ChangeDetectionStrategy, inject} from '@angular/core'
import {GameUiMenuComponent, GameUiMenuService} from '@4ever-dev/game/ui-menu'
import {Dialog, DialogModule} from '@angular/cdk/dialog'
import {Router} from '@angular/router'

@Component({
  template: ``,
  standalone: true,
  imports: [DialogModule, GameUiMenuComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: GameUiMenuService,
      deps: [Dialog],
    },
  ],
})
export class HomeContainer implements OnInit {
  #menu = inject(GameUiMenuService)
  #router = inject(Router)

  ngOnInit() {
    const menuRef = this.#menu.open({
      message: 'Spaceship',
      options: [
        {label: 'Play', value: 'play'},
        {label: 'Settings', value: 'settings'},
      ],
    })

    menuRef.closed.subscribe((result) => {
      if (result && result.value === 'play') {
        this.#router.navigate(['game'])
      }
    })
  }
}

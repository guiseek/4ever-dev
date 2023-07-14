import {Dialog} from '@angular/cdk/dialog'
import {GameUiMenuComponent} from './game-ui-menu.component'
import {GameUiMenuData, GameUiMenuOption} from './game-ui-menu.interfaces'

export class GameUiMenuService {
  constructor(private readonly dialog: Dialog) {}

  open<R extends GameUiMenuOption, D extends GameUiMenuData>(data: D) {
    const ref = this.dialog.open<R, D>(GameUiMenuComponent, {
      data,
      disableClose: true,
    })
    return {ref, closed: ref.closed}
  }
}

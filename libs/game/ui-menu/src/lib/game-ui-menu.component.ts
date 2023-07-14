import {DialogModule, DIALOG_DATA, DialogRef, Dialog} from '@angular/cdk/dialog'
import {AsyncPipe, NgFor, NgIf, NgStyle} from '@angular/common'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {GameUiMenuData, GameUiMenuOption} from './game-ui-menu.interfaces'
import {GameUiMenuService} from './game-ui-menu.service'
import {
  OnInit,
  inject,
  Inject,
  Component,
  ElementRef,
  DestroyRef,
  ChangeDetectionStrategy,
} from '@angular/core'
import {BehaviorSubject, fromEvent} from 'rxjs'

interface Angle {
  dx: number
  dy: number
}

@Component({
  standalone: true,
  selector: 'game-ui-menu',
  template: `
    <p>{{ data.message }}</p>

    <ng-container *ngIf="angle$ | async as angle">
      <menu style="--x: {{ angle.dy / 20 }}deg; --y: {{ angle.dx / 20 }}deg">
        <li *ngFor="let option of data.options">
          <button (click)="dialogRef.close(option)">
            {{ option.label }}
          </button>
        </li>
      </menu>
    </ng-container>
  `,
  styleUrls: ['./game-ui-menu.component.scss'],
  imports: [NgIf, NgFor, NgStyle, AsyncPipe, DialogModule],
  providers: [{provide: GameUiMenuService, deps: [Dialog]}],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameUiMenuComponent implements OnInit {
  destroyRef = inject(DestroyRef)

  #angle = new BehaviorSubject<Angle>({dx: 0, dy: 0})
  angle$ = this.#angle.asObservable()

  get element() {
    return this.elementRef.nativeElement
  }

  constructor(
    readonly elementRef: ElementRef<HTMLElement>,
    readonly dialogRef: DialogRef<GameUiMenuOption>,
    @Inject(DIALOG_DATA) readonly data: GameUiMenuData
  ) {}

  ngOnInit() {
    const {matches: motionOK} = window.matchMedia(
      '(prefers-reduced-motion: no-preference)'
    )

    if (motionOK) {
      fromEvent<MouseEvent>(window, 'mousemove')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(({clientX, clientY}) => {
          this.#angle.next(this.#getAngles(clientX, clientY))
        })
    }
  }

  #getAngles(clientX: number, clientY: number) {
    const menuRect = this.elementRef.nativeElement.getBoundingClientRect()
    const {x, y, width, height} = menuRect

    const dx = clientX - (x + 0.5 * width)
    const dy = clientY - (y + 0.5 * height)

    return {dx, dy}
  }
}

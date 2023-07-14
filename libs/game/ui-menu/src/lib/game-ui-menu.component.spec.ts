import {ComponentFixture, TestBed} from '@angular/core/testing'
import {GameUiMenuComponent} from './game-ui-menu.component'

describe('GameUiMenuComponent', () => {
  let component: GameUiMenuComponent
  let fixture: ComponentFixture<GameUiMenuComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameUiMenuComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(GameUiMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

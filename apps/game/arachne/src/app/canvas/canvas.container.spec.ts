import {ComponentFixture, TestBed} from '@angular/core/testing'
import {CanvasContainer} from './canvas.container'

describe('CanvasContainer', () => {
  let component: CanvasContainer
  let fixture: ComponentFixture<CanvasContainer>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CanvasContainer],
    }).compileComponents()

    fixture = TestBed.createComponent(CanvasContainer)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

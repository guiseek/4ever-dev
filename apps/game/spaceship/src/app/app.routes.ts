import {Route} from '@angular/router'
import {CanvasContainer} from './canvas/canvas.component'
import {HomeContainer} from './home/home.container'

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeContainer,
  },
  {
    path: 'game',
    component: CanvasContainer,
  },
]

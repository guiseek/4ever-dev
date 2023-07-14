import {Route} from '@angular/router'
import {HomeContainer} from './home/home.container'
import {CanvasContainer} from './canvas/canvas.container'

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeContainer,
  },
  {
    path: 'canvas',
    component: CanvasContainer,
  },
]

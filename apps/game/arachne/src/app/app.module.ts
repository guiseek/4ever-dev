import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {RouterModule} from '@angular/router'
import {AppComponent} from './app.component'
import {appRoutes} from './app.routes'
import {CanvasContainer} from './canvas/canvas.container'
import {HomeContainer} from './home/home.container'
import {Input, Light, Loader} from '@4ever-dev/shared/util-three'
import {Arachne, Bee, Cityscape} from '@4ever-dev/game/models-character'
import {GameUiMenuComponent, GameUiMenuService} from '@4ever-dev/game/ui-menu'
import {Clock, Scene} from 'three'
import { Dialog } from '@angular/cdk/dialog'

@NgModule({
  declarations: [AppComponent, CanvasContainer, HomeContainer],
  imports: [
    BrowserModule,
    GameUiMenuComponent,
    RouterModule.forRoot(appRoutes, {initialNavigation: 'enabledBlocking'}),
  ],
  providers: [
    Scene,
    Clock,
    Light,
    Input,
    {
      provide: 'loader.path',
      useValue: 'assets/models',
    },
    {
      provide: Loader,
      deps: ['loader.path'],
    },
    {
      provide: Arachne,
      deps: [Input, Loader],
    },
    {
      provide: Cityscape,
      deps: [Loader],
    },
    {
      provide: GameUiMenuService,
      deps: [Dialog]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

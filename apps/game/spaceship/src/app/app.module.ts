import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {GameUiMenuComponent} from '@4ever-dev/game/ui-menu'
import {RouterModule} from '@angular/router'
import {appRoutes} from './app.routes'
import {AppProviders} from './app.providers'
import {AppComponent} from './app.component'
import {HomeContainer} from './home/home.container'
import {CanvasContainer} from './canvas/canvas.container'

@NgModule({
  declarations: [AppComponent, HomeContainer, CanvasContainer],
  imports: [
    BrowserModule,
    GameUiMenuComponent,
    RouterModule.forRoot(appRoutes, {initialNavigation: 'enabledBlocking'}),
  ],
  providers: [AppProviders.forRoot()],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { StatsPage } from '../pages/stats/stats';
import { EntryPage } from '../pages/entry/entry';
import { AccelPage } from '../pages/accel/accel';
@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    StatsPage,
    EntryPage,
    AccelPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    StatsPage,
    EntryPage,  
    AccelPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

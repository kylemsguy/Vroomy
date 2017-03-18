import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, Keyboard} from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      Keyboard.onKeyboardShow().subscribe(() => {
                document.body.classList.add('keyboard-is-open');
            });

      Keyboard.onKeyboardHide().subscribe(() => {
                document.body.classList.remove('keyboard-is-open');
            });
    });
  }
}

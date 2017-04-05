import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MenuTestPage } from "../pages/menu-test/menu-test";

interface Page {
  component: any,
  title: string,
  icon: string
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  pages: Page[] = [
    {component: HomePage, title: 'Home', icon: 'home'},
    {component: MenuTestPage, title: 'Menu Test', icon: 'user'},
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    }); 
  }

  openPage(page: Page): void {
    this.rootPage = page.component;
  }
}

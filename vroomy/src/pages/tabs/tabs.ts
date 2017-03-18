import { Component } from '@angular/core';
import { EntryPage } from '../entry/entry';
import { StatsPage } from '../stats/stats';
import { AccelPage } from '../accel/accel';
import { NavController } from 'ionic-angular';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabs: _tab[];

  constructor(public navCtrl: NavController) {
  	this.tabs = 
  	[
  		{title: "Forms", page: EntryPage, icon: "information"},
  		{title: "Run", page: AccelPage, icon: "car"},
  		{title: "Stats", page: StatsPage, icon :"stats"}
  	];
  }
}

interface _tab
{
	page: any;
	title:string;
	icon: string;
}

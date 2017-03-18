import { Component } from '@angular/core';
import { EntryPage } from '../entry/entry';
import { StatsPage } from '../stats/stats';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabs: _tab[];

  constructor() {
  	this.tabs = 
  	[
  		{title: "Forms", page: EntryPage, icon: "information"},
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

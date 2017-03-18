import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Entry page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html'
})
export class EntryPage {

	titleStyle: any;
	forms: _form[];
	makes:_make[] = 
	[
	{make:"toyota", model:["Corolla", "Rav4"]},
	{make:"Honda", model:["Civic", "Accord"]},
	{make:"GM", model:["F1-50", "Malibu"]}
	];
	constructor(public navCtrl: NavController, public navParams: NavParams) 
	{
		var makeChoices:string[] = [];
		var modelChoices:string[] = [];
		for (var i = 0; i < this.makes.length; i++)
		{
			makeChoices.push(this.makes[i].make);
		}
		for (var i = 0; i < this.makes[0].model.length; i++)
		{
			modelChoices.push(this.makes[0].model[i]);
		}	
		this.forms = 
		[
			{question: "What is your car make?", choices: 
			makeChoices, answer:'Toyota'},
			{question: "What is your car model?", choices: 
			modelChoices, answer:''}
		]; 
		this.titleStyle =
		{
			'text-align': 'center'
		};
	}

	setAnswer = (form, option, i) =>
	{
		if (form === this.forms[0]) 
		{
			form.answer = option;
			var modelChoices:string[] = [];
			for (var j = 0; j < this.makes[i].model.length; j++)
			{
				modelChoices.push(this.makes[i].model[j]);
			}	
			this.forms[1].choices = modelChoices;	
		}
		if (form === this.forms[1])
		{
			form.answer = option;
		}	
	};

	showAnswer = () =>
	{
		alert(this.forms[1].answer);
	};

}
interface _form
{
	question:string;	
	choices:string[];
	answer:string;
}

interface _make
{
	make:string;
	model:string[];
}


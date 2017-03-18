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
	makeId:number;
	selects: any[];
	titleStyle: any;
	forms: _form[];
	inputs: _input[];
	makes:_make[] = 
	[
	{id: 0, make:"toyota", model:["Corolla", "Rav4"]},
	{id: 1, make:"Honda", model:["Civic", "Accord"]},
	{id: 2, make:"GM", model:["F1-50", "Malibu"]}
	];
	constructor(public navCtrl: NavController, public navParams: NavParams) 
	{
		var answers:{} = {model:"", make:""}; 
		var makeChoices:string[] = [];
		var modelChoices:string[] = [];

		for (var item in this.makes[0])
		{
			answers[item] = localStorage.getItem(item);
		}
		if (answers['model'] != undefined)
			{
				modelChoices.push(answers['model']);
			}
		if (answers['make'] != undefined)
			{
				makeChoices.push(answers['make']);
			}
		for (var i = 0; i < this.makes.length; i++)
		{
			if (answers['make'] != this.makes[i].make)
			{makeChoices.push(this.makes[i].make);}
		}
		for (var i = 0; i < this.makes.length; i++)
		{
			if (this.makes[i].make == answers['make'])
			{
				this.makeId = i;
				break;
			}
		}
		for (var i = 0; i < this.makes[this.makeId].model.length; i++)
		{
			if (answers['model'] != this.makes[this.makeId].model[i])
			{modelChoices.push(this.makes[this.makeId].model[i]);}		
		}
		this.forms = 
		[
			{id: 0, question: "What is your car make?", choices: 
			makeChoices, answer:(answers['make'] == undefined)?'Corolla':answers['model']},
			{id: 1, question: "What is your car model?", choices: 
			modelChoices, answer: (answers['model'] == undefined)?'Corolla':answers['model']}
		]; 
			
		this.inputs = 
		[
			{id: 0, question: "How much mileage is on your car?",
			 answer: (answers['mileage'] == undefined)?'':answers['mileage']}
		];

		//DOM Styles
		this.titleStyle =
		{
			'text-align': 'center'
		};
	}

	setAnswerForm = (form, option) =>
	{
		if (form === this.forms[0]) 
		{
			form.answer = option;
			for (var i = 0; i < this.makes.length; i++)
			{
				if (this.makes[i].make == option)
				{
					this.makeId = i;
					break;
				}
			}
			var modelChoices:string[] = [];
			for (var j = 0; j < this.makes[this.makeId].model.length; j++)
			{
				modelChoices.push(this.makes[this.makeId].model[j]);
			}	
			this.forms[1].choices = modelChoices;	
			localStorage.setItem("make", option);
		}
		if (form === this.forms[1])
		{
			form.answer = option;
			localStorage.setItem("model", option);
		}

	};

	setAnswerInput = (input) =>
	{
		if (input == this.inputs[0])
		{
			localStorage.setItem("mileage", input.answer);
		}
	}

	showAnswer = () =>
	{alert(localStorage.getItem("mileage"))};
}

interface _form
{
	id:number;
	question:string;	
	choices:string[];
	answer:string;
}

interface _make
{
	id:number;
	make:string;
	model:string[];
}

interface _input
{
	id:number;
	question:string;
	answer:string;
}


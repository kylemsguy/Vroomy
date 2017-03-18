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
	formStyles = 
	[
		{'text-align': 'center'},
		{'text-align': 'center'}
	];
	inputStyles =
	[
		{'text-align': 'center'},
		{'text-align': 'center'},

	];
	inputQuestions = ["make", "model", "mileage", "age"]
	makeId:number = -1;
	selects: any[];
	titleStyle: any;
	forms: _form[];
	inputs: _input[];
	makes:_make[] = 
	[
	{id: 0, make:"Toyota", model:["Corolla", "Rav4"]},
	{id: 1, make:"Honda", model:["Civic", "Accord"]},
	{id: 2, make:"GM", model:["F1-50", "Malibu"]}
	];
	constructor(public navCtrl: NavController, public navParams: NavParams) 
	{
		var answers:{} = {}; 
		var makeChoices:string[] = [];
		var modelChoices:string[] = [];

		for (var item in this.inputQuestions);
		{
			answers[item] = localStorage.getItem(item);
		}
		if (answers['model'] != undefined)
			{
				this.formStyles[0]['background-color'] = "green";
				modelChoices.push(answers['model']);
			}
		if (answers['make'] != undefined)
			{
				this.formStyles[1]['background-color'] = "grey"
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
		if (this.makeId >= 0)
		{
		for (var i = 0; i < this.makes[this.makeId].model.length; i++)
			{
				if (answers['model'] != this.makes[this.makeId].model[i])
				{modelChoices.push(this.makes[this.makeId].model[i]);}		
			}
		}
		this.forms = 
		[
			{id: 0, question: "What is your car make?", choices: 
			makeChoices, answer:(answers['make'] == undefined)?'':answers['model']},
			{id: 1, question: "What is your car model?", choices: 
			modelChoices, answer: (answers['model'] == undefined)?'':answers['model']}
		]; 
			
		this.inputs = 
		[
			{id: 0, question: "How Much Mileage is on your Car?",
			 answer: (answers['mileage'] == undefined)?'':answers['mileage']},
			 {id: 0, question: "How Old is your Car?",
			 answer: (answers['age'] == undefined)?'':answers['age']}
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
			this.formStyles[0]['background-color'] = "green"
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
			localStorage.setItem("model", "");
		}
		if (form === this.forms[1])
		{
			this.formStyles[1]['background-color'] = "grey"
			form.answer = option;
			localStorage.setItem("model", option);
		}

	};

	warningInput:string[] = ["",""];
	setAnswerInput = (input) =>
	{
		if (input == this.inputs[0])
		{
			localStorage.setItem("mileage", input.answer);
			
			if (isNaN(input.answer))
			{
				this.warningInput[0] = "Invalid Input";
				this.inputStyles[0]['background-color'] = "white"; 
			}
			else 
			{
				this.warningInput[0] = "";
				this.inputStyles[0]['background-color'] = "yellow"; 
			}
		}

		else if (input == this.inputs[1])
		{
			localStorage.setItem("age", input.answer);


			if (isNaN(input.answer))
			{
				this.warningInput[1] = "Invalid Input";
				this.inputStyles[1]['background-color'] = "white"; 
			}
			else 
			{
				this.warningInput[1] = "";
				this.inputStyles[1]['background-color'] = "pink"; 
			}

		}

	}

	showAnswer = () =>
	{alert()};

	clearStorage = () =>
	{
		localStorage.clear();

		this.forms = 
		[
			{id: 0, question: "What is your car make?", choices: 
			['Toyota', 'Honda', 'GM'], answer:""},
			{id: 1, question: "What is your car model?", choices: 
			[], answer:""}
		]; 
			
		this.inputs = 
		[
			{id: 0, question: "How much mileage is on your car?",
			 answer: ""},
			 {id: 1, question: "How old is your car?",
			 answer: ""}
		];
	
	}
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


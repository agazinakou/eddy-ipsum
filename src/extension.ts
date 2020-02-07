// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

var json = require('../dictionary.json');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "eddy-ipsum" is now active!');

	let line = vscode.commands.registerCommand('extension.line', generateLine);
	let paragraph = vscode.commands.registerCommand('extension.paragraph', generateParagraph);

	context.subscriptions.push(line);
	context.subscriptions.push(paragraph);
}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
}

function generateLine() {
	var text = json['sentences_1'][getRndInteger(0, 20)] + ' ' + json['sentences_2'][getRndInteger(0, 23)] + '.';
	console.log(text);
	var editor = vscode.window.activeTextEditor;
	editor.edit(
	  edit => editor.selections.forEach(
		selection => {
		  edit.delete(selection);
		  edit.insert(selection.start, text);
		}
	  )
	);
}

function line(){
	var rand = getRndInteger(0, 20);
	if(rand % 2 == 0) {
		return json['sentences_1'][getRndInteger(0, 19)] + ' ' + json['sentences_2'][getRndInteger(0, 23)] + '. ';
	} else {
		return json['sentences_1'][getRndInteger(0, 19)] + ' ' + json['sentences_8'][getRndInteger(0, 6)] + ' ' + json['sentences_7'][getRndInteger(0, 19)] + '. ';
	}
}

function generateParagraph() {
	var text : any = '';
	for (let i = 2; i <= 10; i++) {
	  	text = text + line();
	}
	var editor = vscode.window.activeTextEditor;
	editor.edit(
	  edit => editor.selections.forEach(
		selection => {
		  edit.delete(selection);
		  edit.insert(selection.start, text);
		}
	  )
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}

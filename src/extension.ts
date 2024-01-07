// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "enter-scroll" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let isEnabled = false;

	let disposable = vscode.commands.registerCommand('enter-scroll.insertLineAndScroll', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const position = editor.selection.active;

			editor.edit(editBuilder => {
				editBuilder.insert(position, '\n');
			}).then(() => {
				if (isEnabled) {
					vscode.commands.executeCommand('scrollLineDown');
				}
			});
		}
	});

	let toggleDisposable = vscode.commands.registerCommand('enter-scroll.toggleInsertLineAndScroll', () => {
		isEnabled = !isEnabled;
		vscode.window.showInformationMessage(`Insert Line and Scroll is ${isEnabled ? 'enabled' : 'disabled'}`);
	});

	context.subscriptions.push(disposable, toggleDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

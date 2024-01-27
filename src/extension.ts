// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { WritableStreamDefaultWriter } from 'stream/web';
import * as vscode from 'vscode';

let isEnabled = false;
let disposable: vscode.Disposable | undefined;

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "enter-scroll" is now active!');

    let toggleDisposable = vscode.commands.registerCommand('enter-scroll.toggleInsertLineAndScroll', () => {
        isEnabled = !isEnabled;
       // vscode.window.showInformationMessage(`Insert Line and Scroll is ${isEnabled ? 'enabled' : 'disabled'}`);

        if (isEnabled) {
            // onDidChangeTextDocument イベントを購読
            disposable = vscode.workspace.onDidChangeTextDocument(handleTextDocumentChange);
            vscode.window.showInformationMessage('Insert Line and Scroll is Enabled');
        } else {
            disposable?.dispose();
            vscode.window.showInformationMessage('Insert Line and Scroll is Disabled');
        }
    });

    context.subscriptions.push(disposable ?? vscode.Disposable.from(), toggleDisposable);
}

function handleTextDocumentChange(event: vscode.TextDocumentChangeEvent) {
    // テキストが変更されたときに呼び出されるハンドラ
    const editor = vscode.window.activeTextEditor;
    if (editor && event.document === editor.document) {
        // テキストが変更されたドキュメントが現在のエディタと一致する場合のみ処理を実行
        const lastChange = event.contentChanges[event.contentChanges.length - 1];
        if (lastChange.text.includes('\n')) {
            vscode.commands.executeCommand('editorScroll', { to: 'down', by: 'line' });
        }
    }
}

export function deactivate() {}
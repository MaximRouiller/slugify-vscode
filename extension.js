// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
let vscode = require('vscode');
let slugit = require('slugify');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    context.subscriptions.push(vscode.commands.registerCommand('extension.slugifySelection', slugifySelection));
}
exports.activate = activate;

function slugifySelection() {
    if (!vscode.window.activeTextEditor) {
        console.error('wrong kind of window I guess?')
    }

    vscode.window.activeTextEditor.edit(function (eb) {
        for (let selection of vscode.window.activeTextEditor.selections) {
            console.log(selection);
            eb.replace(selection, slugit(vscode.window.activeTextEditor.document.getText(selection), {
                remove: /[$*+~.()'"!\-:@]/g,
                lower: true
            }));
        }
    });
}

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;

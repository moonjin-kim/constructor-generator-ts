// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "constructor-genrator-ts" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('constructor-genrator-ts', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello from constructor-genrator-ts!');

		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // 에디터가 켜지지 않았을 때
		}
		
		let selection = editor.selection;
		let text = editor.document.getText(selection); //드래그된 문장

		if (text.length < 1) {
			vscode.window.showErrorMessage('No selected properties.');
			return;
		}
		
		try {
			let constructorCode = createConstructor(text);

			editor.edit(
                edit => editor?.selections.forEach(
                  selection => 
                  {
                    edit.insert(selection.end, constructorCode);
                  }
                )
              );

			  vscode.commands.executeCommand('editor.action.formatSelection');
		} catch (err) { 
			console.log(err);
            vscode.window.showErrorMessage('Something went wrong! Try that the properties are in this format: "private String name;"');
        }
	});

	context.subscriptions.push(disposable);
}

function toPascalCase(str: string) 
{
    return str.replace(/\w+/g,w => w[0].toUpperCase() + w.slice(1));
}


export function createConstructor(text: string) {
	let properties = text.split(/\r?\n/).filter(x => x.length > 2).map(x => x.replace(';', ''));

	let generatedParamCode = ``;
	let generatedAddFiledCode = ``;

	for (let p of properties) {
        while (p.startsWith(" ")) {
			p = p.substr(1);
		}
        while (p.startsWith("\t")) {
			p = p.substr(1);
		}

        let words = p.split(" ").map(x => x.replace(/\r?\n/, ''));
        let type, attribute, Attribute = "";
        let create = false;
        
        // if words == ["private", "String", "name"];
        if (words.length > 2) {
            type = words[1];
            attribute = words[2];
            Attribute = toPascalCase(words[2]);

            create = true;
        }
        // if words == ["String", "name"];
        else if (words.length === 2) {
            type = words[0];
            attribute = words[1];
            Attribute = toPascalCase(words[1]);
            
            create = true;            
        }
        // if words == ["name"];
        else if (words.length) {
            type = "Object";
            attribute = words[0];
            Attribute = toPascalCase(words[0]);
            
            create = true;            
        }

        if (create) {

            let paramCode = `\t ${Attribute}: type\n`;
			let functionCode = `\t this.${Attribute} = ${Attribute};\n`;

            generatedParamCode += paramCode;
			generatedAddFiledCode + functionCode;
        }
    }

	const generatedCode = `constructor(\n${generatedParamCode}\n) {\n${generatedAddFiledCode}}`;

	return generatedCode;
}

// class test {
// 	public abs: string | undefined;
// 	public abc: string | undefined;
// 	public abt: string | undefined;

// 	constructor

// 	public abs: getString() {
// 	return this.string;
// }

// 	public void setString(abs: string) {
// 	this.string = string;
// }

// 	public abc: getString() {
// 	return this.string;
// }

// 	public void setString(abc: string) {
// 	this.string = string;
// }

// 	public abt: getString() {
// 	return this.string;
// }

// 	public void setString(abt: string) {
// 	this.string = string;
// }


// }

// This method is called when your extension is deactivated
export function deactivate() {}

exports.activate = activate;
exports.deactivate = deactivate;

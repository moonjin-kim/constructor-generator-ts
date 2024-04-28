/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.createConstructor = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(__webpack_require__(1));
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "constructor-genrator-ts" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('constructor-genrator-ts.start', () => {
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
            editor.edit(edit => editor?.selections.forEach(selection => {
                edit.insert(selection.end, constructorCode);
            }));
            vscode.commands.executeCommand('editor.action.formatSelection');
        }
        catch (err) {
            console.log(err);
            vscode.window.showErrorMessage('Something went wrong! Try that the properties are in this format: "private String name;"');
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function toPascalCase(str) {
    return str.replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1));
}
function removeAnotation(text) {
    text = text.replace(/@\w+\([^)]*\)\s*|\@\w+\s*/g, '');
    // text = text.replace(/@\w+\({[\s\S]*?\}\)\s*/g, '');
    return text;
}
function createConstructor(text) {
    text = removeAnotation(text);
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
            type = words[2];
            attribute = words[1].replace(':', ' ');
            Attribute = toPascalCase(words[1]);
            create = true;
        }
        // if words == ["String", "name"];
        else if (words.length === 2) {
            type = words[1];
            attribute = words[0].replace(':', ' ');
            Attribute = toPascalCase(words[0]);
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
            let paramCode = `\t\t${attribute}: ${type},\n`;
            let functionCode = `\t this.${attribute} = ${attribute};\n`;
            generatedParamCode += paramCode;
            generatedAddFiledCode += functionCode;
        }
    }
    const generatedCode = `\n\n\tconstructor(\n${generatedParamCode}) {\n${generatedAddFiledCode}}`;
    return generatedCode;
}
exports.createConstructor = createConstructor;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
module.exports = {
    activate,
    deactivate,
};


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map
'use babel';

import QichatView from './qichat-view';
import Linter from './linter';
import { CompositeDisposable } from 'atom';

export default {

  qichatView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.qichatView = new QichatView(state.qichatViewState);
    this.subscriptions = new CompositeDisposable();
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.qichatView.destroy();
  },

  serialize() {
    return {
      qichatViewState: this.qichatView.serialize()
    };
  },

  provideLinter() {
    return {
      name: 'linter-qichat',
      scope: 'file', // or 'project'
      lintsOnChange: false, // or true
      grammarScopes: ['source.qichat'],
      lint(textEditor) {
        return new Promise(function(resolve) {
          var linter = new Linter()
          linter.lint(textEditor)

          console.log(linter.messages)
          resolve(linter.messages)
        })
      }
    }
  },

};

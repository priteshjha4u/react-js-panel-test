import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { jsPanel } from 'jspanel4';
import '../node_modules/jspanel4/dist/jspanel.min.css';
import DisplayName from './components/DisplayName';
import Countries from './components/countries';
import TodoApp from './components/Todo/TodoApp';

class App extends Component {
  constructor() {
    super();
    this.state = {
      panels: []
    };
  }

  createJsPanel = e => {
    const app = this;
    jsPanel.create({
      theme: 'primary',
      headerTitle: e.target.id.split('|')[0].trim(),
      position: 'center-top 0 58',
      contentSize: '600 500',
      content: function() {
        const div = document.createElement('div');
        const action = e.target.id.split('|')[1].trim();
        const newId = this.id + 'prit';

        div.id = newId;
        this.content.append(div);
        const node = document.getElementById(newId);

        if (action === 'DisplayName') {
          ReactDOM.render(<DisplayName name="Pritesh Jha" />, node);
        }
        if (action === 'Countries') {
          ReactDOM.render(<Countries />, node);
        }
        if (action === 'TodoApp') {
          ReactDOM.render(<TodoApp />, node);
        }
      },
      callback: function() {
        this.content.style.padding = '20px';
        app.setState({ panels: [...app.state.panels, this.id] });
      },
      onclosed: function() {
        const appPanels = app.state.panels.slice(0);
        const index = appPanels.indexOf(this.id);
        if (index > -1) {
          appPanels.splice(index, 1);
          app.setState({ panels: appPanels });
        }
      }
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <hr />
        <button className="btn btn-primary" onClick={this.createJsPanel} id="Display Name|DisplayName">
          Display Name
        </button>
        <button className="btn btn-primary" onClick={this.createJsPanel} id="Countries List|Countries" style={{ marginLeft: '10px' }}>
          Countries list
        </button>
        <button className="btn btn-primary" onClick={this.createJsPanel} id="Todo List|TodoApp" style={{ marginLeft: '10px' }}>
          Todo List
        </button>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import ls from '../../services/lshelper';
import TodoListItem from './TodoListItem';
import TodoForm from './TodoForm';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadTodos = this.loadTodos.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  componentDidMount() {
    this.loadTodos();
  }

  loadTodos() {
    this.setState({ data: ls.getTodos() });
  }

  handleFormSubmit(d) {
    let r = ls.saveTodo(d);
    if (r.saved) {
      this.loadTodos();
    } else {
      console.error('Error: ' + r.err.message);
    }
  }

  updateTodo(id, du, name = '') {
    let x = false,
      d = this.state.data;
    d.forEach((val, index) => {
      val.id === id && (x = index);
      val.id === id && du && (!name ? (val.done = 'true') : (val.text = name));
    });
    du && (this.setState({ data: d }), ls.saveTodo(d, true));
    x >= 0 && !du && d.splice(x, 1) && (this.setState({ data: d }), ls.saveTodo(d, true));
  }

  render() {
    if (!ls.localStorageExists) {
      return <div className="alert alert-danger">Your browser do not support Local Storage. Please use any modern browser.</div>;
    }
    let todoList = this.state.data.map((t, i) => {
      return <TodoListItem data={t} clickHandler={this.updateTodo} key={t.id} hash={i + 1} />;
    });
    let noItems = !this.state.data.length ? <div className="alert alert-info">Your task list is empty.</div> : null;
    let taskDone = (() => {
      let d = this.state.data.filter(o => o.done === 'true');
      return d.length ? <span>, Done : {d.length}</span> : null;
    })();
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">
            Todo App{' '}
            <span className="float-right">
              Total Task: {this.state.data.length}
              {taskDone}
            </span>
          </h5>
        </div>
        <div className="card-body">
          {noItems}
          <ul className="list-group">{todoList}</ul>
        </div>
        <div className="card-footer" style={{ textAlign: 'center' }}>
          <TodoForm formsubmit={this.handleFormSubmit} />
        </div>
      </div>
    );
  }
}

export default TodoApp;

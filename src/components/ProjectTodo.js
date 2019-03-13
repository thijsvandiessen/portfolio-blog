import React, { Component } from 'react';
import GradientHeader from './GradientHeader';

class ProjectTodo extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tasks: [],
      currentItem: null,
      value: '',
    };

    // This binding is necessary to make `this` work in the callback
    this.handleTask = this.handleTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.crossItem = this.crossItem.bind(this);

  }

  componentDidMount() {

    if (localStorage.tasks) {
      this.setState({
        tasks: JSON.parse(localStorage.getItem("tasks"))
      })
    }
  }

  storeTasks() {

    if (this.state.tasks.length === 0) {
      localStorage.clear()
    }

    else if (this.state.tasks.length > 0) {
      // store todo list
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));

    }

  }


  addTask(event) {
    event.preventDefault();

    // if empty
    if (!this.state.currentItem) return;

    this.setState(prevState => ({
      tasks: [...prevState.tasks, this.state.currentItem],
      currentItem: null,
      value: '',
    }), () => this.storeTasks())

  }

  handleTask(event) {

    // store extra metadata too
    this.setState({
      value: event.target.value,
      currentItem: {
        text: event.target.value,
        date: new Date(),
        checked: false,
      }
    });

  };

  deleteTask(idx){

    // make a separate copy of the array
    const tasks = [...this.state.tasks];

    // remove the task
    tasks.splice(idx, 1);

    // update state
    this.setState({tasks: tasks},
    () => this.storeTasks());

  }

  crossItem(idx){

    // make a separate copy of the array
    const tasks = [...this.state.tasks];

    // inverse checked status
    tasks[idx].checked = !tasks[idx].checked;

    // update state
    this.setState({tasks: tasks},
    () => this.storeTasks());

  }


  render() {

    const heading = {
      title: 'My to do app',
      subTitle: 'What happends when I want to create a to do app with React?',
    };

    return(
      <main>
        <GradientHeader heading={heading} />

        <section className="content-container">

          <h2>Tasks</h2>

          <ul className="todoList">
            {this.state.tasks.map((item,idx) => (
              <li key={idx}>
                <span
                  className={item.checked ? 'checked' : 'unchecked'}
                  onClick={() => this.crossItem(idx)}
                >
                  {item.text}
                </span>
                <span onClick={() => this.deleteTask(idx)}>x </span>
              </li>
            ))}
          </ul>

          <form onSubmit={this.addTask}>
            <label htmlFor="addTask">Add a task</label>
            <input
              placeholder="Write a task"
              name="addTask"
              onChange={this.handleTask}
              value={this.state.value}
            />
            <button className="button" type="submit">Add Task</button>
          </form>

        </section>

      </main>
    );

  };
};

export default ProjectTodo;

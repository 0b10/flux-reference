import React, { Component } from "react";
import todoStore from "../stores/todos";
import * as todoActions from "../actions/todos";

// ! Use the store as the single source of truth, in place of this.state
// ! Make event handlers call actions
// ! Subscribe to change events from the store, make it re-render

export class Todo extends Component {
  constructor(props) {
    super(props);
    this.textFieldValue = ""; // Just for clarity

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // >>> LIFECYCLE METHODS >>>
  componentWillMount() {
    // ! This event will cause a re-render
    // ! Avoid setState() so that there's only a single source of truth - the store
    // ! Using forceUpdate means that render() gets the state from the store when this event fires.
    todoStore.on("change", () => this.forceUpdate());
  }

  // >>> EVENT HANDLERS >>>
  handleSubmit(event) {
    event.preventDefault();
    if (this.textFieldValue) {
      // Don't add empty values
      // ! Use the provided actions
      todoActions.createTodo(this.textFieldValue);
    }
  }

  handleChange(event) {
    // Avoid re-reders onChange, so don't use this.state
    this.textFieldValue = event.target.value;
  }

  // >>> VIEW >>>
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} />
          <input type="submit" value="Add" />
        </form>
        <ul>
          {// ! Use the state from the store directly. Also see deleteTodo() action bound below
          todoStore.todos.map(({ id, text }) => (
            <div
              key={id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "300px"
              }}
            >
              <li>{text}</li>
              <button onClick={() => todoActions.deleteTodo(id)}>Del</button>
            </div>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

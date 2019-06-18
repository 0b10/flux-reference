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
    this.handleDelete = this.handleDelete.bind(this);
  }

  // >>> LIFECYCLE METHODS >>>
  componentWillMount() {
    todoStore.on("change", () => {
      // ! This event will cause a re-render
      this.forceUpdate(); // ! Avoid setState() so that there's only a single source of truth - the store
    });
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

  handleDelete(id) {
    // ! Use the provided actions
    todoActions.deleteTodo(id);
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
          {// ! Use the state from the store directly
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
              <button onClick={() => this.handleDelete(id)}>Del</button>
            </div>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

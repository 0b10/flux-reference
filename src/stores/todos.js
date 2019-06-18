import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

// ! Use EventEmitter so components can subscribe to changes
class TodoStore extends EventEmitter {
  constructor() {
    super();
    this._todos = [
      { id: 1726387133728, text: "one" },
      { id: 1726382342398, text: "two" },
      { id: 1726321361273, text: "three" }
    ];
    this.handleAction = this.handleAction.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  get todos() {
    return this._todos;
  }

  createTodo(text) {
    // ! Modify state
    const id = Date.now();
    this._todos.push({
      id,
      text
    });
    this.emit("change"); // ! Don't forget to emit events for your components
  }

  deleteTodo(targetId) {
    // ! Modify state
    const newTodos = this._todos.filter(({ id }) => id !== targetId);
    this._todos = newTodos;
    this.emit("change"); // ! Don't forget to emit events for your components
  }

  handleAction(action) {
    // ! This method is registered with the dispatcher
    // ! Dispatch calls to your own methods from here, this is the point of entry for the dispatcher
    // ! Filter out action types, because all messages are dispatched to all listeners.
    switch (action.type) {
      case "CREATE_TODO":
        this.createTodo(action.text);
        break;
      case "DELETE_TODO":
        this.deleteTodo(action.id);
        break;
      default: // Do nothing.
    }
  }
}

const todoStore = new TodoStore();
dispatcher.register(todoStore.handleAction); // ! Register with the dispatcher like this.
window.todoStore = todoStore; // You can execute this instance from the browser's window object now.
export default todoStore;

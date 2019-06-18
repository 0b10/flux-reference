import dispatcher from "../dispatcher";

// ! Send messages to the provided dispatcher.
// ! These objects have arbitrary values, but convention is type, or actionType
// ! 'type' is used within the store to filter out dispatched actions. All actions are sent
// !   to all listeners

export function createTodo(text) {
  dispatcher.dispatch({
    type: "CREATE_TODO",
    text
  });
}

export function deleteTodo(id) {
  dispatcher.dispatch({
    type: "DELETE_TODO",
    id
  });
}

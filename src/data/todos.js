const { default: Todo } = require("./todo");

class Todos {
	static LOCAL_STORAGE_KEY = "To-Do";

	/**
	 * @type {Todo[]}
	 */
	static todos = [];

	// only called when first time loading the page
	static loadTodos() {
		Todos.todos = JSON.parse(localStorage.getItem(Todos.LOCAL_STORAGE_KEY)) ?? []
		return Todos.getTodos()
	}

	static getTodos() {
		return Todos.todos.slice()
	}

	static saveTodos() {
		localStorage.setItem(Todos.LOCAL_STORAGE_KEY, JSON.stringify(Todos.todos));
	}

	static addTodo(todo) {
		Todos.todos.push(todo);
		Todos.saveTodos();
		//Todos.renderTodos();
	}

	static deleteTodoById(todoId) {
		//console.time('deleteTodoById');
		Todos.todos = Todos.todos.filter(({ id: id1 }) => id1 !== todoId);
		Todos.saveTodos();
		//Todos.renderTodos();
		//console.timeEnd('deleteTodoById');
	}

	/**
	 * @param {string} todoId
	 */
	static updateTodoById(todoId, { task, completionState }) {
		const todo = Todos.getItemById(todoId)
		Object.assign(todo, { task: task || todo.task, completionState: completionState || todo.completionState });
		if (completionState) {
			Todos.deleteTodoById(todoId);
			Todos.addTodo(todo);
		}
		Todos.saveTodos()
	}

	static getItemById(id) {
		return Todos.todos.find(({ id: todoId }) => todoId === id);
	}

	static setTodoStateById(id, state) {
		const todo = Todos.getItemById(id);
		todo.completionState = Todos.isValidState(state)
			? state
			: todo.completionState;
		Todos.saveTodos();
	}

	static isValidState(state) {
		return [Todo.STATE_FINISHED, Todo.STATE_ON_PROGRESS, Todo.STATE_WAITING].includes(
			state
		);
	}
}

export default Todos;
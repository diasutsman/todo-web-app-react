import Todo from "data/todo";
import Todos from "data/todos";
import React from "react";
import '../styles.css';
import Trash from "./Trash";
import TodoList from "./TodoList";

class TodoComponent extends React.Component {
    /**
     * @param {any} props
     */
    constructor(props) {
        super(props);
        this.state = {
            todoList: Todos.loadTodos()
        }
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleEditItem = this.handleEditItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    handleAddItem(/** @type {Todo} */ todo) {
        Todos.addTodo(todo)
        this.setState({
            todoList: [...this.state.todoList, todo]
        })
    }

    /**
     * @param {string} id
     */
    handleEditItem(id, { task, completionState }) {
        Todos.updateTodoById(id, { task, completionState })
        this.setState({
            todoList: Todos.loadTodos()
        })
    }

    /**
     * @param {string} id
     */
    handleDeleteItem(id) {
        Todos.deleteTodoById(id)
        this.setState({
            todoList: this.state.todoList.filter(todo => todo.id !== id)
        })
    }

    render() {
        return (
            <div className="todo" >
                <h1 className="page-title">Save Your Ideas in a Click !</h1>
                <div className="page-desc">Simply Manage All Your 'To-Do' Activities in One Page.</div>
                <div className="todo-container">

                    <TodoList type={Todo.STATE_WAITING} list={this.state.todoList.filter(todo => todo.completionState === Todo.STATE_WAITING)} onAddItem={this.handleAddItem} onEditItem={this.handleEditItem} onDeleteItem={this.handleDeleteItem} />

                    <TodoList type={Todo.STATE_ON_PROGRESS} list={this.state.todoList.filter(todo => todo.completionState === Todo.STATE_ON_PROGRESS)} onAddItem={this.handleAddItem} onEditItem={this.handleEditItem} onDeleteItem={this.handleDeleteItem} />

                    <TodoList type={Todo.STATE_FINISHED} list={this.state.todoList.filter(todo => todo.completionState === Todo.STATE_FINISHED)} onAddItem={this.handleAddItem} onEditItem={this.handleEditItem} onDeleteItem={this.handleDeleteItem} />

                    <Trash />
                </div>
            </div>
        );
    }

}
export default TodoComponent;
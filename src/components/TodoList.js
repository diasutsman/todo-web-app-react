import Todo from "data/todo";
import Todos from "data/todos";
import React from "react";
import TodoItem from "./TodoItem";

class TodoList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAdding: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleCancelAdding = this.handleCancelAdding.bind(this)
        this.handleDrop = this.handleDrop.bind(this)
        this.allowDrop = this.allowDrop.bind(this)
    }

    handleClick() {
        this.setState({
            isAdding: true
        })
    }

    handleDrop(ev) {
        ev.preventDefault();
        console.log(ev.dataTransfer.getData("id"))
        const todo = Todos.getItemById(ev.dataTransfer.getData("id"));
        this.props.onEditItem(todo.id, {task: todo.task, completionState: this.props.type})
    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    handleCancelAdding() {
        this.setState({ isAdding: false })
    }

    render() {
        return (
            <div className={"todo-list " + this.props.type} id={this.props.type} onDrop={this.handleDrop} onDragOver={this.allowDrop}>
                <h2 className={"category category-" + this.props.type}>{{ [Todo.STATE_WAITING]: 'Waiting', [Todo.STATE_ON_PROGRESS]: 'On Progress', [Todo.STATE_FINISHED]: 'Finished' }[this.props.type]}</h2>

                {this.props.list.map((/** @type {Todo} */ todo) => <TodoItem type={Todo.STATE_WAITING} key={todo.id} id={todo.id} task={todo.task} onEditItem={this.props.onEditItem} onDeleteItem={this.props.onDeleteItem} />)}

                {this.state.isAdding ? <TodoItem type={this.props.type} onAddItem={todo => {
                    this.setState({ isAdding: false })
                    this.props.onAddItem(todo)
                }} onCancelAdding={this.handleCancelAdding} /> : undefined}

                <div className="add-todo" onClick={() => this.handleClick()}>
                    <button className="add-todo-btn">+</button>
                    <p className="add-todo-txt">New</p>
                </div>
            </div>
        )
    }
}
export default TodoList;
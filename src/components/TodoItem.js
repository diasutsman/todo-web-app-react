import Todo from "data/todo";
import React, { useState } from "react";

class TodoItem extends React.Component {

    inputRef = React.createRef()
    menu = React.createRef()

    constructor(props) {
        super(props)
        this.state = {
            isShown: false,
            inputValue: this.props.task
        }
        this.handleDrag = this.handleDrag.bind(this)

    }

    handleBlur(e) {
        if (this.props.onAddItem && e.target.value) {
            this.props.onAddItem(new Todo(e.target.value, this.props.type));
        } else if (this.props.id) {
            this.props.onEditItem(this.props.id, { task: e.target.value });
        } else {
            this.props.onCancelAdding();
        }
    }

    handleClickOutside = event => {
        if (
            this.menu.current &&
            !this.menu.current.contains(event.target)
        ) {
            this.setState({
                isShown: false,
            });
        }
    }

    handleDrag(ev) {
        ev.dataTransfer.setData("id", this.props.id);
    }

    render() {
        return (
            <div className="todo-item" id={this.props.id} onDrag={this.handleDrag} draggable={Boolean(!this.props.onAddItem)} style={{ cursor: 'text' }}>
                <input className="todo-title" ref={this.inputRef} onKeyUp={(e) => e.key === 'Enter' ? this.inputRef.current.blur() : null} onChange={(e) => this.setState({ inputValue: e.target.value })} autoFocus={Boolean(this.props.onAddItem)} onBlur={e => this.handleBlur(e)} value={this.state.inputValue} />
                <i className="material-icons menu-todo" onClick={() => {
                    this.setState({ isShown: true })
                }}>menu</i>
                <div className="menu" ref={this.menu} onClick={() => this.setState({ isShown: false })} style={this.state.isShown ? { display: 'flex' } : {}}>
                    <div className="menu-edit" onClick={() => this.inputRef.current.focus()}>
                        <span>Edit</span>
                        <i className="material-icons edit-todo">edit</i>
                    </div>
                    <div className="menu-move" onClick={(e) => e.stopPropagation()}>
                        <span>Move to ...</span>
                        <i className="material-icons move-todo">arrow_forward_ios</i>
                        <div className="move">
                            <span className="waiting-move" onClick={() => { this.props.onEditItem(this.props.id, { completionState: Todo.STATE_WAITING }) }}>Waiting</span>
                            <span className="on-progress-move" onClick={() => this.props.onEditItem(this.props.id, { completionState: Todo.STATE_ON_PROGRESS })}>On Progress</span>
                            <span className="finished-move" onClick={() => this.props.onEditItem(this.props.id, { completionState: Todo.STATE_FINISHED })}>Finished</span>
                        </div>
                    </div>
                    <div className="menu-delete" onClick={() => this.props.onDeleteItem(this.props.id)}>
                        <span>Delete</span>
                        <i className="material-icons delete-todo">delete</i>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside, { capture: true });
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside, { capture: true });
    }
}

export default TodoItem;
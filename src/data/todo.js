class Todo {
    static STATE_WAITING = 'waiting';
    static STATE_ON_PROGRESS = 'on-progress';
    static STATE_FINISHED = 'finished';

    /**
     * @param {String} task
     * @param {any} completionState
     */
    constructor(task, completionState) {
        this.id = Date.now().toString(16);
        this.task = task
        this.completionState = completionState
    }
}

export default Todo
import React from "react";

class Trash extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="trash">
                <h3>Trash</h3>
                <i className="material-icons trash-icon">delete</i>
            </div>
        )
    }
}
export default Trash;
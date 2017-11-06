import React, { Component } from 'react';
import './Repo.css';

class App extends Component {

    render() {
        return (
            <div className="Repo">
                { this.props.repo.name }
            </div>
        );
    }
}

export default App;

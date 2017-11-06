import React, { Component } from 'react';
import './Repo.css';
import moment from 'moment';

class App extends Component {

    render() {
        let trans = "rotate("+(Math.random()*15-7.5)+"deg)";
        console.log(trans);
        let style = { "transform": trans };
        return (
            <div className="Repo" style={ style }>
                <span className="title">{ this.props.repo.name }</span>
                <div className="double">
                    Updated: { moment(this.props.repo.updated_at).fromNow() }
                </div>
                <div className="double">
                    Pushed: { moment(this.props.repo.pushed_at).fromNow() }
                </div>
                <div>
                    S: { this.props.repo.stargazers_count }
                </div>
                <div>
                    W: { this.props.repo.watchers_count }
                </div>
            </div>
        );
    }
}

export default App;

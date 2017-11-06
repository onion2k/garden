import React, { Component } from 'react';
import './App.css';
import Repo from './components/Repo';

const baseURL = 'https://api.github.com';

//Replace this with redux-saga
function cacheFetch(url, force) {

    var qualifiedUrl = baseURL+url;

    const cached = localStorage.getItem(qualifiedUrl);

    if (cached && !force) {
        console.log("Using cache");
        return Promise.resolve(JSON.parse(cached));
    }

    return fetch(qualifiedUrl).then((response)=>{
        let r = { headers: {}, body: {} };
        response.headers.forEach((value, key)=>{
            r.headers[key] = value;
        });
        r.body = response.json();
        return Promise.resolve(r);
    }).then((response)=>{
        return response.body.then((result)=>{
            response.body = result;
            localStorage.setItem(qualifiedUrl, JSON.stringify(response));
            return response;
        });
    }).then((result)=>{
        return result;
    });

}

class App extends Component {

    constructor(){
        super();
        this.state = { repos: [] };
    }

    componentWillMount(){

        cacheFetch('/users/onion2k/repos', false)
            .then((result)=>{
                this.setState({ repos: result.body });
                console.log(result);
            })
            .catch((error)=>{
                console.log(error);
            });

        cacheFetch('/repos/onion2k/advent/commits', false)
            .then((result)=>{
                console.log(result);
            })
            .catch((error)=>{
                console.log(error);
            });
        
    }
    render() {
        let repos = this.state.repos.map((repo)=>{
            return <Repo key={ repo.id } repo={ repo } />
        });
        return (
            <div className="App">
                { repos }
            </div>
        );
    }
}

export default App;

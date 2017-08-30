import React, { Component } from 'react';
import './App.css';

const baseURL = 'https://api.github.com';
//axios.defaults.headers.common['Accept'] = 'application/vnd.github.v3+json';
//axios.defaults.headers.common['User-Agent'] = 'onion2k-garden';
//axios.defaults.headers.common['Authorization'] = 'token ';

function cacheFetch(url, force) {

  var qualifiedUrl = baseURL+url;

  const cached = localStorage.getItem(qualifiedUrl);

  if (cached && !force) {
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

    cacheFetch('/repos/onion2k/soundboard/commits', false)
      .then((result)=>{
        console.log(result);
      })
      .catch((error)=>{
        console.log(error);
      });
    
  }
  render() {
    let repo = this.state.repos.map((repo)=>{
      return <div key={repo.id}>{repo.name}</div>
    });
    return (
      <div className="App">
        Git Garden V0
        <div>{ repo }</div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';

const baseURL = 'https://api.github.com';
//axios.defaults.headers.common['Accept'] = 'application/vnd.github.v3+json';
//axios.defaults.headers.common['User-Agent'] = 'onion2k-garden';
//axios.defaults.headers.common['Authorization'] = 'token ';

function cacheFetch(url) {

  var qualifiedUrl = baseURL+url;

  const cached = localStorage.getItem(qualifiedUrl);
  if (cached) {
    return Promise.resolve(JSON.parse(cached));
  }

  return fetch(qualifiedUrl).then((response)=>{
    return response.json();
  }).then((response)=>{
    localStorage.setItem(qualifiedUrl, JSON.stringify(response));
    return response;
  });

}

class App extends Component {

  componentWillMount(){

    cacheFetch('/users/onion2k/repos')
      .then((result)=>{
        console.log(result);
      })
      .catch((error)=>{
        console.log(error);
      });

    cacheFetch('/repos/onion2k/soundboard/commits')
      .then((result)=>{
        console.log(result);
      })
      .catch((error)=>{
        console.log(error);
      });
    
  }
  render() {
    return (
      <div className="App">
        Git Garden V0
      </div>
    );
  }
}

export default App;

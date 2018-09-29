import React, { Component } from 'react';
import Header from './components/Header';
import Form from './components/Form';

import './App.css';
import List from './components/List';
import { githubApi } from './services/github-service';

class App extends Component {
  state = {
    list: [],
    status: 'loaded'
  }
  
  handleSubmit = (value) => {
    console.log(value);
    this.setState({
      status: 'loading'
    })
      githubApi.getUsers(value)
      .then(({ data }) => {
        this.setState({
          list: data.items,
          status: 'loaded',
        })
      }). catch((err)=>{
        this.state({
          status: 'error',
        })
      })
  }

  renderStatus = () => {
    const {status} = this.state;
    switch (status) {
      case 'loaded':
        return <List list={(this.state.list)}/>
        break;
      case 'loading':
        return 'loading...'
        break;
      case 'error':
        return (<div>error de consexón!!</div>)
        break;
      default:
        return null;
        break;
    }
  }

  render() {
    return (
      <div className="container">
        <Header >Github Search</Header>
        <Form onSubmit={this.handleSubmit}/>
        {this.renderStatus()}
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { PersonTable } from './PersonTable';
import SearchBox from './SearchBox';
import { teams } from './teams';
import 'font-awesome/css/font-awesome.min.css';


class App extends Component {
  constructor() {
    super()
    this.state = {
      teams: [],
      searchfield: ''
    }
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  componentDidMount() {
    console.warn('mount');
    setTimeout(() => {
      console.warn('loaded');
      this.setState({
        teams:teams,
      })
    },2000);
    
  }

  render(){
    const filterPerson = this.state.teams.filter(team =>{
      return team.firstName.toLowerCase().includes(this.state.searchfield.toLowerCase()) ||
      team.lastName.toLowerCase().includes(this.state.searchfield.toLowerCase())
    })
    return (
      <div className='tc'>
        <h1>Teams Networking</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <PersonTable teams={filterPerson} />
      </div>
    );
  }
 
}

export default App;

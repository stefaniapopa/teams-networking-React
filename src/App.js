import React, { Component } from 'react';
import { PersonTable } from './PersonTable';
import SearchBox from './SearchBox';
import 'font-awesome/css/font-awesome.min.css';
import { connect } from 'react-redux';


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
    this.load();
  }

  load() {
   
  }

  add(team) {
    console.warn("value", team)
    document.getElementById('main-form').reset();

    fetch("http://localhost:3000/teams-json/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(team)
    })
      .then(res => res.json())
      .then(r => {
        console.warn(r);
        if (r.success) {
          const teams = this.state.teams.concat(team);
          this.setState({
            teams
          });
          //this.load();
        }
      });
  }

  remove(id) {
    fetch("http://localhost:3000/teams-json/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })
      .then(r => r.json())
      .then(status => {
        this.load();
      })
  }

  render() {
    return (
      <div className='tc'>
        <h1>Teams Networking</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <PersonTable
          teams={this.props.teams}
          onSubmit={team => {
            this.add(team);
          }}
          onDelete={id => {
            this.remove(id);
          }}
        />
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    teams: state.teams
  }
};

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;

import React, { Component } from 'react';
import { PersonTable } from './PersonTable';
import SearchBox from './SearchBox';
import 'font-awesome/css/font-awesome.min.css';
import { connect } from 'react-redux';


class App extends Component {
  constructor(props) {
    super(props);
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
        if (r.success) {
          team.id = r.id;
          this.props.dispatch({
            type: 'TEAM_ADDED',
            team
          })
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

const mapStateToProps = state => ({
    teams: state.teams
});

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;

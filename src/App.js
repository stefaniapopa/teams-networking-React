import React, { Component } from 'react';
import { PersonTable } from './PersonTable';
import SearchBox from './SearchBox';
import 'font-awesome/css/font-awesome.min.css';
import { connect } from 'react-redux';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          this.props.onAdd(team);
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
        this.props.onDelete(id);
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

const mapDispatchToProps = dispatch => ({
  onAdd: team => dispatch({type: 'TEAM_ADDED',team}),
  onDelete: id => dispatch({type: 'TEAM_REMOVED',id})
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;

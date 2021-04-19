import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css'
import reportWebVitals from './reportWebVitals';
import 'tachyons';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const rootReducer = (state = { filter: '', teams:[]}, action) => {
  console.warn('rootReducer', state, action);
  switch(action.type){
    case 'TEAMS_LOADED': {
      return { 
        ...state,
        teams: action.teams 
      }
    } 
    case 'TEAM_ADDED': {
      return { 
        ...state,
        teams: [...state.teams, action.team]
      }
    }
    case 'TEAM_REMOVED': {
      return { 
        ...state,
        teams: state.teams.filter(team => team.id != action.id)
      }
    }  
    default:
      return state;
  }
};

const store = createStore(rootReducer);

store.subscribe( () => {
   console.warn('data changed', store.getState());
})

store.dispatch({type: 'TEAMS_LOADED', teams: [1,2,3]});

function load() {
  fetch("http://localhost:3000/teams-json")
    .then(res => res.json())
    .then(teams => {
      store.dispatch({type: 'TEAMS_LOADED', teams});
    });
}
load();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

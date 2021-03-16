import React from 'react';
import { PersonTable } from './PersonTable';

let teams = 
    [
        {
            "id": "a123",
            "firstName": "Stefania",
            "lastName": "Popa",
            "gitHub": "stefaniapopa"
        }, 
        {
            "id":"b564",
            "firstName":"Florin",
            "lastName":"Popa",
            "gitHub":"Florin2210"
         },
        {
            "id":"c958",
            "firstName":"Iustin",
            "lastName":"Popa",
            "gitHub":"justinpopa20"
        }
    ];

function App() {
  return (
    <div>
      <h1>Teams Networking</h1>
      <div>Search</div>
      <PersonTable teams={teams} />
    </div>
  );
}

export default App;

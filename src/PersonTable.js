import React from 'react';
import { teams } from './teams';


function getValue() {
    const firstName = document.querySelector('#list input[name=firstName]').value;
    const lastName = document.querySelector('input[name=lastName]').value;
    const gitHub = document.querySelector('input[name=gitHub]').value;

    const person = {
        firstName,
        lastName,
        gitHub
    };
    return person;
}

export const PersonTable = ({teams, onSubmit, onDelete}) => (
    <form id='main-form' onSubmit={e => {
        e.preventDefault();
        const values = getValue();
        onSubmit(values);
    }}>
        <table id='list' >
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Links</th>
                <th> </th>
            </tr>
        </thead>
        <tbody>
            {teams.map((person, i) => (
            <tr key={i}>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td>
                <a target="_blank" href={`https://github.com/${person.gitHub}`} className="fa fa-github" aria-hidden="true"> </a>
            </td>
            <td>
            <a href="#" className="delete-row" onClick={ e => { onDelete(person.id);} }>&#10006;</a>
            <a href="#" className="edit-row" data-id={`${person.id}`}>&#9998;</a>
            </td>
            </tr>
           ))}
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <input type="text" placeholder="First Name" required name="firstName" />
                </td>
                <td>
                    <input type="text" placeholder="Last Name" required name="lastName" />
                </td>
                <td>
                    <input type="text" placeholder="GitHub account" required name="gitHub" />
                </td>
                <td>
                    <button type='submit'>Save</button>
                </td>
            </tr>
        </tfoot>
    </table>
    </form>
);

export default PersonTable;
import React from 'react';
import { connect } from 'react-redux';

const Filter = ({onFilter}) =>(
    <input
        type='search'
        placeholder='Search...'
        style={{ borderRadius: '130px'}}
        onInput={e => { onFilter(e.target.value.toLowerCase()) }}
    />
)

const mapStateToProps = state => ({
    teams: state.teams
});

const mapDispatchToProps = dispatch => ({
    onFilter: filter => dispatch({ type: 'FILTER_CHANGED', filter })
});

export const FilterContainer = connect(mapStateToProps, mapDispatchToProps)(Filter);
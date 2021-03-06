import React, { useEffect } from 'react';
import ListRow from '../ListRow/ListRow.js';
import './List.css';
import fetchMore from '../../fetchDataAction/fetchMoreResturants';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getResturants } from '../../reducers/fetchResturantsReducer';
/*
    Renders a List like component with expandable rows.

    Props:
    {listRawData} = A list of object with raw data (needs formatting)
        each element of the array will be displayed as a row.
    {saveReview} = Syncronises user review with backend

    {listRawData} =(Array) [
        {
            id: "(Int)Unique ID for Business
            name: "(String)Name of the business",
            address: "(String)Adress without postcode"
            postcode: "(String)Postcode"
            city: "(String)City name",
            smileys:"(String)Formatted as each review $date$'-'$resultValue(0-3)$ 
                Each revies is separated by a '.' ",
            numberOfRatings: "(Int)Number of the total ratings ",
            sumStars:"(Int)Sum of all the stars given by the users"
        }, ...
    ]

*/
const List = props => {
  useEffect(() => {
    const table = document.getElementById('Table');

    table.addEventListener('scroll', e => {
      const el = e.target;
      //If the height of the table + the dynamic height of the scrolling cursor
      // is equal to the total scrollable height of the table, bottom is reached and
      // new data must be requested
      if (el.scrollTop + el.clientHeight + 0.5 >= el.scrollHeight) {
        fetchMoreData(table.attributes.url.value);
      }
    });
  }, []);

  function fetchMoreData(url) {
    //Fetches routine with stored query and append fetched data to already stored
    //only if last char of url (String) is not 0 (page 0, just for error preventing)
    if (url.slice(-2) !== '=0') {
      props.fetchMore(url);
    }
  }

  //Logic to expand selected row (Can be used for test)
  function handleExpanedRow(id) {
    if (props.selectedRow === id) return null;
    return id;
  }

  //update selected row to be expanded
  function handleRowClick(id) {
    props.updateSelectedRow(handleExpanedRow(id));
  }

  function saveReview(id, starValue) {
    //logic for comunicating with API
    let body = { id, stars: starValue };
    fetch('https://spisested-advisor-api.herokuapp.com/companies/giverating', {
      method: 'PUT',
      body: JSON.stringify(body),
      mode: 'cors',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      }
    });
  }

  let rows =
    props.listRawData.length === 0 ? (
      <h2 id='placeholderText'>Søkeresultater listes her hvis de finnes</h2>
    ) : (
      props.listRawData.map(row => (
        <ListRow
          key={row._id}
          id={row._id}
          rowData={row}
          handleClick={handleRowClick.bind(this)}
          isExpanded={props.selectedRow === row._id}
          saveReview={saveReview}
        ></ListRow>
      ))
    );
  return (
    <ul id='Table' url={props.query + props.page}>
      {rows}
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    query: state.query,
    page: state.page,
    listRawData: getResturants(state)
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchMore: fetchMore
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(List);

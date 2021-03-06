import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import magnifyingGlass from './mg.svg';
import './Searchbar.css';

import fetchResturants from '../../fetchDataAction/fetchResturants';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const smileyOptions = [
  { value: '0', label: 'Smil' },
  { value: '2', label: 'Nøytral' },
  { value: '3', label: 'Sur' }
];

const sortOptions = [
  { value: 'NAME_AZ', label: 'Navn A-Å' },
  { value: 'NAME_ZA', label: 'Navn Å-A' },
  { value: 'SMILEY_DESC', label: 'Fjes Glad-Sur' },
  { value: 'SMILEY_ASC', label: 'Fjes Sur-Glad' }
];

const animatedComponents = makeAnimated();

const Searchbar = props => {
  const [isExpanded, setExpand] = useState(false);
  const [name, setName] = useState('');
  const [orderBy, setOrder] = useState(sortOptions[0].value);
  const [cities, addCity] = useState([]);
  const [smileys, addSmiley] = useState([]);
  const [cityOptions, updateCityOptions] = useState([]);

  //Magnifying glass svg icon for search button
  const pic = (
    <img
      className='MagnifyingGlass'
      src={magnifyingGlass}
      alt='Magnifying Glass'
    />
  );
  //Load list of cities from server to be used in the city selector component
  useEffect(() => {
    fetch('https://spisested-advisor-api.herokuapp.com/companies/cities', {})
      .then(res => res.json())
      .then(
        result => {
          updateCityOptions(
            result[0].cities.sort().map(city => ({ value: city, label: city }))
          );
        },
        error => {
          console.log(error, 'Error while loading cities from server'); //catch an error and throw a fail message
        }
      );
  }, []);

  //Called on click of the search button
  function handleSearch() {
    //Unselect the selected row by setting the id to null.
    props.updateSelectedRow(null);
    let endpointResturants =
      'https://spisested-advisor-api.herokuapp.com/companies?';
    let endpointLocations =
      'https://spisested-advisor-api.herokuapp.com/companies/locations/?';
    let query =
      'name=' +
      name +
      '&orderby=' +
      orderBy +
      '&cities=' +
      cities +
      '&smileys=' +
      smileys +
      '&page=';
    props.fetchResturants(endpointLocations, query);
    props.fetchResturants(endpointResturants, query, true); // sett newSearch to true, in order to empty result set in store
  }

  //Called when text into textfield navn changes, updates navn state
  function handleTextChange(event) {
    setName(event.target.value);
  }
  //Called when a key is pressed in thetextfield: if the key is enter, handle the search
  function handleTextKeyPress(event) {
    if (event.key === 'Enter') handleSearch();
  }

  //Called when more filters button is clicked, toogles the expand state of the searchbar
  function handleFiltersClick() {
    setExpand(!isExpanded);
    //set cities and smileys filter to default values
    if (isExpanded) {
      addCity([]);
      addSmiley([]);
    }
  }

  //Called when a new order is selected
  function handleSelectOrder(selectedOption) {
    setOrder(selectedOption.value);
  }

  //Called when a new city is selected
  function handleSelectCity(selectedOption) {
    let tmp = '';
    if (selectedOption !== null)
      selectedOption.forEach(element => {
        tmp = tmp + (tmp.length > 0 ? '-' : '') + element.value;
      });
    addCity(tmp);
  }

  //Called when a new smiley filter is selected
  function handleSelectSmiley(selectedOption) {
    let tmp = '';
    if (selectedOption !== null)
      selectedOption.forEach(element => {
        tmp = tmp + (tmp.length > 0 ? '-' : '') + element.value;
        if (element.value === '0') tmp = tmp + '-' + '1';
      });
    addSmiley(tmp);
  }

  let ButtonText = isExpanded ? 'Færre filter' : 'Flere filter';
  let extraFilters = null;
  //If the searchbar is expanded, render the extra filters
  if (isExpanded) {
    extraFilters = (
      <div id='ExtraFilters' className='Grid'>
        <div className='Label' id='CitiesLabel'>
          Filtrer etter byer
        </div>
        <div id='FilterCities' className='Cell'>
          <Select
            id='FilterCitiesbar'
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={cityOptions}
            placeholder='Velg..'
            onChange={handleSelectCity.bind(this)}
          />
        </div>
        <div className='Label' id='SmileysLabel'>
          Filtrer etter fjes
        </div>
        <div id='FilterSmiley' className='Cell'>
          <Select
            id='FilterSmileybar'
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={smileyOptions}
            placeholder='Velg..'
            onChange={handleSelectSmiley.bind(this)}
          />
        </div>
      </div>
    );
  }

  return (
    <div id='Searchbar' className='Grid'>
      <div id='LabelRestaurant' className='Label'>
        Søk etter spisested
      </div>
      <div id='TextRestaurant' className='Cell'>
        <input
          type='text'
          placeholder='Navn'
          name='fname'
          onChange={handleTextChange}
          onKeyPress={handleTextKeyPress}
          autoFocus
        />
        <button id='SearchButton' onClick={handleSearch}>
          {pic}
        </button>
      </div>
      <div id='LabelSort' className='Label'>
        Sorter etter
      </div>
      <div id='SortSelect' className='Cell'>
        <Select
          id='SortSelectbar'
          closeMenuOnSelect={true}
          components={animatedComponents}
          options={sortOptions}
          defaultValue={sortOptions[0]}
          onChange={handleSelectOrder.bind(this)}
        />
      </div>
      <div id='FiltersButtonCell'>
        <button id='FiltersButton' onClick={handleFiltersClick}>
          {ButtonText}
        </button>
      </div>
      {extraFilters}
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchResturants: fetchResturants
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Searchbar);

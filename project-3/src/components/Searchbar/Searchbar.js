import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import magnifyingGlass from "./mg.svg";

import "./Searchbar.css";

/* const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
]; */

const cities = [
  "Oslo",
  "Bergen",
  "Stavanger",
  "Trondheim",
  "Drammen",
  "Skyer",
  "Kristiansand",
  "Tomasjorda",
  "Ålesund",
  "Sandnes",
  "Haugesund",
  "Tønsberg",
  "Moss",
  "Bodø",
  "Arendal",
  "Hamar",
  "Gjøvik",
  "Mo i Rana",
  "Narvik",
  "Lillehammer",
  "Harstad",
  "Molde",
  "Alta",
  "Steinkjer",
  "Hammerfest",
  "Namsos",
  "Vossevangen",
  "Vadsø",
  "Svolvær",
  "Finnsnes",
  "Kirkenes",
  "Rørvik",
  "Hermansverk",
  "Skogsvåg",
  "Noresund",
  "Sandnessjøen",
  "Hansnes",
  "Råde",
  "Tingvoll",
  "Årdalstangen",
  "Rosendal",
  "Batnfjordsøra",
  "Namdalseid",
  "Jaren",
  "Hov",
  "Kragerø",
  "Stranda",
  "Gratangen",
  "Valldal",
  "Ulefoss",
  "Våler",
  "Drøbak",
  "Hokksund",
  "Lurøy",
  "Vik",
  "Tysse",
  "Kleppe",
  "Skjåk",
  "Vågå",
  "Åseral",
  "Langesund",
  "Sørumsand",
  "Randaberg",
  "Treungen",
  "Ølen",
  "Sykkylven",
  "Ål",
  "Kongsberg",
  "Ski",
  "Dale",
  "Lyngdal",
  "Kongsvinger",
  "Brøstadbotn",
  "Sør-Fron",
  "Oppdal",
  "Bjørkelangen",
  "Alvdal",
  "Brekstad",
  "Iveland",
  "Storslett",
  "Søgne",
  "Rena",
  "Evje",
  "Brønnøysund",
  "Selbu",
  "Nesna",
  "Nannestad",
  "Andenes",
  "Borkenes",
  "Bremnes",
  "Jevnaker",
  "Bruflat",
  "Stokmarknes",
  "Kjøllefjord",
  "Røyrvik",
  "Fiskå",
  "Rognan",
  "Hommelvik",
  "Volda",
  "Alstad",
  "Valderhaug",
  "Surnadal",
  "Hauge",
  "Bø",
  "Gryllefjord",
  "Kopervik",
  "Gjerstad",
  "Leksvik",
  "Kvalsund",
  "Ås",
  "Reine",
  "Brattvåg",
  "Støren",
  "Meldal",
  "Larsnes",
  "Lena",
  "Sørland",
  "Steinshamn",
  "Skjervøy",
  "Skarnes",
  "Dokka",
  "Masfjordnes",
  "Kvinesdal",
  "Bruhagen",
  "Isdalstø",
  "Falkhytta",
  "Flekkefjord",
  "Kolvereid",
  "Øksfjord",
  "Oteren",
  "Honningsvåg",
  "Sunndalsøra",
  "Tynset",
  "Granvin",
  "Sørreisa",
  "Årnes",
  "Hareid",
  "Tromsø",
  "Terråk",
  "Lom",
  "Trysil",
  "Bardu",
  "Bogen",
  "Rong",
  "Burfjord",
  "Koppang",
  "Eidsvåg",
  "Eidsvoll",
  "Sagstua",
  "Flå",
  "Rjukan",
  "Sveio",
  "Karasjok",
  "Vikevåg",
  "Vågaholmen",
  "Ramberg",
  "Hamnvik",
  "Midsund",
  "Skien",
  "Enebakk",
  "Birkeland",
  "Flisa",
  "Raufoss",
  "Ørnes",
  "Krokstadøra",
  "Olderdalen",
  "Eivinvik",
  "Høyanger",
  "Manger",
  "Balestrand",
  "Liabøen",
  "Inndyr",
  "Breivikbotn",
  "Tana Bru",
  "Hemsedal",
  "Rømskog",
  "Dale",
  "Røyken",
  "Bryne",
  "Os",
  "Hol",
  "Rygge",
  "Verdal",
  "Lyngseidet",
  "Mandal",
  "Sætre",
  "Utsira",
  "Fagernes",
  "Sandane",
  "Heggenes",
  "Odda",
  "Fetsund",
  "Naustdal",
  "Rissa",
  "Våler",
  "Hobøl",
  "Elnesvågen",
  "Frekhaug",
  "Straumen",
  "Tvedestrand",
  "Ålen",
  "Fauske",
  "Grong",
  "Sjøvegan",
  "Høylandet",
  "Kyrksæterøra",
  "Judaberg",
  "Norheimsund",
  "Ulvik",
  "Berlevåg",
  "Østre Gausdal",
  "Ålgård",
  "Orkanger",
  "Ørje",
  "Førde",
  "Årnes",
  "Vestby",
  "Otta",
  "Røyse",
  "Rødberg",
  "Lampeland",
  "Vang",
  "Lauvsnes",
  "Aurlandsvangen",
  "Gaupne",
  "Korgen",
  "Spydeberg",
  "Asker",
  "Namsskogan",
  "Mosjøen",
  "Fredrikstad",
  "Grimstad",
  "Langevåg",
  "Mjøndalen",
  "Fillan",
  "Uggdal",
  "Dovre",
  "Drangedal",
  "Malm",
  "Stordal",
  "Leknes",
  "Varhaug",
  "Konsmo",
  "Mo",
  "Bagn",
  "Kirkenær",
  "Ringebu",
  "Øyer",
  "Straume",
  "Austrheim",
  "Kinsarvik",
  "Voss",
  "Stord",
  "Os",
  "Slidre",
  "Eikelandsosen",
  "Lesja",
  "Ørskog",
  "Bykle",
  "Bygland",
  "Skodje",
  "Storsteinnes",
  "Lonevåg",
  "Evenskjer",
  "Tennevoll",
  "Marnardal",
  "Sandvika",
  "Selje",
  "Løten",
  "Nodeland",
  "Lensvik",
  "Skaland",
  "Vennesla",
  "Nittedal",
  "Notodden",
  "Leland",
  "Sauda",
  "Halden",
  "Fedje",
  "Aksdal",
  "Snåsa",
  "Lærdalsøyri",
  "Myre",
  "Fyresdal",
  "Klæbu",
  "Vestnes",
  "Sarpsborg",
  "Seljord",
  "Åndalsnes",
  "Sand",
  "Gjerdrum",
  "Berkåk",
  "Jondal",
  "Tonstad",
  "Trofors",
  "Farsund",
  "Sande",
  "Florø",
  "Mysen",
  "Etne",
  "Eide",
  "Kautokeino",
  "Brumunddal",
  "Kristiansund",
  "Botngard",
  "Fosnavåg",
  "Nordli",
  "Meråker",
  "Sola",
  "Svelgen",
  "Jessheim",
  "Kviteseid",
  "Røst",
  "Froland",
  "Ås",
  "Eidfjord",
  "Skjærhalden",
  "Lakselv",
  "Siljan",
  "Hønefoss",
  "Rakkestad",
  "Måløy",
  "Hardbakke",
  "Mehamn",
  "Aure",
  "Vinstra",
  "Ranemsletta",
  "Leknes",
  "Straumsjøen",
  "Vangsvik",
  "Risør",
  "Tolga",
  "Dalen",
  "Leinesfjord",
  "Træna",
  "Stange",
  "Porsgrunn",
  "Nesbyen",
  "Nordfjordeid",
  "Fitjar",
  "Båtsfjord",
  "Prestfoss",
  "Dun",
  "Melhus",
  "Hopen",
  "Sistranda",
  "Rindal",
  "Kjøpsvik",
  "Lier",
  "Bokn",
  "Kvitsøy",
  "Forsand",
  "Skotterud",
  "Hyllestad",
  "Moldjord",
  "Engerdal",
  "Bergset",
  "Jørpeland",
  "Stjørdal",
  "Sogndal",
  "Askvoll",
  "Hornindal",
  "Skei",
  "Stryn",
  "Lørenskog",
  "Trøgstad",
  "Skiptvet",
  "Folldal",
  "Straumen",
  "Hurdal",
  "Storebø",
  "Røros",
  "Nesoddtangen",
  "Ørsta",
  "Åmli",
  "Havøysund",
  "Vikøyri",
  "Egersund",
  "Vardø",
  "Solfjellsjøen",
  "Tingvatn",
  "Moi",
  "Elverum",
  "Roan",
  "Steinsdalen",
  "Fossby",
  "Roa",
  "Børsa",
  "Vinje",
  "Sauland",
  "Akkerhaugen",
  "Vigeland",
  "Oppeid",
  "Kolbotn",
  "Lødingen",
  "Ballangen",
  "Hattfjelldal",
  "Ulsteinvik",
  "Gol",
  "Varangerbotn",
  "Rollag",
  "Vikeså",
  "Vikersund",
  "Hol",
  "Moen",
  "Levanger",
  "Hjelmeland",
  "Vegårshei",
  "Lillestrøm",
  "Lillesand",
  "Vevelstad",
  "Askim",
  "Sortland",
  "Valle",
  "Fjerdingby",
  "Kleppestø"
];
const cityOptions = cities.map(city => ({ value: city, label: city }));
const smileyOptions = [
  { value: "happy", label: "Smil" },
  { value: "neutral", label: "Nøytral" },
  { value: "sad", label: "Sur" }
];
const sortOptions = [
  { value: "NAME_AZ", label: "Navn A-Å" },
  { value: "NAME_ZA", label: "Navn Å-A" },
  { value: "DATE_DESC", label: "Dato Ny-Eldre" },
  { value: "DATE_ASC", label: "Dato Eldre-Ny" },
  { value: "SMILEY_DESC", label: "Fjes Glad-Sur" },
  { value: "SMILEY_ASC", label: "Fjes Sur-Glad" }
];

const animatedComponents = makeAnimated();

const Searchbar = props => {
  const pic = (
    <img
      className="MagnifyingGlass"
      src={magnifyingGlass}
      alt="Magnifying Glass"
    />
  );
  const [isExpanded, setExpand] = useState(false);

  function handleTextChange(event) {
    console.log(event.target.value);
  }

  function handleFiltersClick() {
    setExpand(!isExpanded);
  }
  let extraFilters = null;
  if (isExpanded) {
    extraFilters = (
      <div id="ExtraFilters" className="Grid">
        <div className="Label" id="CitiesLabel">
          Filtrer etter byer
        </div>
        <div id="FilterCities" className="Cell">
          <Select
            id="FilterCitiesbar"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={cityOptions}
          />
        </div>
        <div className="Label" id="SmileysLabel">
          Filtrer etter fjes
        </div>
        <div id="FilterSmiley" className="Cell">
          <Select
            id="FilterSmileybar"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={smileyOptions}
          />
        </div>
      </div>
    );
  }
  return (
    <div id="Searchbar" className="Grid">
      <div id="LabelRestaurant" className="Label">
        Søk etter spisested
      </div>
      <div id="TextRestaurant" className="Cell">
        <input
          type="text"
          placeholder="Navn"
          name="fname"
          onChange={handleTextChange}
        />
        <button>{pic}</button>
      </div>
      <div id="LabelSort" className="Label">
        Sorter etter
      </div>
      <div id="SortSelect" className="Cell">
        <Select
          id="SortSelectbar"
          closeMenuOnSelect={true}
          components={animatedComponents}
          options={sortOptions}
          defaultValue={sortOptions[0]}
        />
      </div>
      <div id="FiltersButton">
        <button onClick={handleFiltersClick}>Flere filter</button>
      </div>
      {extraFilters}
    </div>
  );
};

export default Searchbar;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faGlobe, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { fetchContinent } from '../../redux/countries/countries';
import formatNumber from '../utils/formatNumber';
import './Home.css';

// Load Map of each continent.
import Asia from '../../assets/Asia.png';
import Africa from '../../assets/Africa.png';
import Europe from '../../assets/Europe.png';
import NorthAmerica from '../../assets/North_America.png';
import SouthAmerica from '../../assets/South_America.png';
import Oceania from '../../assets/Oceania.png';
import Grid from './Grid';

// Options for drop down menu.
const optionSelect = [
  { value: '', label: 'Select Continent' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Africa', label: 'Africa' },
  { value: 'Europe', label: 'Europe' },
  { value: 'Oceania', label: 'Oceania' },
  { value: 'North America', label: 'North America' },
  { value: 'South America', label: 'South America' },
];

// Default value when nothing is initially selected.
let continent = 'Asia';
let map = Asia;

// Load first value from dropdown.
const Home = () => {
  const [selected, setSelected] = useState(optionSelect[0].value);

  const dispatch = useDispatch();
  const { items, totalConfirmed, loading } = useSelector((state) => ({
    ...state.countries,
    loading: state.loadingBar.default,
  }));

  // When selection is changed.
  const handleChange = (event) => {
    setSelected(event.target.value);
    continent = event.target.value;
    dispatch(fetchContinent(continent));
    if (event.target.value === 'Asia') {
      map = Asia;
    } else if (event.target.value === 'Africa') {
      map = Africa;
    } else if (event.target.value === 'Europe') {
      map = Europe;
    } else if (event.target.value === 'Oceania') {
      map = Oceania;
    } else if (event.target.value === 'North America') {
      map = NorthAmerica;
    } else if (event.target.value === 'South America') {
      map = SouthAmerica;
    } else {
      map = Asia;
    }
  };

  // When there is some data then dispatch continent.
  useEffect(() => {
    if (!items.length) {
      dispatch(fetchContinent(continent));
    }
  }, []);

  if (loading) {
    return null;
  }

  return (
    <section>
      <header className="App-header">
        <FontAwesomeIcon icon={faGlobe} />
        <h4>2022</h4>
        <h5 className="App-header-title">
          <select value={selected} onChange={handleChange} className="App-header-select">
            {optionSelect.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </h5>

        <FontAwesomeIcon icon={faMicrophone} />
        <div className="pl-5">
          <FontAwesomeIcon icon={faGear} />
        </div>
      </header>
      <div className="Home-banner">
        <div className="Home-banner-left">
          <img src={map} alt="Banner view" className="App-map" />
        </div>
        <div className="Home-banner-right">
          <h1 className="App-title">{continent}</h1>
          <p className="App-subtitle">
            {`${formatNumber(totalConfirmed)} cases`}
          </p>
        </div>
      </div>
      <section className="Home-stats">
        <h5 className="App-section-title">STATS By COUNTRY</h5>
        <Grid items={items} />
      </section>
    </section>
  );
};

export default Home;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faGlobe, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { fetchCountries } from '../../redux/countries/countries';
import formatNumber from '../utils/formatNumber';
import './Home.css';
import Africa from '../../assets/afric.png';
import Europe from '../../assets/europe.png';
import Asia from '../../assets/asia.png';
import NorthAmerica from '../../assets/americaN.png';
import SouthAmerica from '../../assets/americaS.png';
import Oceania from '../../assets/oceani.png';
import Grid from './Grid';

const optionSelect = [
  { value: '', label: 'Filter' },
  { value: 'Africa', label: 'Africa' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europe' },
  { value: 'North America', label: 'North America' },
  { value: 'Oceania', label: 'Oceania' },
  { value: 'South America', label: 'South America' },
];
let continent = 'Africa';
let map = Africa;

const Home = () => {
  const [selected, setSelected] = useState(optionSelect[0].value);

  const dispatch = useDispatch();
  const { items, totalConfirmed, loading } = useSelector((state) => ({
    ...state.countries,
    loading: state.loadingBar.default,
  }));

  const handleChange = (event) => {
    setSelected(event.target.value);
    continent = event.target.value;
    dispatch(fetchCountries(continent));
    if (event.target.value === 'Africa') {
      map = Africa;
    } else if (event.target.value === 'Asia') {
      map = Asia;
    } else if (event.target.value === 'Europe') {
      map = Europe;
    } else if (event.target.value === 'North America') {
      map = NorthAmerica;
    } else if (event.target.value === 'Oceania') {
      map = Oceania;
    } else if (event.target.value === 'South America') {
      map = SouthAmerica;
    }
  };

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchCountries(continent));
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

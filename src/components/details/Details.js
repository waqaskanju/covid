import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft, faCity, faGear, faMicrophone,
} from '@fortawesome/free-solid-svg-icons';
import Moment from 'moment';
import { fetchCountry } from '../../redux/countries/countries';
import formatNumber from '../utils/formatNumber';
import image from '../../assets/virus.svg';
import './Details.css';

const Details = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { country, loading } = useSelector((state) => ({
    loading: state.loadingBar.default,
    country: state.countries.selected,
  }));

  useEffect(() => {
    dispatch(fetchCountry(name));
  }, []);

  if (loading || !country) {
    return null;
  }

  const { All } = country;
  const list = Object.entries(country).slice(1);

  if (Object.keys(country).length > 1) {
    return (
      <section>
        <header className="App-header">
          <Link to="/">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h5 className="App-header-title">Detail View</h5>
          <FontAwesomeIcon icon={faMicrophone} />
          <div className="pl-5">
            <FontAwesomeIcon icon={faGear} />
          </div>
        </header>
        <div className="Details-banner">
          <div className="Details-banner-left">
            <img src={image} alt="map view" className="App-map" />
          </div>
          <div className="Details-banner-right">
            <h1 className="App-title">{All.country}</h1>
            <p className="App-subtitle">
              {`${formatNumber(
                All.confirmed,
              )} cases`}
            </p>
          </div>
        </div>
        <section className="Home-stats">
          <h5 className="App-section-title">DATA in CITY - 2022</h5>

          <ul>
            {list.map(([name, { confirmed }]) => (
              <li key={name} className="Details-item">
                <h6 className="Details-item-title">{name}</h6>
                <div className="Details-item-right">
                  <p className="App-subtitle">
                    {formatNumber(confirmed)}
                    {' '}
                    cases
                  </p>
                  <FontAwesomeIcon icon={faCity} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>
    );
  }
  return (
    <section>
      <header className="App-header">
        <Link to="/">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h5 className="App-header-title">Detail View</h5>
        <FontAwesomeIcon icon={faMicrophone} />
        <div className="pl-5">
          <FontAwesomeIcon icon={faGear} />
        </div>
      </header>
      <div className="Details-banner">
        <div className="Details-banner-left">
          <img src={image} alt="map view" className="App-map" />
        </div>
        <div className="Details-banner-right">
          <h1 className="App-title">{All.country}</h1>
          <p className="App-subtitle">
            {`${formatNumber(
              All.confirmed,
            )} cases`}
          </p>
        </div>
      </div>
      <section className="Home-stats">
        <h5 className="App-section-title">{'Country\'s Data - 2022'}</h5>
        <h6 className="App-section-title">
          Confirmed cases :
          {` ${formatNumber(
            All.confirmed,
          )} cases`}
        </h6>
        <h6 className="App-section-title">
          Recovered cases :
          {` ${formatNumber(
            All.recovered,
          )} cases`}
        </h6>
        <h6 className="App-section-title">
          Deaths :
          {` ${formatNumber(
            All.deaths,
          )} `}
        </h6>
        <h6 className="App-section-title">
          Total Population :
          {` ${formatNumber(
            All.population,
          )} peoples`}
        </h6>
        <h6 className="App-section-title">
          Last Update :
          {` ${Moment(
            All.updated,
          ).format('d MMM YYYY')}`}
        </h6>
      </section>
    </section>
  );
};

export default Details;

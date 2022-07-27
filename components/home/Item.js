import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import './Home.css';
import virus from '../../assets/virus.svg';

const Item = ({ confirmed, name }) => (
  <div className="Home-item-content">
    <div className="Home-item-icon">
      <FontAwesomeIcon icon={faArrowAltCircleRight} />
    </div>
    <div className="Home-item-top">
      <img src={virus} alt="virus view" className="Home-item-image" />
    </div>
    <div className="Home-item-bottom">
      <h4 className="App-title">{name}</h4>
      <p className="App-subtitle">{confirmed}</p>
    </div>
  </div>
);

Item.propTypes = {
  confirmed: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default Item;

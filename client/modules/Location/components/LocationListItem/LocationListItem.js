import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './LocationListItem.css';

function LocationListItem(props) {
  return (
    <div className={styles['single-location']}>
      <h3 className={styles['location-title']}>
        <Link to={`/locations/${props.location.slug}-${props.location.cuid}`} >
          {props.location.title}
        </Link>
      </h3>
      {/* <p className={styles['author-name']}><FormattedMessage id="by" /> {props.location.author}</p> */}
      {/* <p className={styles['author-name']}><FormattedMessage id="Latitude: "/> {props.location.lat} <FormattedMessage id="Longitude: "/> {props.location.lon}</p> */}
      
      <p className={styles['author-name']}><FormattedMessage id="Latitude: "/> {props.location.lat} </p>
      <p className={styles['author-name']}><FormattedMessage id="Longitude: "/> {props.location.lon}</p>
      {/* <p className={styles['location-desc']}>{props.location.images[0].image_title}</p>  */}
      <img className={styles['image-style']} src={props.location.images[0].image_url}></img>
      <img className={styles['image-style']} src={props.location.images[1].image_url}></img>
      <img className={styles['image-style']} src={props.location.images[2].image_url}></img>
      <p className={styles['location-action']}><a href="/" onClick={props.onDelete}><FormattedMessage id="deleteLocation" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

LocationListItem.propTypes = {
  location: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        image_title: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
      })
    ),
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default LocationListItem;

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
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.location.name}</p>
      <p className={styles['location-desc']}>{props.location.content}</p>
      <p className={styles['location-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteLocation" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

LocationListItem.propTypes = {
  location: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.object,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};
/* ^^^maybe i could put here the shape of content */
export default LocationListItem;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/LocationListItem/LocationListItem.css';

// Import Actions
import { fetchLocation } from '../../LocationActions';

// Import Selectors
import { getLocation } from '../../LocationReducer';

export function LocationDetailPage(props) {
  return (
    <div>
      <Helmet title={props.location.title} />
      <div className={`${styles['single-location']} ${styles['location-detail']}`}>
        <h3 className={styles['location-title']}>{props.location.title}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.location.author}</p>
        <table>
          <tr>
            <td><img className={styles['image-style']} src={props.location.images[0].image_url}></img></td>
            <td><img className={styles['image-style']} src={props.location.images[1].image_url}></img></td>
            <td><img className={styles['image-style']} src={props.location.images[2].image_url}></img></td>
          </tr>
          <tr>
            <td><p className={styles['location-desc']}>{props.location.images[0].image_title}</p></td>
            <td><p className={styles['location-desc']}>{props.location.images[1].image_title}</p></td>
            <td><p className={styles['location-desc']}>{props.location.images[2].image_title}</p></td>
          </tr>
        </table>
        
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in server side.
LocationDetailPage.need = [params => {
  return fetchLocation(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    location: getLocation(state, props.params.cuid),
  };
}

LocationDetailPage.propTypes = {
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
};

export default connect(mapStateToProps)(LocationDetailPage);

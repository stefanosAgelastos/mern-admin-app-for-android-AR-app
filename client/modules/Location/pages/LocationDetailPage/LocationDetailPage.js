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
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.location.name}</p>
        <p className={styles['location-desc']}>{props.location.content}</p>
        /* not sure about this   ^^^^^ maybe i should leave this as post*/
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
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.object,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};
/* ^^^maybe i could put here the shape of content */
export default connect(mapStateToProps)(LocationDetailPage);

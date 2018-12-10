import React from 'react';
import PropTypes from 'prop-types';
/*     ^^^^^^^^^ Runtime type checking for React props and similar objects.

You can use prop-types to document the intended types of properties passed to components.
React (and potentially other libraries—see the checkPropTypes() reference below)
will check props passed to your components against those definitions,
and warn in development if they don’t match. */

// Import Components
import LocationListItem from './LocationListItem/LocationListItem';

function LocationList(props) {
  return (
    <div className="listView">
      {
        props.locations.map(location => (
          <LocationListItem
            location={location}
            key={location.cuid}
            onDelete={() => props.handleDeleteLocation(location.cuid)}
          />
        ))
      }
    </div>
  );
}

LocationList.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  handleDeleteLocation: PropTypes.func.isRequired,
};

export default LocationList;

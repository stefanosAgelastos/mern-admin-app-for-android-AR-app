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
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.object,
    /* this can be helpful ^^ here
    https://labnotes.panderalabs.com/shaping-up-your-react-components-with-proptypes-shape-and-selectors-9d1111d0566f */
    slug: PropTypes.string.isRequired,
    /* ^^ remove */
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteLocation: PropTypes.func.isRequired,
};

export default LocationList;

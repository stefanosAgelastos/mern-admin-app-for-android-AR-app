import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import LocationList from '../../components/LocationList';
import LocationCreateWidget from '../../components/LocationCreateWidget/LocationCreateWidget';

// Import Actions
import { addLocationRequest, fetchLocations, deleteLocationRequest } from '../../LocationActions';
import { toggleAddLocation } from '../../../App/AppActions';

// Import Selectors
import { getShowAddLocation } from '../../../App/AppReducer';
import { getLocations } from '../../LocationReducer';

class LocationListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchLocations());
  }

  handleDeleteLocation = location => {
    if (confirm('Do you want to delete this location')) { // eslint-disable-line
      this.props.dispatch(deleteLocationRequest(location));
    }
  };

  handleAddLocation = (name, title, content) => {
    this.props.dispatch(toggleAddLocation());
    this.props.dispatch(addLocationRequest({ name, title, content }));
  };

  render() {
    return (
      <div>
        <LocationCreateWidget addLocation={this.handleAddLocation} showAddLocation={this.props.showAddLocation} />
        <LocationList handleDeleteLocation={this.handleDeleteLocation} locations={this.props.locations} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
LocationListPage.need = [() => { return fetchLocations(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddLocation: getShowAddLocation(state),
    locations: getLocations(state),
  };
}

LocationListPage.propTypes = {
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
  })).isRequired,
  showAddLocation: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

LocationListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(LocationListPage);

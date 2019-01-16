import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_LOCATION = 'ADD_LOCATION';
export const ADD_LOCATIONS = 'ADD_LOCATIONS';
export const DELETE_LOCATION = 'DELETE_LOCATION';

// Export Actions
export function addLocation(location) {
  return {
    type: ADD_LOCATION,
    location,
  };
}

export function addLocationRequest(location) {

  return (dispatch) => {
    return callApi('locations', 'post', {
      location: {
        name: location.name,
        title: location.title,
        content: location.content,
      },
    }).then(res => dispatch(addLocation(res.location)));
    /* things to look up ^^^, what is dispatch */
  };
}

export function addLocations(locations) {
  return {
    type: ADD_LOCATIONS,
    locations,
  };
}

export function fetchLocations() {
  return (dispatch) => {
    return callApi('locations').then(res => {
      dispatch(addLocations(res.locations));
    });
  };
}

export function fetchLocation(cuid) {
  return (dispatch) => {
    return callApi(`locations/${cuid}`).then(res => dispatch(addLocation(res.location)));
  };
}

export function deleteLocation(cuid) {
  return {
    type: DELETE_LOCATION,
    cuid,
  };
}

export function deleteLocationRequest(cuid) {
  return (dispatch) => {
    return callApi(`locations/${cuid}`, 'delete').then(() => dispatch(deleteLocation(cuid)));
  };
}

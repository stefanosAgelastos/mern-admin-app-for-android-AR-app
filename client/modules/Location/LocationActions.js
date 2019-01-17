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
        author: location.author,
        title: location.title,
        lon: location.lon,
        lat: location.lat,
        images: [
          { id: 1, image_title: location.imgT1, image_url: location.imgU1 },
          { id: 2, image_title: location.imgT2, image_url: location.imgU2 },
          { id: 3, image_title: location.imgT3, image_url: location.imgU3 },
        ],
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

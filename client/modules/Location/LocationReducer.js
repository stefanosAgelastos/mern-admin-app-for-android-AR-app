import { ADD_LOCATION, ADD_LOCATIONS, DELETE_LOCATION } from './LocationActions';

// Initial State
const initialState = { data: [] };

const LocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOCATION :
      return {
        data: [action.location, ...state.data],
      };

    case ADD_LOCATIONS :
      return {
        data: action.locations,
      };

    case DELETE_LOCATION :
      return {
        data: state.data.filter(location => location.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all locations
export const getLocations = state => state.locations.data;

// Get location by cuid
export const getLocation = (state, cuid) => state.locations.data.filter(location => location.cuid === cuid)[0];

// Export Reducer
export default LocationReducer;

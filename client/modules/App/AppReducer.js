// Import Actions
import { TOGGLE_ADD_LOCATION } from './AppActions';

// Initial State
const initialState = {
  showAddLocation: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_LOCATION:
      return {
        showAddLocation: !state.showAddLocation,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddLocation
export const getShowAddLocation = state => state.app.showAddLocation;

// Export Reducer
export default AppReducer;

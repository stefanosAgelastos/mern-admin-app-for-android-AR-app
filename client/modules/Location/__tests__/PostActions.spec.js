import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  ADD_LOCATION,
  DELETE_LOCATION,
  ADD_LOCATIONS,
  addLocation,
  deleteLocation,
  addLocations,
} from '../LocationActions';

const location = { name: 'Prashant', title: 'Hello Mern', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'", slug: 'hello-mern', _id: 1 };

test('should return the correct type for addLocation', actionTest(
  addLocation,
  location,
  { type: ADD_LOCATION, LOCATION },
));

test('should return the correct type for deleteLocation', actionTest(
  deleteLocation,
  location.cuid,
  { type: DELETE_LOCATION, cuid: location.cuid },
));

test('should return the correct type for addLocations', actionTest(
  addLocations,
  [location],
  { type: ADD_LOCATIONS, locations: [location] },
));

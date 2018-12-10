import test from 'ava';
import { actionTest } from 'redux-ava';
import { TOGGLE_ADD_LOCATION, toggleAddLocation } from '../AppActions';

test('should return the correct type for toggleAddLocation', actionTest(toggleAddLocation, null, { type: TOGGLE_ADD_LOCATION }));

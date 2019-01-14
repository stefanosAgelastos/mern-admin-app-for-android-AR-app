import test from 'ava';
import { reducerTest } from 'redux-ava';
import appReducer, { getShowAddLocation } from '../AppReducer';
import { toggleAddLocation } from '../AppActions';

test('action for TOGGLE_ADD_LOCATION is working', reducerTest(
  appReducer,
  { showAddLocation: false },
  toggleAddLocation(),
  { showAddLocation: true },
));

test('getShowAddLocation selector', t => {
  t.is(getShowAddLocation({
    app: { showAddLocation: false },
  }), false);
});

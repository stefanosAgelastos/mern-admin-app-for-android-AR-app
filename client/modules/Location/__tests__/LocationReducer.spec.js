import test from 'ava';
import { reducerTest } from 'redux-ava';
import LOCATIONReducer, { getLocation, getLocations } from '../LocationReducer';
import { addLocation, deleteLocation, addLocations } from '../LocationActions';

test('action for ADD_LOCATION is working', reducerTest(
  LOCATIONReducer,
  { data: ['foo'] },
  addLocation({
    name: 'prank',
    title: 'first LOCATION',
    content: 'Hello world!',
    _id: null,
    cuid: null,
    slug: 'first-LOCATION',
  }),
  { data: [{
    name: 'prank',
    title: 'first LOCATION',
    content: 'Hello world!',
    _id: null,
    cuid: null,
    slug: 'first-LOCATION',
  }, 'foo'] },
));

test('action for DELETE_LOCATION is working', reducerTest(
  LOCATIONReducer,
  { data: [{
    name: 'prank',
    title: 'first LOCATION',
    content: 'Hello world!',
    cuid: 'abc',
    _id: 1,
    slug: 'first-LOCATION',
  }] },
  deleteLocation('abc'),
  { data: [] },
));

test('action for ADD_LOCATIONS is working', reducerTest(
  LOCATIONReducer,
  { data: [] },
  addLocations([
    {
      name: 'prank',
      title: 'first LOCATION',
      content: 'Hello world!',
      _id: null,
      cuid: null,
      slug: 'first-LOCATION',
    },
  ]),
  { data: [{
    name: 'prank',
    title: 'first LOCATION',
    content: 'Hello world!',
    _id: null,
    cuid: null,
    slug: 'first-LOCATION',
  }] },
));

test('getLocations selector', t => {
  t.deepEqual(
    getLocations({
      Locations: { data: ['foo'] },
    }),
    ['foo']
  );
});

test('getLocation selector', t => {
  t.deepEqual(
    getLocation({
      LOCATIONs: { data: [{ cuid: '123' }] },
    }, '123'),
    { cuid: '123' }
  );
});


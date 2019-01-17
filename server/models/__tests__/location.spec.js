import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Location from '../location';
import { connectDB, dropDB } from '../../util/test-helpers';


// Initial posts added into test db
const locations = [
  new Location({ author: 'Me', title: 'KEA', lon: 12.537503, lat: 55.704006, slug: 'hello-cph', cuid: 'cikqgkv4q01ck7453ualdn3hf', images: {} }),
  new Location({ author: 'Me', title: 'Christiania', lon: 12.600034, lat: 55.673444, slug: 'hello-cph', cuid: 'cikqgkv4q01ck7453ualdn3hh', images: {} }),
];

test.before('connect to mockgoose', async () => {
  await connectDB();
});

test.beforeEach('connect and add two location entries', async () => {
  await Location.create(locations).catch(() => 'Unable to create locations');
});

test.afterEach.always(async () => {
  await dropDB();
});

test.serial('Should correctly give number of Locations', async t => {
  t.plan(2);

  const res = await request(app)
    .get('/api/locations')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(locations.length, res.body.locations.length);
});

test.serial('Should send correct data when queried against a cuid', async t => {
  t.plan(2);

  const location = new Location({ author: 'Me', title: 'KEA', lon: 12.537503, lat: 55.704006, slug: 'hello-cph', cuid: 'f34gb2bh24b24b2', images: {} });
  location.save();

  const res = await request(app)
    .get('/api/locations/f34gb2bh24b24b2')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.location.name, location.name);
});

test.serial('Should correctly add a location', async t => {
  t.plan(2);

  const res = await request(app)
    .post('/api/locations')
    .send({ location: { author: 'Me', title: 'KEA', lon: 12.537503, lat: 55.704006, slug: 'hello-cph', images: {} } })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedLocation = await Location.findOne({ title: 'KEA' }).exec();
  t.is(savedLocation.author, 'Me');
});

test.serial('Should correctly delete a location', async t => {
  t.plan(2);

  const location = new Location({ author: 'Me', title: 'KEA', lon: 12.537503, lat: 55.704006, slug: 'hello-cph', cuid: 'f34gb2bh24b24b2', images: {} });
  location.save();

  const res = await request(app)
    .delete(`/api/locations/${location.cuid}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const queriedLocation = await Location.findOne({ cuid: location.cuid }).exec();
  t.is(queriedLocation, null);
});

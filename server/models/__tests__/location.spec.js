import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Location from '../location';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial posts added into test db
const locations = [
  new Location({ name: 'Prashant', title: 'Hello Mern', slug: 'hello-mern', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'" }),
  new Location({ name: 'Mayank', title: 'Hi Mern', slug: 'hi-mern', cuid: 'f34gb2bh24b24b3', content: "All dogs bark 'mern!'" }),
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

  const location = new Location({ name: 'Foo', title: 'bar', slug: 'bar', cuid: 'f34gb2bh24b24b2', content: 'Hello Mern says Foo' });
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
    .send({ location: { name: 'Foo', title: 'bar', content: 'Hello Mern says Foo' } })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedLocation = await Location.findOne({ title: 'bar' }).exec();
  t.is(savedLocation.name, 'Foo');
});

test.serial('Should correctly delete a location', async t => {
  t.plan(2);

  const location = new Location({ name: 'Foo', title: 'bar', slug: 'bar', cuid: 'f34gb2bh24b24b2', content: 'Hello Mern says Foo' });
  location.save();

  const res = await request(app)
    .delete(`/api/locations/${location.cuid}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const queriedLocation = await Location.findOne({ cuid: location.cuid }).exec();
  t.is(queriedLocation, null);
});

import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import LocationListItem from '../../components/LocationListItem/LocationListItem';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const location = { name: 'Prashant', title: 'Hello Mern', slug: 'hello-mern', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'" };
const props = {
  location,
  onDelete: () => {},
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <LocationListItem {...props} />
  );

  t.truthy(wrapper.hasClass('single-location'));
  t.is(wrapper.find('Link').first().prop('children'), location.title);
  t.regex(wrapper.find('.author-name').first().text(), new RegExp(location.name));
  t.is(wrapper.find('.location-desc').first().text(), location.content);
  /* not sure about this ^^^^^ maybe i should leave this as post*/
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <LocationListItem {...props} />
  );

  t.deepEqual(wrapper.prop('location'), props.location);
  t.is(wrapper.prop('onClick'), props.onClick);
  t.is(wrapper.prop('onDelete'), props.onDelete);
});

test('calls onDelete', t => {
  const onDelete = sinon.spy();
  const wrapper = shallowWithIntl(
    <LocationListItem location={location} onDelete={onDelete} />
  );

  wrapper.find('.location-action > a').first().simulate('click');
  /* not sure    ^^^^^^^^ about this maybe i should leave this as post*/
  t.truthy(onDelete.calledOnce);
});

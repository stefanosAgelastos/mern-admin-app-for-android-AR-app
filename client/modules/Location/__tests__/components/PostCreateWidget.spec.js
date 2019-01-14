import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { FormattedMessage } from 'react-intl';
import { LocationCreateWidget } from '../../components/LocationCreateWidget/LocationCreateWidget';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const props = {
  addLocation: () => {},
  showAddLocation: true,
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <LocationCreateWidget {...props} />
  );

  t.truthy(wrapper.hasClass('form'));
  t.truthy(wrapper.hasClass('appear'));
  t.truthy(wrapper.find('h2').first().containsMatchingElement(<FormattedMessage id="createNewLocation" />));
  t.is(wrapper.find('input').length, 2);
  t.is(wrapper.find('textarea').length, 1);
});

test('hide when showAddLocation is false', t => {
  const wrapper = mountWithIntl(
    <LocationCreateWidget {...props} />
  );

  wrapper.setProps({ showAddLocation: false });
  t.falsy(wrapper.hasClass('appear'));
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <LocationCreateWidget {...props} />
  );

  t.is(wrapper.prop('addLocation'), props.addLocation);
  t.is(wrapper.prop('showAddLocation'), props.showAddLocation);
});

test('calls addLocation', t => {
  const addLocation = sinon.spy();
  const wrapper = mountWithIntl(
    <LocationCreateWidget addLocation={addLocation} showAddLocation />
  );

  wrapper.ref('name').value = 'David';
  wrapper.ref('title').value = 'Some Title';
  wrapper.ref('content').value = 'Bla Bla Bla';

  wrapper.find('a').first().simulate('click');
  t.truthy(addLocation.calledOnce);
  t.truthy(addLocation.calledWith('David', 'Some Title', 'Bla Bla Bla'));
});

test('empty form doesn\'t call addLocation', t => {
  const addLocation = sinon.spy();
  const wrapper = mountWithIntl(
    <LocationCreateWidget addLocation={addLocation} showAddLocation />
  );

  wrapper.find('a').first().simulate('click');
  t.falsy(addLocation.called);
});

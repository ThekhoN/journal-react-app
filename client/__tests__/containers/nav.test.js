import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import ConnectedNav, {Nav} from '../../src/containers/nav';

describe('Nav Component renders React Components', () => {
  let wrapper;
  let authenticated = true;

  beforeEach(() => {
    wrapper = shallow(<Nav authenticated={authenticated} />);
  });

  it('renders the Nav Component', () => {
    expect(wrapper.length).toEqual(1);
  });
});

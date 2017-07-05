import React from 'react';
import ConnectedSignin, {Signin} from '../../src/containers/signin';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';

describe('Signin Component renders React Components', () => {
  let wrapper;
  let authenticated = true;

  beforeEach(() => {
    wrapper = shallow(<Signin authenticated={authenticated}/>)
  });

  it('renders the Component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('h2 contains the text authenticated', () => {
    expect(wrapper.find('h2').text()).toEqual('Authenticated');
  });
});

describe('pass store directly + shallow render Signin Component', () => {
  const initialState = {
    auth: {
      authenticated: false
    }
  };

  const mockStore = configureStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<ConnectedSignin store={store} />);
  });

  it('renders connected component', () => {
    expect(container.length).toEqual(1);
  });

  it('prop matches initialState', () => {
    expect(container.prop('authenticated')).toEqual(initialState.auth.authenticated);
  });
});

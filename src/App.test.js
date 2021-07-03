import React from 'react';
import { shallow } from 'enzyme';
import ReactDom from 'react-dom'
import App from './components/Editors/createConference/createConferece';

describe('create conference form ', () => {

  it('form h1 value must match', () => {
    const wrapper = shallow(<App />);
    const text = wrapper.find('h1').text();
    expect(text).toEqual('Conference Form');
  });


  it(' field of the of the form should be blank initially ', function(){
    const component = shallow(<App />);
    const input = component.find('input').at(1).text();
    expect(component.state().time).toEqual('');

  });




});

// required to get test to work.  we can get around this later with more configuration
import React, { Component } from 'react'       

// method from enzyme which allows us to do shallow render           
import { shallow, mount, render } from "enzyme";            

// import our soon to be component 
import About from '../src/components/about';  

//import { Button } from 'antd';

describe('<About />', () => {

  it('存在', () => {
    const wrapper = render( <About />);
    expect(wrapper.children).to.have.length(1);
  });
});




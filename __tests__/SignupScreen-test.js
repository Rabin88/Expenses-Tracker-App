import Signup from '../AppComponents/Signup/Signup'
import Login from '../AppComponents/Login/Login'
import React from 'react';
import 'react-native'; 
import renderer from 'react-test-renderer'
import {shallow, mount, render } from 'enzyme';

import { configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';



configure({ adapter: new Adapter() });
        
        
//     // Testing Component
// it('renders correctly', () => {
//     const tree = renderer.create(
//         <Signup />
//         ).toJSON();
//     expect(tree).toMatchSnapshot();
// });

//     // Testing Component with Enzyme
// describe ('<Signup />', () => {
//     it('should shallow', () => {
//         const wrapper = shallow(<Signup />)
//         expect (wrapper).toMatchSnapshot()
//     });
// })

    // test if signup is defined 
describe ('<Signup />', () => {
    it('should be defined', () => {
        expect (Signup).toBeDefined()
    });
})
        //Testing Props
describe ('<Signup />', () => {
    it('should shallow', () => {
        const wrapper = shallow(<Signup Text='Sign Up' />)
        //console.log(wrapper.instance())
        expect (wrapper.instance().props.Text).toBe('Sign Up')
    });
})



  



   





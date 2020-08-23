import DashboardScreen from '../AppComponents/MainScreens/DashboardScreen'
import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer'
import {shallow } from 'enzyme';

import { configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


    // Dashboard Page getData API async/await mock test
jest.mock('../AppComponents/MainScreens/DashboardScreen', () => {
    return class{
        async getData() {
            const response = await new Promise ((resolve) => {
                resolve (
                 {id:123, name: 'David'}
                );
            })
            return response
        }
    }
})

describe ('Dashboar API mock test', () => {
    test('dasboard mock', async () => {
        expect.assertions(1);
        const dasboardData = await new DashboardScreen().getData();
        //console.log(dasboardData)

        expect(dasboardData).toEqual({id:123, name: 'David'})
    })
})

        // Mock Test Style 2
// jest.mock('../AppComponents/Homepage/Dashboard', () => {
//     return class{
//         getData(){
//             return [{id:'123', name: 'test'}]
//         }
//     }
// })

// describe ('mock test', () => {
//     test('dasboard mock', () => {
//         const das = new Dashboard();
//         console.log(das.getData())

//         expect(das.getData()).toEqual([{id:'123', name: 'test'}])
//     })
// })

            //Mock Test with Enzyme, this doesn't work as we need to create new mocktest class
// jest.mock('../AppComponents/Homepage/Dashboard')
// it('fetches total balance', (done) => {
//     const wrapper = shallow(<Dashboard />);

//     setTimeout(() => {
//         wrapper.update();
//         console.log(wrapper.find('Dashboard'))
//         expect(wrapper.find('Dashboard').length).toEqual(0);
//         done();
//     })
// })

// it('Testing props', () => {
//   const wrapper = shallow(<Dashboard currentbalance = '100' />).props();
//   wrapper.children.props
//   console.warn(wrapper.children.props);
//   expect(wrapper.children.props).toEqual('100');
// });



  

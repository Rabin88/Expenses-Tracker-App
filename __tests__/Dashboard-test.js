import Dashboard from '../AppComponents/Homepage/Dashboard'
import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer'
import {shallow } from 'enzyme';

import { configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

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

    // Dashboard Page getData API async/await mock test
jest.mock('../AppComponents/Homepage/Dashboard', () => {
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
        const dasboardData = await new Dashboard().getData();
        //console.log(dasboardData)

        expect(dasboardData).toEqual({id:123, name: 'David'})
    })
})

//     // Dashboard State testing
// it('Testing Dashboard this.state.data test', () =>{
//     let dashboardData = renderer.create(<Dashboard />).getInstance();
//     dashboardData.state.data = {id:'123', balance: 100}
//     //dashboardData.state.myKey = 1234
//     //console.warn (dashboardData.state.data.balance)
//     expect(dashboardData.state.data.balance).toEqual(100)
// })


        // Testing MatchSnapshot
// it('renders correctly', () => {
//   const tree = renderer.create(
//     <Dashboard />
//     ).toJSON();
//   expect(tree).toMatchSnapshot();
// });

// it('Testing props', () => {
//   const wrapper = shallow(<Dashboard currentbalance = '100' />).props();
//   wrapper.children.props
//   console.warn(wrapper.children.props);
//   expect(wrapper.children.props).toEqual('100');
// });



  

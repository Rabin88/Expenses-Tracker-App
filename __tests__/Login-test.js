import { JestEnvironment } from "@jest/environment";

// import 'react-native';
// import React from 'react';
// import Login from '../AppComponents/Login/Login'

// // Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

// // import Enzyme from 'enzyme';
// // import Adapter from 'enzyme-adapter-react-16';

// // Enzyme.configure({ adapter: new Adapter() });


// it('login api test', async function (){
//     global.fetch = jest.fn().mockImplementation(() => {
//         var a = new Promise( (resolve, reject) => {
//             resolve({
//                 json: function(){
//                     return {id: 1}
//                 }
//             })
//         })
//         return a;

//     })
//     const result = await Login.handleSubmit;
    
//     expect(result.id).toBe(1)

// });

jest.mock('./__mocks__/loginApi');

 import Login from '../AppComponents/Login/Login'
 import { handleSubmit } from "./__mocks__/loginApi";

 test('login test', () => {
     handelSubmit().then(_id => {
        expect(_id).toEqual('123');
     })
    
 })

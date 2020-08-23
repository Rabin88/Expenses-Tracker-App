import Login from '../AppComponents/Login'
import React from 'react';
import 'react-native';



    //Login Page API async/await mock test
jest.mock('../AppComponents/Login/Login', () => {
    return class{
        async handleSubmit() {
            const response = await new Promise ((resolve) => {
                resolve (
                 {username:'test', password: 'test123'}
                );
            })
            return response
        }
    }
})

describe ('login API mock test', () => {
    test('login mock', async () => {
        expect.assertions(1);
        const loginData = await new Login().handleSubmit();
        //console.log(loginData)

        expect(loginData).toEqual({username:'test', password: 'test123'})
    })
})

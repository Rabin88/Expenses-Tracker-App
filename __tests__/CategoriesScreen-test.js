import CategoriseScreen from '../AppComponents/DashboardPages/Categorise/CategoriseScreen'
import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer'

    //CategoriseScreen Page API async/await mock test
jest.mock('../AppComponents/DashboardPages/Categorise/CategoriseScreen', () => {
    return class{
        async getData() {
            const response = await new Promise ((resolve) => {
                resolve (
                 {categories: 'Food', total: 40}
                );
            })
            return response
        }
    }
})

describe ('CategoriseScreen API mock test', () => {
    test('CategoriseScreen mock', async () => {
        expect.assertions(1);
        const Data = await new CategoriseScreen().getData();
        //console.log(Data)

        expect(Data.total).toEqual(40)
    })
})

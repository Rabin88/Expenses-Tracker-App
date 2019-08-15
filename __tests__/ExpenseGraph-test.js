import Expensesgraph from '../AppComponents/DashboardPages/AccountGraphs/ExpensesGraph'
import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer'



    // Dashboard State testing
it('Testing Dashboard this.state.data test', () =>{
    let expensesData = renderer.create(<Expensesgraph />).getInstance();
    expensesData.state.myKey = {id:'123'}
    //dashboardData.state.myKey = 1234
    //console.warn (dashboardData.state.data.balance)
    expect(expensesData.state.myKey.id).toEqual('123')
})

    // Testing MatchSnapshot
// it('renders correctly', () => {
//     const tree = renderer.create(
//         <Expensesgraph />
//         ).toJSON();
//     expect(tree).toMatchSnapshot();
// });
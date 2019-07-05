/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator, 
        createAppContainer, 
        createBottomTabNavigator } from 'react-navigation';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Dashboard from './Components/Homepage/Dashboard';
import Accounts from './Components/DashboardPages/Account/Accounts';
import ExpensesGraph from './Components/DashboardPages/AccountGraphs/ExpensesGraph';
import SetGoals from './Components/DashboardPages/SetBudgets/SetGoals';

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}
const BottomTab = createBottomTabNavigator(
  {
    bottomHome: Dashboard,
    bottomAccount : Accounts,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ( {focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'bottomHome') {
          return (
            <View>
              <Text> Dashboard</Text>
          </View> )
            
        } else {
          return (
            <View>
            <Text> Account</Text>
          </View>)
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FF6F00',
      inactiveTintColor: '#263238',
      showIcon : true
    },
  }
);
const RootStack = createStackNavigator (
  {LoginPage :  Login,
    SignupPage : Signup,
    Home: Dashboard, 
    AccountsPage: Accounts,
    GraphsPage : ExpensesGraph,
    SetBudgetPage : SetGoals,
    bottomHome : BottomTab,
  },
  {
    initialRouteName: 'LoginPage',
  }
);
const AppContainer = createAppContainer(RootStack);

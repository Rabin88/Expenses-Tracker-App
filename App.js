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
import CategoriesScreen from './Components/DashboardPages/Categorise/CategoriseScreen'

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
    GraphPage: ExpensesGraph,
    accountPage: Accounts,

    // Home: Dashboard,
    // GraphsPage: ExpensesGraph,
     //AccountsPage: Accounts,
    
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // tabBarVisible: navigation.state.routeName == "loginPage" ? false : true,
      tabBarIcon: ( {focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        icon = <Icon name= "home" size={25} />
        switch(routeName){
          case "bottomHome":
            icon = <Icon name="home" size={25} color={tintColor} />
            break;
            
            case "GraphPage":
            icon = <Icon name="line-chart" size={25} color={tintColor} />
            break;
            
            case "accountPage":
            icon = <Icon name="gear" size={25} color={tintColor} />
            break;
        }

        return icon;

      },
    }),
    tabBarOptions: {
      //activeTintColor: '#FF6F00',
      activeTintColor: '#0652DD',
      inactiveTintColor: '#263238',
      //showLabel: false

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
    CategoriesPage: CategoriesScreen,
    Tabs: {
      screen: BottomTab
    }
  },
  {
    initialRouteName: 'LoginPage',
  }
);


const AppContainer = createAppContainer(RootStack);

// const AppContainer = createAppContainer(BottomTab);

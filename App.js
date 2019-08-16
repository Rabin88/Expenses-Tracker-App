/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator, 
		createAppContainer, 
		createBottomTabNavigator } from 'react-navigation';
import {HomeNavigation, 
		chartNaviagtion, 
		setBudgetNaviagtion, 
		BudgetForecastNavigation,
		settingsNavigation} from './AppComponents/Navigations/stackNavigator'
import Login from './AppComponents/Login/Login';
import Signup from './AppComponents/Signup/Signup';
import Bank from './AppComponents/Bank';

export default class App extends Component {
	render() {
		return (
			<AppContainer />
		);
	}
}
const BottomTab = createBottomTabNavigator(
	{
		Home: HomeNavigation,
		Chart: chartNaviagtion,
		SetBudget: setBudgetNaviagtion,
		Forecast: BudgetForecastNavigation,
		Settings: settingsNavigation ,	
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			 //tabBarVisible: navigation.state.routeName == "LoginPage" ? false : true,
			tabBarIcon: ( {focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state;
				icon = <Icon name= "home" size={25} />
				switch(routeName){
					case "Home":
					icon = <Icon name="home" size={25} color={tintColor} />
					break;
					
					case "Chart":
					icon = <Icon name="pie-chart" size={25} color={tintColor} />
					break;

					case "SetBudget":
					icon = <Icon name="plus-circle" size={25} color={tintColor} />
					break;

					case "Forecast":
					icon = <Icon name="line-chart" size={25} color={tintColor} />
					break;
					
					case "Settings":
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
	BankPage: Bank,
		Tabs: {
			screen: BottomTab,
			navigationOptions:{
				header: null
			}
		
		}
	},
	{
		initialRouteName: 'LoginPage', defaultNavigationOptions: {
			headerStyle: {
			  backgroundColor: '#1289A7',
			}
		}
	}
);

const AppContainer = createAppContainer(RootStack);

 //const AppContainer = createAppContainer(BottomTab);

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * This is the main class for building Expense Tracker application.
 * The Icon is used from 'react-native-vector-icons/FontAwesome' library.
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
		settingsNavigation} from './AppComponents/stackNavigator'
import Login from './AppComponents/Login';
import Signup from './AppComponents/Signup';
import BankScreen from './AppComponents/BankScreen';
 
// App class that contain AppContainer component
export default class App extends Component {
	render() {
		return (
			<AppContainer />
		);
	}
}
 //Bottom tab Navigator that contain Home, Chart, SetBudget, Forecast, Settings tab on Dashboard screen
const BottomTab = createBottomTabNavigator(
	{
		Home: HomeNavigation,
		Chart: chartNaviagtion,
		SetBudget: setBudgetNaviagtion,
		Forecast: BudgetForecastNavigation,
		Settings: settingsNavigation ,	
	},
	{   // This is switch cases for bottom tab naviations
		defaultNavigationOptions: ({ navigation }) => ({
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
			activeTintColor: '#0652DD',
			inactiveTintColor: '#263238',
		},
	}
);
 // Stack Navigator that contain Login, Signup and BankScreen
const RootStack = createStackNavigator (
	{LoginPage :  Login,
	SignupPage : Signup,
	BankPage: BankScreen,
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


import {createStackNavigator } from 'react-navigation'
import Dashboard from '../Homepage/Dashboard';
import ExpensesGraph from '../DashboardPages/AccountGraphs/ExpensesGraph';
import SettingsPage from '../DashboardPages/Settings/SettingsPage';
import SetGoals from '../DashboardPages/SetBudgets/SetGoals';
import CategoriesScreen from '../DashboardPages/Categorise/CategoriseScreen';


export const HomeNavigation = createStackNavigator(
    {Home: Dashboard, 
    CategoriesPage: CategoriesScreen}
);
export const chartNaviagtion = createStackNavigator(
	{Chart : ExpensesGraph}
);

export const setBudgetNaviagtion = createStackNavigator(
	{SetBudget : SetGoals}
);

export const settingsNavigation = createStackNavigator({
    Settings: SettingsPage}
);
// const categoriesNaviagtion = createStackNavigator(
// 	{CategoriesPage: CategoriesScreen}
// );

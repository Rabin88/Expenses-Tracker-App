import {createStackNavigator } from 'react-navigation'
import Dashboard from '../Homepage/Dashboard';
import ExpensesGraph from '../DashboardPages/AccountGraphs/ExpensesGraph';
import SettingsPage from '../DashboardPages/Settings/SettingsPage';
import SetGoals from '../DashboardPages/SetBudgets/SetGoals';
import CategoriesScreen from '../DashboardPages/Categorise/CategoriseScreen';
import Food from '../DashboardPages/Merchant Screens/Food'
import Shopping from '../DashboardPages/Merchant Screens/Shopping';
import Travel from '../DashboardPages/Merchant Screens/Travel';
import Housing from '../DashboardPages/Merchant Screens/Housing';
import Bills from '../DashboardPages/Merchant Screens/Bills';
import Groceries from '../DashboardPages/Merchant Screens/Groceries';
import Others from '../DashboardPages/Merchant Screens/Others';
import BudgetForecastScreen from '../DashboardPages/BudgetForecast/BudgetForecastScreen'

export const HomeNavigation = createStackNavigator(
    {Home: Dashboard, 
    CategoriesPage: CategoriesScreen,
    FoodScreen: Food,
    GroceriesScreen: Groceries,
    ShoppingScreen: Shopping,
    TravelScreen: Travel,
    HousingScreen: Housing,
    BillsScreen: Bills,
    OthersScreen: Others
    }
);
export const chartNaviagtion = createStackNavigator(
    {Chart : ExpensesGraph,
    CategoriesPage: CategoriesScreen, }
);

export const setBudgetNaviagtion = createStackNavigator(
	{SetBudget : SetGoals}
);

export const settingsNavigation = createStackNavigator({
    Settings: SettingsPage}
);
export const BudgetForecastNavigation = createStackNavigator({
    Forecast: BudgetForecastScreen }
);
// const categoriesNaviagtion = createStackNavigator(
// 	{CategoriesPage: CategoriesScreen}
// );

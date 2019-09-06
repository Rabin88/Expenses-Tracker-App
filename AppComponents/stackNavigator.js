import {createStackNavigator } from 'react-navigation'
import Dashboard from './MainScreens/DashboardScreen';
import ExpensesGraph from './MainScreens/PieChartScreen';
import SettingsPage from './MainScreens/SettingsScreen';
import SetGoals from './MainScreens/SetBudgetScreen';
import CategoriesScreen from './MainScreens/CategoriseScreen';
import Food from './MainScreens/Transactions Screens/Food'
import Shopping from './MainScreens/Transactions Screens/Shopping';
import Travel from './MainScreens/Transactions Screens/Travel';
import Housing from './MainScreens/Transactions Screens/Housing';
import Bills from './MainScreens/Transactions Screens/Bills';
import Groceries from './MainScreens/Transactions Screens/Groceries';
import Others from './MainScreens/Transactions Screens/Others';
import BudgetForecastScreen from './MainScreens/BudgetForecastScreen'

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

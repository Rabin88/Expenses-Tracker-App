import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
//import Accounts from './DashboardPages/Account/Accounts';

export default class Dashboard extends Component {
    static navigationOptions = {
        title: 'Dashboard',
      };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}> Welcome to HomePage </Text>
                <Button  onPress={() => this.props.navigation.navigate('AccountsPage')} title="Go to Account Page"/>
                <Button  onPress={() => this.props.navigation.navigate('GraphsPage')} title="Go to Account Graphs"/>
                <Button  onPress={() => this.props.navigation.navigate('SetBudgetPage')} title="Go to Account Set Budgets"/>
        
            </View>
        )
    }
}
// const BottomTab = createBottomTabNavigator(
//   {
//     bottomHome: Dashboard,
//     bottomAccount : Accounts,
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, horizontal, tintColor }) => {
//         const { routeName } = navigation.state;
//         if (routeName === 'bottomHome') {
//           return (
//             <Text> Dashboard
               
//             style={{ width: 20, height: 20, }}</Text>
//           );
//         } else {
//           return (
//             <Text> Accounts
//               style={{ width: 20, height: 20 }}</Text>
//           );
//         }
//       },
//     }),
//     tabBarOptions: {
//       activeTintColor: '#FF6F00',
//       inactiveTintColor: '#263238',
//     },
//   }
// );
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
   
     
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    }
});

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
//import Accounts from './DashboardPages/Account/Accounts';

export default class Dashboard extends Component {
  static navigationOptions = {
        title:'Dashboard',
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}> Welcome to HomePage </Text>
                <Button  onPress={() => this.props.navigation.navigate('AccountsPage')} title="Go to Account Page"/>
                <Button  onPress={() => this.props.navigation.navigate('GraphsPage')} title="Go to Account Graphs"/>
                <Button  onPress={() => this.props.navigation.navigate('SetBudgetPage')} title="Go to Account Set Budgets"/>
                <Button  onPress={() => this.props.navigation.navigate('CategoriesPage')} title="Go to Categories Page"/>
        
            </View>
        )
    }
}

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

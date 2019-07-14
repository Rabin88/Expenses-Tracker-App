import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default class SetBudgets extends Component {
    static navigationOptions = {
        title: 'Set Budgets',
      };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}> Welcome to Set Goals Page </Text>
        
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
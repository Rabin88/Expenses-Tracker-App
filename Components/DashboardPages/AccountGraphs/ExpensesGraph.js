import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default class Dashboard extends Component {
    static navigationOptions = {
        title:'Expenses',
      };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}> Welcome to Expenses Graphs </Text>
        
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
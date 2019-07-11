import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default class Dashboard extends Component {
    static navigationOptions = {
        title: 'Categories',
      };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}> Welcome to Categories Page </Text>
        
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

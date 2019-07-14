import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default class accounts extends Component {
    static navigationOptions = {
        title: 'Accounts',
      };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}> Welcome to AccountPage </Text>
        
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

import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, ScrollView, StatusBar } from 'react-native'



export default class Expenses extends Component {
  static navigationOptions = {
    title : 'Expense',
  }
  // constructor(props) {
  //   super(props);
  //   this.state ={ 
  //     chartData :{
  //       labels: ['January', 'February', 'March', 'April', 'May'],
  //       datasets: [{
  //           label: 'My First dataset',
  //           data: [5, 10, 5, 2, 20],
  //           backgroundColor: ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800'],
  //           //borderColor: 'rgb(255, 99, 132)',
  //       }]
  //     }
  //   }
  // }

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


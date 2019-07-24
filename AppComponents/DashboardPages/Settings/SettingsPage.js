import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class SettingsPage extends Component {

   static navigationOptions = {
		title: 'Settings',
		headerStyle: {backgroundColor: '#179bbd'},
		headerTitleStyle: {color:'white'}
	};
    render() {
        return (
            <View>
                <Text> Welcome to Seettings Page  </Text>
            </View>
        )
    }
}

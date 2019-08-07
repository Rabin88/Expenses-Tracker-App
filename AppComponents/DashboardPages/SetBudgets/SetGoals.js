import React, {Component} from 'react';
import {Modal, Text, Button, StyleSheet, TouchableHighlight, View, Alert, Dimensions, TextInput, } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import ModalSelector from 'react-native-modal-selector'


export default class SetBudgets extends Component {
	static navigationOptions = {
		title: 'Set Budgets',
		headerStyle: {backgroundColor: '#179bbd'},
		headerTitleStyle: {color:'white'}
	};
	constructor(props) {
		super(props);
		this.state ={ 
			progress: 0,
			maxValue:0,
			currentValue:10,
			setValue: 10,
			modalVisible: false,
			textInputValue: '',
	
		}
	}

	setModalVisible() {
		this.setState({modalVisible: !this.state.modalVisible});
	}

	max = (value) => {
		this.setState({maxValue: value})
	}

    barValue (){
		let barMaxValue = (this.state.currentValue/this.state.setValue)*100;
		if (barMaxValue < 100) {
			return (this.state.currentValue/this.state.setValue)*100
		} 
		// else if (barMaxValue === 100) {
		// 	alert('Yay! Set Target Completed!');
		// } 
		else {
			return 100;
		}
    }

  	increase = (key, value) => {
		this.setState({
			[key]: this.state[key] + value,
		});
	}
	goBack(){
		if(this.state.textInputValue === ''){
			alert('select a Category!');
		} else if (this.state.setValue <=5){
			alert('Value must be more than 5!');
		} else {
			 return (
				this.setModalVisible()
			 )
		}
	}

	render() {
		const barWidth = Dimensions.get('screen').width - 30;
		let index = 0;
		const data = [
			{ key: index++, section: true, label: 'Categories' },
			{ key: index++, label: 'Food' },
			{ key: index++, label: 'Housing' },
			{ key: index++, label: 'Groceries' },
			{ key: index++, label: 'Travel' },
			{ key: index++, label: 'Bills' },
			{ key: index++, label: 'Shopping' },
			{ key: index++, label: 'Others', accessibilityLabel: 'Tap here for Others' }
		];
		return (
			<View style={styles.container}>
				<View style={{ flexDirection: 'row'}}>
				<Text style= {{fontSize:20, fontWeight: 'bold', marginBottom:5, marginLeft: 15}}> {this.state.textInputValue}   </Text>
				<Text style= {{fontSize:17, fontWeight: 'bold', color: '#179bbd', marginBottom: 5, marginRight:10, marginLeft:30}}> 
				Current Amount £{this.state.currentValue}</Text>
				</View>
		
					<View>

						<ProgressBarAnimated style = {{marginBottom: 50}}
							width={barWidth}
							maxValue={100}
							value = {this.barValue()}
							backgroundColorOnComplete="#6CC644"
							borderColor = 'orange'
							backgroundColor= '#6CC644'
							onComplete={() => {
								alert('Yay! Set Target Completed!');
							}}
						/>
					</View>
					<Text style={styles.label}> £{this.state.currentValue} remaning of £{this.state.setValue}</Text>

					<TouchableHighlight style= {styles.button}>
					<Button onPress={() => {this.setModalVisible()}}  color = 'white' title = "Set Budget" />
					</TouchableHighlight>
					
					<Modal
						animationType="slide"
						transparent={false}
						visible={this.state.modalVisible}
						onRequestClose={() => {
							alert('Modal has been closed.');
						}}>
						<View >

							<TouchableHighlight style={{justifyContent:'center', marginLeft: 20, marginRight: 20, marginBottom: 40,marginTop:300}}>
								<ModalSelector
									data={data}
									//initValue="Select a Category!"
									accessible={true}
									scrollViewAccessibilityLabel={'Scrollable options'}
									cancelButtonAccessibilityLabel={'Cancel Button'}
									onChange={(option)=>{ this.setState({textInputValue:option.label})}}>
										
										<Text style ={{fontSize: 20, color:'#179bbd', marginBottom: 5, textAlign:'center'}}> Category </Text>
										<TextInput
										style={{borderWidth:1, borderColor:'#ccc', padding: 5, height:40, textAlign: 'center', fontSize:15}}
										editable={false}
										placeholder="Select a Category!"
										value={this.state.textInputValue} />

								</ModalSelector>
							</TouchableHighlight>
							
							<TouchableHighlight style ={{ justifyContent:'center', marginLeft: 80 ,marginBottom: 30}}>
								<NumericInput
									// initial value is setValue
									value={this.state.setValue}
									onChange={(setValue) => {this.setState({setValue});console.log(setValue)}}
									totalWidth={200}
									totalHeight={60}
									minValue={5}
									maxValue={200}
									onLimitReached={(value)=> {if (value == 0) {return; } else{
										alert('Max Limit Reached')}
									}}
									step={5}
									rounded
									iconStyle={{ fontSize: 15, color: '#434A5E'}}
									inputStyle={{ fontSize: 25, color: '#434A5E' }}
									reachMaxIncIconStyle = {{color: 'red'}}
									//reachMinIncIconStyle = {{color: 'red'}}
									valueType='real'
									borderColor='#C7CBD6'
									rightButtonBackgroundColor='#C7CBD6'
									leftButtonBackgroundColor='#C7CBD6'
								/>
							</TouchableHighlight>

							{/* <TouchableHighlight style= {styles.button}>
								<Button  onPress={() => {this.setModalVisible()}}  color = 'white' title = "Set" /> 
							</TouchableHighlight> */}

							<TouchableHighlight style= {styles.button}>	
								<Button  onPress={() =>  {this.goBack()}}  color = 'white' title = "Set" /> 
							</TouchableHighlight>

						</View>

					</Modal>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		//flex: 1,
		backgroundColor: '#FFF',
		marginTop: 20,
		marginBottom: 20,
		padding: 15,
	},	
	label: {
		color: '#999',
		fontSize: 16,
		fontWeight: '500',
		marginTop: 5,
	},
	button:{
		width: 150,
		backgroundColor:'#179bbd',
		borderRadius:40,
		borderWidth: 1,
		borderColor: '#fff',
		alignSelf: 'center',
		marginTop: 30
	},
});
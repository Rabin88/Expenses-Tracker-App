import React, { Component } from 'react'
import { StyleSheet, Text, View,  Alert, Button,   Dimensions } from 'react-native'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import NumericInput from 'react-native-numeric-input'


// export default class SetBudgets extends Component {
//     static navigationOptions = {
//         title: 'Set Budgets',
//       };
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.welcome}> Welcome to Set Goals Page </Text>
				
//             </View>
//         )
//     }
// }
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#F5FCFF',
		 
//     },
//     welcome: {
//       fontSize: 20,
//       textAlign: 'center',
//       margin: 10,
//     }
// });

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
			progressWithOnComplete: 0,
			progressCustomized: 0,
			maxValue: 80,
			value: 0,
			amount: 0,
			v1: 0,
		}
	}
	max = (value) => {
		this.setState({maxValue: value})
	}
		
	// state = {
	//   progress: 0,
	//   progressWithOnComplete: 0,
	//   progressCustomized: 0,
	// }
	// let progress = this.state.progress;
	// let progressWithOnComplete= this.state.progressWithOnComplete;
	// let progressCustomized= this.state.progressCustomized;
 
	increase = (key, value) => {
		this.setState({
			[key]: this.state[key] + value,
		});
	}
 
	render() {
		const barWidth = Dimensions.get('screen').width - 30;
		const progressCustomStyles = {
			backgroundColor: 'red', 
			borderRadius: 0,
			borderColor: 'orange',
		};
 
		return (
			<View style={styles.container}>
				<View>
					<Text style={styles.label}>Bar with backgroundColorOnComplete prop     £{this.state.maxValue}</Text>
					<ProgressBarAnimated
						width={barWidth}
						maxValue={this.state.maxValue}
						value={this.state.progress}
						backgroundColorOnComplete="#6CC644"
						onComplete={() => {
							alert('Yay! Set Target Completed!');
						 }}
					/>
					<View style={styles.buttonContainer}>
						<View style={styles.buttonInner}>
							<Button
								title="Increase 20%"
								onPress={this.increase.bind(this, 'progress', 20)}
							/>
						</View>
					</View>
				</View>

				<NumericInput
					// initValue={this.state.v1}
					value={this.state.v1}
					onChange={(v1) => {this.setState({ v1 });console.log(v1)}}
					totalWidth={200}
					totalHeight={50}
					minValue={0}
					maxValue={20}
					onLimitReached={(value)=> {if (value == 0) {return; } else{
						alert('Max Limit Reached')}
					}}
					step={5}
					rounded
					iconStyle={{ fontSize: 15, color: '#434A5E' }}
					inputStyle={{ fontSize: 20, color: '#434A5E' }}
					reachMaxIncIconStyle = {{color: 'red'}}
					//reachMinIncIconStyle = {{color: 'red'}}
					valueType='real'
					borderColor='#C7CBD6'
					rightButtonBackgroundColor='#C7CBD6'
					leftButtonBackgroundColor='#C7CBD6'
				/>

				<View style={styles.separator} />
				<View>
					<Text style={styles.label}>Bar with onComplete event</Text>
					<ProgressBarAnimated
						width={barWidth}
						value={this.state.progressWithOnComplete}
						onComplete={() => {
						 alert('Hey!', 'onComplete event fired!');
						}}
					/>
					<View style={styles.buttonContainer}>
						<View style={styles.buttonInner}>
							<Button
								title="Increase 50%"
								onPress={this.increase.bind(this, 'progressWithOnComplete', 50)}
							/>
						</View>
					</View>
				</View>
				<View style={styles.separator} />
				<View>
					<Text style={styles.label}>Custom style with max value in 30%</Text>
					<ProgressBarAnimated
						{...progressCustomStyles}
						width={barWidth}
						maxValue={30}
						value={this.state.progressCustomized}
					/>
					<View style={styles.buttonContainer}>
						<View style={styles.buttonInner}>
							<Button
								title="Increase 10%"
								onPress={this.increase.bind(this, 'progressCustomized', 10)}
							/>
						</View>
					</View>
				</View>
			</View>
		);
	}
}
 
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
		marginTop: 50,
		padding: 15,
	},
	buttonContainer: {
		marginTop: 15,
	},
	separator: {
		marginVertical: 30,
		borderWidth: 0.5,
		borderColor: '#DCDCDC',
	},
	label: {
		color: '#999',
		fontSize: 14,
		fontWeight: '500',
		marginBottom: 10,
	},
});

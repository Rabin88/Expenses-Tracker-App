import React, {Component} from 'react';
import {Modal, Text, Button, StyleSheet, TouchableHighlight, View, ScrollView,Dimensions, TextInput, AsyncStorage} from 'react-native';
import NumericInput from 'react-native-numeric-input'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import ModalSelector from 'react-native-modal-selector'
import moment from 'moment';


export default class SetBudgets extends Component {
	static navigationOptions = {
		title: 'Set Budgets',
		headerStyle: {backgroundColor: '#179bbd'},
		headerTitleStyle: {color:'white'}
	};

	constructor(props) {
		super(props);
		this.state ={ 
			myKey: '',
			token: '',
			modalVisible: false,
			data: [],
			categorySpent: [],
			error : null,

			progress: 0,
			maxValue:0,
			// currentValue:10,
			selectAmount: 10,
			selectCategory: '',
		}

		this.getStorageData();
	}

	async getStorageData() {
		try {
		  const user_id = await AsyncStorage.getItem('userId');
		  const jwt_token = await AsyncStorage.getItem('token');

		  this.setState({myKey: user_id, token: jwt_token});

		  this.getData();
		  this.getCategoryData();
		  //alert(value)
		} catch (error) {
		  console.log("Error retrieving data" + error);
		}
	  }

	saveData(){

		let data ={
            "categories": this.state.selectCategory,
			"amount": this.state.selectAmount,
			"user_id": this.state.myKey
		};
		
        console.log(data);
        // Client Send the reequest to Server localhost:3000 as a JSON object
        fetch('https://weareexpensetracker.herokuapp.com/api/budget', {
            method: 'POST',
            headers: {
				'Authorization': 'Bearer '+ this.state.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
         // Client get the response from Server, upon successful the user account will be created and navigate back to login page
        .then (result => {
			console.log('got result back');
			console.log(this.props);
			this.goBack();
			this.getData();
        })
        .catch(error => {
            console.log(error);
        });
	}

	getData (){  

		let user_id = this.state.myKey;

        fetch(`https://weareexpensetracker.herokuapp.com/api/budget?user_id=${user_id}`, {
            headers: {
				'Authorization': 'Bearer '+ this.state.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })     
		.then(res => res.json())      
		.then(res => { 
			if(res.length === 0){
				return;
			}  else {
				console.log(res);
				this.setState({          
					data: res,  // database array        
					error: res.error || null,                  
				});
			}     	        
		})      
		.catch(error => {        
		this.setState({ error});      
		});  
	};

	findCategorySpentAmount(category){

		for(let i = 0; i<this.state.categorySpent.length; i++){
			console.log(this.state.categorySpent[i]);
			if(this.state.categorySpent[i]._id.Categories == category){
				console.log('category matched');
				return this.state.categorySpent[i].total;
			}
		}

		return 0;
	}

	getCategoryData (){  
		var dateObj = new Date();
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var year = dateObj.getUTCFullYear();

		var monthStr = month;
		if(month < 10){
			monthStr = "0"+month;
		}
		var thisMonthFirstDay = `${year}-${monthStr}-01T00:00:00.000+00:00`;

		const sDate = thisMonthFirstDay;
		const fDate = moment(dateObj, "DD-MM-YYYY", true).format();
		console.log(sDate, fDate);


        fetch('https://weareexpensetracker.herokuapp.com/api/categories', {
            method: 'POST',
            headers: {
				'Authorization': 'Bearer '+ this.state.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
				start_date: sDate,
				finish_date :fDate,
				userid: this.state.myKey
            })
        })     
		.then(res => res.json())      
		.then(res => { 
			console.log(res);  
			this.setState({
				categorySpent: res
			});	        
		})      
		.catch(error => {        
			this.setState({ error});      
		});  
	};

	setModalVisible() {
		this.setState({modalVisible: !this.state.modalVisible});
	}

	max = (value) => {
		this.setState({maxValue: value})
	}

    barValue (spent, budget){
		if(spent > budget){
			return 100;
		}

		return (spent/budget)*100;
    }

	goBack(){
		if(this.state.selectCategory === ''){
			alert('select a Category!');
		} else if (this.state.selectAmount <=5){
			alert('Value must be more than 5!');
		} else {
			 return (
				this.setModalVisible()
			 )
		}
	}

	render() {
		var budgetList = [];
		let count = 0;
		const barWidth = Dimensions.get('screen').width - 30;
		
        this.state.data.forEach(function (elem) {
			let spentAmount = this.findCategorySpentAmount(elem.categories).toFixed(2);
			let setAmount = elem.amount.toFixed(2)
			console.log(spentAmount);
            budgetList.push(
                <View key={count++}>
					<View style={{flex:1,flexDirection: 'row'}}>
						<Text style= {{flex: 1,fontSize:15, fontWeight: 'bold', marginBottom:5, marginLeft:10,}}>{elem.categories}</Text>
						<Text style= {{flex: 1,fontSize:13, fontWeight: 'bold', textAlign: 'right', color: '#59108D', marginBottom: 5,marginRight:5}}> 
						 Target Amount £{setAmount}</Text>
					</View>
					<ProgressBarAnimated style = {{marginBottom:20, marginTop: 10}}
						width={barWidth}
						maxValue={100}
						value = {this.barValue(spentAmount ,elem.amount)}
						backgroundColorOnComplete="#6CC644"
						borderColor = 'orange'
						backgroundColor='#6CC644'
						onComplete={() => {
							alert('Yay! Set Target Completed!');
						}}
					/>
					{/* <Text style={styles.label}> £{spentAmount} remaning of £{elem.amount}</Text> */}
					<Text style={styles.label}> Current Spending £{spentAmount} </Text>
				</View>
            );
        }.bind(this));

		
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
				<ScrollView>
					<Text style ={{fontSize:15, color:'black', marginBottom:20, textAlign:'center'}}> Set Budgets Category </Text>
					
					{budgetList}

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
									onChange={(option)=>{ this.setState({selectCategory:option.label})}}>
										
										<Text style ={{fontSize: 20, color:'#179bbd', marginBottom: 5, textAlign:'center'}}> Category </Text>
										<TextInput
										style={{borderWidth:1, borderColor:'#ccc', padding: 5, height:40, textAlign: 'center', fontSize:15}}
										editable={false}
										placeholder="Select a Category!"
										value={this.state.selectCategory} />

								</ModalSelector>
							</TouchableHighlight>
							
							<TouchableHighlight style ={{ justifyContent:'center', marginLeft: 80 ,marginBottom: 30}}>
								<NumericInput
									// initial value is selectAmount
									value={this.state.selectAmount}
									onChange={(selectAmount) => {this.setState({selectAmount});console.log(selectAmount)}}
									totalWidth={200}
									totalHeight={60}
									minValue={5}
									maxValue={9999}
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
								<Button  onPress={() =>  {this.saveData()}}  color = 'white' title = "Set" /> 
							</TouchableHighlight>

						</View>

					</Modal>
				</ScrollView>
			</View>
		
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#afdfed',
		//marginTop: 10,
		//marginBottom: 20,
		padding: 15,
	},	
	label: {
		//color: '#999',
		color: '#7B8887',
		fontSize: 16,
		fontWeight: '500',
		marginTop: 5,
		marginBottom: 15
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
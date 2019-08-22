import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ScrollView,  AsyncStorage, Alert} from 'react-native'
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';


//import { ScrollView } from 'react-native-gesture-handler';

export default class Categories extends Component {
	static navigationOptions = {
		title: 'Categories',
		headerStyle: {backgroundColor: '#179bbd'},
		headerTitleStyle: {color:'white'}
	};
		
	constructor(props) {
		super(props);
		this.state = {
			startDate: "01-04-2019",
			FinishDate: new Date(),      
			data: [] ,
			myKey: " ",
			token: ""       
		};
		
		this.getStorageData();
		
	}

	async getStorageData() {
		try {
		  const user_id = await AsyncStorage.getItem('userId');
		  const jwt_token = await AsyncStorage.getItem('token');

		  this.setState({myKey: user_id, token: jwt_token});
		  this.getData();
		} catch (error) {
		  console.log("Error retrieving data" + error);
		}
	  }

	//  componentDidMount (){  
	// 	 console.log('component did mount!'); 
	// };
	getData (){  
		const sDate = moment(this.state.startDate, "DD-MM-YYYY", true).format();
		const fDate = moment(this.state.FinishDate, "DD-MM-YYYY", true).format();

		console.log(sDate);
		console.log(fDate);
		console.log(this.state.myKey);
		console.log(this.state.token);


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
			if(res.length === 0){
				alert('Categories Empty!')
				return;
			}  else {
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

	// renderItem=({item}) => { 
	// 	return(
	// 		<View style={{flex:1, flexDirection:'row', marginBottom: 5}}>
	// 			<Text style={styles.category} > {item._id.Categories} </Text>
	// 			<Text style={styles.amount} > -£{item.total.toLocaleString(undefined, {maximumFractionDigits:2})} </Text>
	// 		</View>
	// 		)
	// }

	renderItem=({item}) => { 
		const sDate = moment(this.state.startDate, "DD-MM-YYYY", true).format();
		const fDate = moment(this.state.FinishDate, "DD-MM-YYYY", true).format();
		const uid = this.state.myKey;
		
		let payload = {
			startDate : sDate,
			finishDate : fDate,
			user_id : uid
		};

		if (item._id.Categories === 'Food'){
			return(
				<TouchableOpacity onPress={() => this.props.navigation.navigate('FoodScreen', payload)}>
				<View style={{flex:1, flexDirection:'row', marginBottom: 5}}>
					<View style={{flex:1}}>
					<Text style={styles.category}> <Icon name="cutlery" size={20}/>  {item._id.Categories}  </Text>
					<Text style={styles.countTransaction}>  {item.count_transaction} transactions  </Text>
					</View>
					<Text style={styles.amount} > - £{item.total.toFixed(2)} </Text>
				</View>
				</TouchableOpacity>
				)
		} else if (item._id.Categories === 'Groceries'){
			return(
				<TouchableOpacity onPress={() => this.props.navigation.navigate('GroceriesScreen', payload)}>
				<View style={{flex:1, flexDirection:'row', marginBottom: 5}}>
					<View style={{flex:1}}>
						<Text style={styles.category}> <Icon name="shopping-cart" size={20}/>  {item._id.Categories}  </Text>
						<Text style={styles.countTransaction}>  {item.count_transaction} transactions  </Text>
					</View>
					<Text style={styles.amount} > - £{item.total.toFixed(2)} </Text>
				</View>
				</TouchableOpacity>
				)
		} else if (item._id.Categories === 'Shopping'){
			return(
				<TouchableOpacity onPress={() => this.props.navigation.navigate('ShoppingScreen', payload)}>
				<View style={{flex:1, flexDirection:'row', marginBottom: 5}}>
					<View style={{flex:1}}>
						<Text style={styles.category}> <Icon name="shopping-bag" size={20}/>  {item._id.Categories}  </Text>
						<Text style={styles.countTransaction}>  {item.count_transaction} transactions  </Text>
					</View>
					<Text style={styles.amount} > - £{item.total.toFixed(2)} </Text>
				</View>
				</TouchableOpacity>
				)
		} else if (item._id.Categories === 'Travel'){
			return(
				<TouchableOpacity onPress={() => this.props.navigation.navigate('TravelScreen', payload)}>
				<View style={{flex:1, flexDirection:'row', marginBottom: 5}}>
					<View style={{flex:1}}>
						<Text style={styles.category}> <Icon name="subway" size={20}/>  {item._id.Categories}  </Text>
						<Text style={styles.countTransaction}>  {item.count_transaction} transactions  </Text>
					</View>
					<Text style={styles.amount} > - £{item.total.toFixed(2)} </Text>
				</View>
				</TouchableOpacity>
				)
		} else if (item._id.Categories === 'Housing'){
			return(
				<TouchableOpacity onPress={() => this.props.navigation.navigate('HousingScreen', payload)}>
				<View style={{flex:1, flexDirection:'row', marginBottom: 5}}>
					<View style={{flex:1}}>
						<Text style={styles.category}> <Icon name="home" size={20}/>  {item._id.Categories}  </Text>
						<Text style={styles.countTransaction}>  {item.count_transaction} transactions  </Text>
					</View>
					<Text style={styles.amount} > - £{item.total.toFixed(2)} </Text>
				</View>
				</TouchableOpacity>
				)
		} else if (item._id.Categories === 'Bills'){
			return(
				<TouchableOpacity onPress={() => this.props.navigation.navigate('BillsScreen', payload)}>
				<View style={{flex:1, flexDirection:'row', marginBottom: 5}}>
					<View style={{flex:1}}>
						<Text style={styles.category}> <Icon name="list-alt" size={20}/>  {item._id.Categories} </Text>
						<Text style={styles.countTransaction}>  {item.count_transaction} transactions  </Text>
					</View>
					<Text style={styles.amount} > - £{item.total.toFixed(2)} </Text>
				</View>
				</TouchableOpacity>
				)
		} else if (item._id.Categories === 'Others' &&  item.total != 0){
			return(
				<TouchableOpacity onPress={() => this.props.navigation.navigate('OthersScreen', payload)}>
				<View style={{flex:1, flexDirection:'row', marginBottom: 5}}>
					<View style={{flex:1}}>
						<Text style={styles.category}> <Icon name="list-ul" size={20}/>  {item._id.Categories}  </Text>
						<Text style={styles.countTransaction}>  {item.count_transaction} transactions  </Text>
					</View>
					<Text style={styles.amount} > - £{item.total.toFixed(2)} </Text>
				</View>
				</TouchableOpacity>
				)
		} else if (item._id.Categories === 'Others' &&  item.total === 0){
			return;
		} 
		else {
			return;
		// return(
		// 	<View style={{flex:1, flexDirection:'row', marginBottom: 5}}>
		// 		<Text style={styles.category} > {item._id.Categories} </Text>
		// 		<Text style={styles.amount} > -£{item.total.toLocaleString(undefined, {maximumFractionDigits:2})} </Text>
		// 	</View>
		// 	)
		 }
	}

	// renderSeparator = () => {
	// 	return (
	// 		<View style = {{height: 2, width: '100%',color: 'black'}}></View>
	// 	)
	// }

	render() {
		return (
			// <ScrollView>
				<View style={styles.container}>

				{/* <Text style={styles.dateStyle}> {moment(this.state.startDate).format()} </Text>	 */}
					<View style={{ flexDirection:'row'}}>
						<Text style={styles.dateStyle}> From </Text>
						<Text style={styles.dateStyle}> To </Text>
					</View>

					<View style={{flexDirection:'row'}}>
						<DatePicker
						style={{width: 180, borderColor: 'black',}}
						date={this.state.startDate} //initial date from state
						mode="date" //The enum of date, datetime and time
						placeholder="select date"
						format="DD-MM-YYYY"
						minDate="01-01-2019"
						maxDate={this.state.FinishDate}
						confirmBtnText="Confirm"
						cancelBtnText="Cancel"
						customStyles={{
							dateIcon: {
							//position: 'absolute',
							left: 0,
							top: 4,
							marginLeft: 0
							},
							dateInput: {
							fontSize: 15,
							marginLeft: 10,
							backgroundColor: 'white'
							}
						}}
						onDateChange={(date) => {this.setState({startDate: date})}}
						/>
						<DatePicker
						style={{width: 180, marginBottom: 10}}
						date={this.state.FinishDate} //initial date from state
						mode="date" //The enum of date, datetime and time
						placeholder="select date"
						format="DD-MM-YYYY"
						minDate="01-01-2019"
						maxDate = {this.state.FinishDate}
						confirmBtnText="Confirm"
						cancelBtnText="Cancel"
						customStyles={{
							dateIcon: {
							//position: 'absolute',
							left: 0,
							top: 4,
							marginLeft: 0
							},
							dateInput: {
							fontSize: 15,
							backgroundColor: 'white'
							//marginLeft: 10,
							}
						}}
						onDateChange={(date) => {this.setState({FinishDate: date})}}
						/>

					</View>

					<TouchableOpacity style = {styles.button} > 
					<Button onPress={() => this.getData()} color = 'white' title="Set"/>
					</TouchableOpacity> 
							
					<FlatList 
						data={this.state.data}   
						renderItem={this.renderItem} 
						keyExtractor={(item,index)=> item._id.Categories} 
						//ItemSeparatorComponent ={this.renderSeparator}
					/>		
				</View>
			// </ScrollView>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#afdfed', 
	},
	dateStyle: {
		fontSize: 15,
		marginTop: 10,
		marginBottom:5,
		marginLeft: 10,
		marginRight:115,
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		marginBottom: 30,
		marginTop: 30,
	},
	category: {
		//flex:1,
		//flexDirection: 'column',
		backgroundColor: '#e1e8e5',
		fontSize: 20,
		padding: 15,
		marginLeft: 5,
		height: 50,
		color: 'black',	
	},
	amount: {
		flex:1,
		backgroundColor: '#e1e8e5',
		fontSize: 20,
		padding: 20,
		marginRight: 5,
		height: 70,
		textAlign: 'right',
		color: 'red'
	},
	button:{
		width: 150,
		marginBottom:10,
		backgroundColor:'#179bbd',
		borderRadius:40,
		borderWidth: 1,
		borderColor: '#fff',
		alignSelf: 'center',
	},
	countTransaction : {
		backgroundColor: '#e1e8e5',
		fontSize: 16,
		marginLeft: 5,
		marginBottom: 5,
		height: 20,
		color: '#324dc7',
		textAlign: 'center'	
	}
});
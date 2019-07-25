import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native'
import DatePicker from 'react-native-datepicker';
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
			startDate: "01-01-2019",
			FinishDate: new Date(),      
			data: []        
		};

	}
	componentDidMount (){  
		const sDate = moment(this.state.startDate, "DD-MM-YYYY", true).format();
		const fDate = moment(this.state.FinishDate, "DD-MM-YYYY", true).format();

        fetch('http://localhost:3000/api/categories', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
				start_date: sDate,
				finish_date :fDate,
            })
        })     
		.then(res => res.json())      
		.then(res => {        
		this.setState({          
			data: res,  // database array        
			error: res.error || null,          
			loading: false,        
		});        
				
		//this.arrayholder = res.results;  //No need of this, this is for, if we create a new array     
		})      
		.catch(error => {        
		this.setState({ error, loading: false });      
		});  
	};
	getData (){  
		const sDate = moment(this.state.startDate, "DD-MM-YYYY", true).format();
		const fDate = moment(this.state.FinishDate, "DD-MM-YYYY", true).format();

        fetch('http://localhost:3000/api/categories', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
				start_date: sDate,
				finish_date :fDate,
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
		this.setState({ error, loading: false });      
		});  
	};
	// 	this.setState({ 
	// 		data:[
	// 			{key: "Groceries",  total:10},
	// 			{key: "Food", total:20},
	// 			{key: "Shopping",   total:304656},
	// 			{key: "Travel" ,    total:4450},
	// 			{key: "Bills",      total: 50},
	// 			{key: "Others", total: 0},
	// 		]
	// 	})

	// }

	renderItem=({item}) => { 
		return(
			this.state.loading
			? 
			<View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size="large" color= 'black' animating/>
			</View>
			:
			<View style={{flex:1, flexDirection:'row', marginBottom: 5}}>
				<Text style={styles.category} > {item._id.Categories} </Text>
				<Text style={styles.amount} > -£{item.total.toFixed(2)} </Text>
			</View>
			)
	}
	renderSeparator = () => {
		return (
			<View style = {{height: 2, width: '100%',color: 'black'}}>

			</View>
		)
	}

	render() {
		return (
			<ScrollView>
				<View>

				{/* <Text style={styles.dateStyle}> {moment(this.state.startDate).format()} </Text>	 */}
					<View style={{ flexDirection:'row'}}>
						<Text style={styles.dateStyle}> From </Text>
						<Text style={styles.dateStyle}> To </Text>
					</View>

					<View style={{flexDirection:'row'}}>
						<DatePicker
						style={{width: 180}}
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
							marginLeft: 10
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
						ItemSeparatorComponent ={this.renderSeparator}
					/>
					
						
				</View>
			</ScrollView>
		)
	}
}
const styles = StyleSheet.create({
		container: {
			flex: 1,
			//justifyContent: 'center',
			//alignItems: 'center',
			//backgroundColor: '#00a8ff',
		 
		},
		dateStyle: {
			fontSize: 20,
			margin: 10,
			marginRight:100,
			//padding: 10,
			

		},
		welcome: {
			fontSize: 20,
			textAlign: 'center',
			marginBottom: 30,
			marginTop: 30,

		},
		category: {
			flex:1,
			backgroundColor: '#c8d0db',
			//borderWidth: 0.5,
			//borderColor: '#d6d7da',
			fontSize: 20,
			padding: 20,
			marginLeft: 5,
			//marginRight: 5,
			height: 70,
			color: 'black',
			
		},
		amount: {
			flex:1,
			backgroundColor: '#c8d0db',
			//borderWidth: 0.5,
			//borderColor: '#d6d7da',
			fontSize: 20,
			padding: 20,
			//marginLeft: 5,
			marginRight: 5,
			height: 70,
			textAlign: 'right',
			color: 'red'
		},
		button:{
			width: 150,
			//marginTop:10,
			marginBottom:10,
			backgroundColor:'#179bbd',
			borderRadius:40,
			borderWidth: 1,
			borderColor: '#fff',
			alignSelf: 'center',
		},
});


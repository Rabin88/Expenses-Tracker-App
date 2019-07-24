import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';

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
			loading: false,
			startDate: "01-01-2019",
			FinishDate: new Date(),      
			data: [],      
			error: null,    
		};

	}
	componentDidMount (){   
		//   const url = `My URL`;
		//   this.setState({ loading: true });
				
		//     fetch(url)      
		//       .then(res => res.json())      
		//       .then(res => {        
		//         this.setState({          
		//           data: res.food_array,  // database array        
		//           error: res.error || null,          
		//           loading: false,        
		//         });        
						
		//        //this.arrayholder = res.results;  //No need of this, this is for, if we create a new array     
		//      })      
		//      .catch(error => {        
		//        this.setState({ error, loading: false });      
		//      });  
		//   };
		this.setState({ 
			data:[
				{key: "Groceries",  total:10},
				{key: "Food", total:20},
				{key: "Shopping",   total:304656},
				{key: "Travel" ,    total:4450},
				{key: "Bills",      total: 50},
				{key: "Others", total: 0},
			]
		})

	}

	renderItem=({item}) => { 
		return(
			this.state.loading
			? 
			<View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size="large" color= 'black' animating/>
			</View>
			:
			<View style={{flex:1, flexDirection:'row', marginBottom: 5}}>
				<Text style={styles.category} > {item.key} </Text>
				<Text style={styles.amount} > -£{item.total} </Text>
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
						maxDate="01-09-2019"
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
						maxDate="01-09-2019"
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
					<Button onPress={() => this.props.navigation.navigate('CategoriesPage')} color = 'white' title="Set"/>
					</TouchableOpacity> 
							
					<FlatList 
						data={this.state.data}   
						renderItem={this.renderItem} 
						//keyExtractor={(item,index)=> index} 
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


/**
 * This is a PieChartScreen class that displays the categories in a pie-chart with percentage.
 * It also display total expenses in the center of the pie chart. In addition pie-chart is animated. 
 * To create piechart VictoryPie is used which was installed from victory-native library.
 * Similarly, for selecting date, react-native-datepicker library is used.
 * To change the date in MongoDB format, moment library is used.
 * 
 */
import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, AsyncStorage} from 'react-native'
import { VictoryLabel, VictoryPie, VictoryLegend } from "victory-native";
import Svg from 'react-native-svg' 
import DatePicker from 'react-native-datepicker'; 
import moment from 'moment';

export default class PieChartScreen extends Component {
	static navigationOptions = {
		title : 'Expense',
		headerStyle: {backgroundColor: '#179bbd'},
		headerTitleStyle: {color:'white'}
	}
	constructor(props) {
		super(props);
		this.state = {
			startDate: "01-04-2019",
			FinishDate: new Date(), 
			myKey: " ", 
			data:[
				{ _id: 'Food', total: 0 },
				{ _id: 'Travel', total: 0 },
			],
			total:0,
			token: ''
		};

		this.getStorageData();
		
	}

	// Function to get stored token and userID.
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
	// Function to get tranascation categories data from the database.
	getData (){  
		const sDate = moment(this.state.startDate, "DD-MM-YYYY", true).format();
		const fDate = moment(this.state.FinishDate, "DD-MM-YYYY", true).format();

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
	// Function to calculate total expense amount
	getTotal = () => {
	var total = this.state.data.reduce( function(accumulator, value) {
		return accumulator + value.total;
	},0);
		return (
		total.toFixed(2)
		)
	}
	render() {

		return (
			<View style={styles.container}>
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
							}
						}}
						onDateChange={(date) => {this.setState({FinishDate: date})}}
						/>

					</View>

					<TouchableOpacity style = {styles.button} > 
					<Button onPress={() => this.getData()} color = 'white' title="Set"/>
					</TouchableOpacity>


				<View>
				<Svg width={380} height={600}>
					<VictoryPie 
						standalone={false}
						colorScale={["tomato","orange", "gold","cyan", "#bd8cbd", "#68bab3", "#9997d1" ]}
						data={this.state.data}
						x = "Categories"
						y = "total"
						animate={{duration: 2000}}
						innerRadius={90}
						padAngle={2}
						labelRadius={100}
<<<<<<< HEAD:AppComponents/DashboardPages/AccountGraphs/ExpensesGraph.js
						//style={{ labels: { fill: "green", fontSize: 20}}}
=======
>>>>>>> e2259087b88116ac6bb66e98b1e094d0a220cd91:AppComponents/MainScreens/PieChartScreen.js
						labels={(item) => `${item._id.Categories}:${Math.round(item.total/this.getTotal()*100)}%`}
						
					/>
					<VictoryLabel
						textAnchor="middle"
						style={{ fontSize: 20 }}
						x={190} y={170}
						text={`Total Expenses`}
					/>
					<VictoryLabel
						textAnchor="middle"
						style={{ fontSize: 20, fill: 'red' }}
						x={190} y={200}
						text={`-£${this.getTotal()}`}
					/>

				</Svg>
				</View>
			
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#afdfed"
	},
	dateStyle: {
		fontSize: 15,
		marginTop: 10,
		marginBottom:5,
		marginLeft: 10,
		marginRight:115,
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
});
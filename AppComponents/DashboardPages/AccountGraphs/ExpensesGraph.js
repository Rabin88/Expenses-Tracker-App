import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList} from 'react-native'
import { VictoryLabel, VictoryPie, VictoryLegend } from "victory-native";
import Svg from 'react-native-svg'
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

export default class Expenses extends Component {
	static navigationOptions = {
		title : 'Expense',
	}
	constructor(props) {
		super(props);
		this.state = {
			startDate: "01-01-2019",
			FinishDate: new Date(),  
			data:[
				{ _id: 'Food', total: 0 },
				{ _id: 'Travel', total: 0 },
			],
			total:0,
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
			});           
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
		this.setState({ error});      
		});  
	};
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
			<View >
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

				<Svg width={380} height={600}>
					<VictoryPie 
						standalone={false}
						colorScale={["tomato","orange", "gold","cyan", "#bd8cbd", "#68bab3", "#9997d1" ]}
						data={this.state.data}
						x = "Categories"
						y = "total"
						animate={{duration: 2000}}
						//animate={{duration: 2000, onLoad: {duration: 2000}, onEnter: {duration: 1000, before: () => ({y: 0})}}}
						innerRadius={90}
						padAngle={2}
						labelRadius={110}
						//style={{ labels: { fill: "green", fontSize: 20}}}
						labels={(item) => `${item._id.Categories}:${Math.round(item.total/this.getTotal()*100)}%`}
						// labels={(item) => `${ item._id.Categories === 'Others' && item.total=== 0 ? "" : 
						// item._id.Categories}:${item._id.Categories === 'Others' && item.total=== 0 ? "": 
						// Math.round(item.total/this.getTotal()*100)}%`}
						
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
					{/* <VictoryLegend x={30} y={200}
						orientation="horizontal"
						itemsPerRow={3}
						gutter={20}
						//style={{ border: { stroke: "black" } }}
						colorScale={["tomato","orange", "gold","cyan", "#bd8cbd", "#68bab3", "#9997d1" ]}
						//data={this.state.data}
						_id ={(item) => `${item._id.Categories}`}
					
						/> */}
				</Svg>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f5fcff"
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
		//marginTop:10,
		marginBottom:10,
		backgroundColor:'#179bbd',
		borderRadius:40,
		borderWidth: 1,
		borderColor: '#fff',
		alignSelf: 'center',
	},
});
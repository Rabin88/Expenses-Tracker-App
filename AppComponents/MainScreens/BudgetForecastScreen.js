/**
 * This is a BudgetForecastScreen class that display the monthly expenses in a line graph.
 * Moreover, it predicts the next month expense based on average income using liner regression.
 * The line graph is buid using "victory-native" library.
 */


import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, AsyncStorage} from 'react-native'
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";

export default class BudgetForecastScreeen extends Component {

	 static navigationOptions = {
		title: 'Budget Forecast',
		headerStyle: {backgroundColor: '#179bbd'},
		headerTitleStyle: {color:'white'}
	};
	constructor(props) {
		super(props);
		this.state = { 
			myKey: '',
			token: '', 
			data:[
				{ _id: 'Jan', expenses: 0 },
				{ _id: 'Feb', expenses: 0 },
				],
				// regdata:[]
		};
		this.getStorageData()
	}

	async getStorageData() {
		try {
		  const user_id = await AsyncStorage.getItem('userId');
		  const jwt_token = await AsyncStorage.getItem('token');
			
		  this.setState({myKey: user_id, token: jwt_token})
		  this.getData();
		} catch (error) {
		  //console.log("Error retrieving data" + error);
		  "Error retrieving data" + error;
		}
	  }
	
	// Function to get monthly expense data from the database
	getData(){  
		let user_id = this.state.myKey;
		fetch(`https://weareexpensetracker.herokuapp.com/api/monthlyBudget?user_id=${user_id}`, {
				method: 'GET',
				headers: {
					'Authorization': 'Bearer '+ this.state.token,
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
			})
			.then(async (res) => {
				let result = await res.json()
				//console.log(result)  

				this.setState({          
				data: result,
				// database array        
				error: res.error || null,                 
			  })
			})            
			         
		   .catch(error => {        
			 this.setState({ error});      
		   });  
	}
	
	linearRegression (dataArray) {
		/*
			y = a + bx;
			where a is y intercept
			and b is the slope
			here we have to find the value of x;
	
			slope(b) = r *sy/sx
			where
			r is the Pearson's correlation coefficient
			sy is the standard deviation of sample data x
			sx is the standard deviation of sample data x
	
			a = mean(y) - b *mean(x)
		*/
		const expenses = dataArray.map(item => item.expenses);
		const income  = dataArray.map(item => item.income);
		const slope = this.calculateSlope(income, expenses);
	
		const yIntercept = this.calculateYintercept(slope, expenses, income);
		const incomeAverage = this.findMean(income);
		//console.log(incomeAverage)
	
		//return yIntercept + (slope *  incomeForForcastingMonth);
		return yIntercept + (slope * incomeAverage);
		
	}
		
		// here x represents the array of income and y represents the array of expenses
	calculateSlope(x, y) {
		if (x.length !== y.length) {
			throw new Error('sample size of income and expense should be same');
		}
			/*
				slope(b) = r *sy/sx
			where
			r is the Pearson's correlation coefficient
			sy is the standard deviation of sample data x
			sx is the standard deviation of sample data x
	*/
	/*
		in order to calculate pearson Correlation Coefficient
			r = sumation ( (x-mean(x)) * (y -mean(y)) ) / underRoot( sum((x-mean(x)) ^2) * sum((y-mean(y)) ^2)
		*/
		const meanOfx = this.findMean(x);
		
		const meanOfy = this.findMean(y);
		const xMinusXMean = this.subtract(x, meanOfx);
		const yMinusYMean = this.subtract(y, meanOfy);
	
		// numerator of the equation
		const xMinusXMeanMultiplyYMinusYMean = this.multiply(xMinusXMean, yMinusYMean);
		//numerator of the equation is ready
		const sumOfxMinusXMeanMultiplyYMinusYMean = this.sum(xMinusXMeanMultiplyYMinusYMean);
	
		const xMinusXMeanSquare = this.square(xMinusXMean);
		const yMinusYMeanSquare = this.square(yMinusYMean);
	
		const sumOfxMinusXMeanSquare = this.sum(xMinusXMeanSquare);
		const sumOfyMinusYMeanSquare = this.sum(yMinusYMeanSquare);
	
		const denominator = (Math.sqrt(sumOfxMinusXMeanSquare * sumOfyMinusYMeanSquare));
		let pearsonCorrelationCoefficient = sumOfxMinusXMeanMultiplyYMinusYMean / denominator;
	
		if(isNaN(pearsonCorrelationCoefficient) ) {
			pearsonCorrelationCoefficient = 0;
		}
	// standard devaition of x is  = underRoot(sum((x - meanOfx)^2) / n -1) where n is the size of array
		const standardDeviationOfx =  Math.sqrt(sumOfxMinusXMeanSquare / (x.length -1));
		const standardDeviationOfy = Math.sqrt(sumOfyMinusYMeanSquare / (y.length -1))
	
		let slope = pearsonCorrelationCoefficient * (standardDeviationOfy / standardDeviationOfx);
		if(isNaN(slope) ) {
			slope = 0;
		}
		return slope;
	}
		
	calculateYintercept(slope, expenses, income) {
			// a = mean(y) - b *mean(x)
		
		const meanOfy = this.findMean(expenses);
		const meanOfX  =  this.findMean(income);
	return meanOfy - (slope * meanOfX);
	
	}
	
	findMean(a){
		return this.sum(a) / a.length;
	}
		
	subtract(a, subtractBy) {
		return a.map(num => num - subtractBy);
	}
		
	multiply(a, b) {
		const result = [];
		a.forEach((item, index)=> {
			result[index] = item * b[index];
		});
		return  result;
	}
	sum(a) {
		let total = 0;
		a.forEach(num => {
			total = total + num});
		return total;
	}

	square(a) {
		return a.map(item => item * item)
	}
		
	render() {
		this.state.data.forEach((element) => {
			if(element._id === 1) {
				element._id = 'Jan'
				return element._id
			}
			if(element._id === 2) {
				element._id = 'Feb'
				return element._id
			}
			if(element._id === 3) {
				element._id = 'Mar'
				return element._id
			}
			if(element._id === 4) {
				element._id = 'Apr'
				return element._id
			}
			if(element._id === 5) {
				element._id = 'May'
				return element._id
			}
			if(element._id === 6) {
				element._id = 'Jun'
				return element._id
			}
			if(element._id === 7) {
				element._id = 'Jul'
				return element._id
			}
			if(element._id === 8) {
				element._id = 'August'
				return element._id
			}
			if(element._id === 9) {
				element._id = 'Sept'
				return element._id
			}
			if(element._id === 10) {
				element._id = 'Oct'
				return element._id
			}
			if(element._id === 11) {
				element._id = 'Nov'
				return element._id
			}
			if(element._id === 12) {
				element._id = 'Dec'
				return element._id
			} else {
				return;
			}
		});

		const databaseData = this.state.data

		const incomeAverage = this.findMean(this.state.data.map(item => item.income));
		const expensesAverage = this.findMean(this.state.data.map(item => item.expenses));
		const ExpensesArray = this.state.data.map(item => item.expenses)
		const MinimumExpenses = Math.min(...ExpensesArray);
		const MaximumExpenses = Math.max(...ExpensesArray);

		return (
			<ScrollView>
			<View style= {styles.container}>
				<Text style= {{fontSize:15, textAlign:'center', color:'#109bad', marginTop:15}}> Monthly Expenses Chart </Text>
				<Text style= {{color:'#585759', marginLeft:5}}> £Expenses </Text>

				<VictoryChart theme={VictoryTheme.material}>
					<VictoryLine
					style={{  
					data: { stroke: "#c43a31" },
					parent: { border: "1px solid #ccc"}}}
					data= {this.state.data}
					x = "_id"
					y = "expenses"
					// labels={(item) => `£${item.expenses}`}
					/>
				</VictoryChart>
				<Text style= {{fontSize:18, textAlign:'center', marginBottom:10, color:'#109bad'}}> Budget Forecast Summary </Text>
				<View style = {styles.forecasteBox}>
					<View style ={{flexDirection:'row', borderBottomColor: '#585759', borderBottomWidth:0.5}}>
						<Text style={styles.text}> Next Month Expenses </Text>
						<Text style={styles.amount}> £{this.linearRegression(databaseData).toFixed(2)}</Text>
					</View>

					{/* <View style ={{flexDirection:'row',borderBottomColor: '#585759', borderBottomWidth:0.5}}>
						<Text style={styles.text}> Average income </Text>
						<Text style={styles.amount}> £{incomeAverage.toFixed(2)}</Text>
					</View> */}

					{/* <View style ={{flexDirection:'row',borderBottomColor: '#585759', borderBottomWidth:0.5}}>
						<Text style={styles.text}> Average expense </Text>
						<Text style={styles.amount}> £{expensesAverage.toFixed(2)}</Text>
					</View> */}

					<View style ={{flexDirection:'row',borderBottomColor: '#585759', borderBottomWidth:0.5}}>
						<Text style={styles.text}> Minimum expense </Text>
						<Text style={styles.amount}> £{MinimumExpenses.toFixed(2)}</Text>
					</View>

					<View style ={{flexDirection:'row',borderBottomColor: '#585759', borderBottomWidth:0.5}}>
						<Text style={styles.text}> Maximum expense </Text>
						<Text style={styles.amount}> £{MaximumExpenses.toFixed(2)}</Text>
					</View>
					
					{/* <Text style={styles.text}> Average income £{incomeAverage.toFixed(2)}  </Text>
					<Text style={styles.text}> Average expense £{expensesAverage.toFixed(2)}  </Text>
					<Text style={styles.text}> Minimum expense £{MinimumExpenses.toFixed(2)}  </Text>
					<Text style={styles.text}> Maximum expense £{MaximumExpenses.toFixed(2)}  </Text> */}
				</View>
				
			</View>
			</ScrollView>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		//justifyContent: "center",
		//alignItems: "center",
		//backgroundColor: "#afdfed"
	},
	forecasteBox: {
		backgroundColor: "#54ccb0",
		marginLeft: 5,
		marginRight:5,
		borderWidth:1,
		borderColor: '#585759',
	},
	text:{
		//marginTop:10,
		flex:1,
		fontSize: 15,
		color: 'black',
		marginLeft: 15,
		marginBottom:10,
		marginTop:10,
	},
	amount:{
		flex:1,
		color:'#CA1010',
		fontSize: 15,
		marginRight: 20,
		marginBottom:10,
		marginTop:10,
		textAlign:'right',
	},
});


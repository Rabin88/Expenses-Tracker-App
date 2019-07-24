import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';

export default class Dashboard extends Component {
	static navigationOptions = {
		title:'Dashboard',
		headerStyle: {backgroundColor: '#179bbd'},
		headerTitleStyle: {color:'white'}
	};
	constructor(props) {
		super(props);
		this.state = {
			startDate: "01-01-2019",
			FinishDate: new Date(),
			loading: false,      
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
				{key: "Expense",  total:500},
				{key: "Income", total:1500},
			]
		})

	}
	renderItem=({item}) => { 
		return(
			this.state.loading
			? 
			<View style={{ justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size="large" color= 'black' animating/>
			</View>
			:
			<View style={{flexDirection:'row', marginBottom: 5}}>
				<Text style={styles.welcome} > {item.key} </Text>
				<Text style={styles.amount} > £{item.total} </Text>
			</View>
			)
	}
	renderSeparator = () => {
		return (
			<View style = {{ width: '100%', borderWidth:0.2}}>

			</View>
		)
	}
	 
	render() {
		return (
			<View >
				<View >
					<Text style={styles.balance}> Balance  £1500</Text>
				</View>
				<FlatList 
					data={this.state.data}   
					renderItem={this.renderItem} 
					//keyExtractor={(item,index)=> index} 
					ItemSeparatorComponent ={this.renderSeparator}
				/>

				<TouchableOpacity style = {styles.button} > 
				<Button onPress={() => this.props.navigation.navigate('CategoriesPage')} color = 'white' title="View Transactions"/>
				</TouchableOpacity> 
				
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		//alignItems: 'center',
		backgroundColor: '#F5FCFF',	
	},
	balance: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 30,
		marginBottom:30,
	},
	welcome: {
		flex:1,
		fontSize: 20,
		marginLeft: 5,
		backgroundColor: '#c8d0db',
		padding: 15,
		height: 60,
		color: 'black',
	},
	amount: {
		flex:1,
		fontSize: 20,
		marginRight: 5,
		textAlign: 'right',
		backgroundColor: '#c8d0db',
		padding: 15,
		height: 60,
		color: 'black'
	},
	button:{
		width: 200,
		marginTop:40,
		backgroundColor:'#179bbd',
		borderRadius:40,
		borderWidth: 1,
		borderColor: '#fff',
		alignSelf: 'center',
	},
	
});

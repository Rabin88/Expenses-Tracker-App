import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';


export default class Shopping extends Component {
	static navigationOptions = {
		title:'Shopping',
		headerStyle: {backgroundColor: '#179bbd'},
		headerTitleStyle: {color:'white'}
	};
	constructor(props) {
		super(props);
		this.state = {    
			data: [],
		};
	}
	 componentDidMount (){   

		  const url = `http://localhost:3000/api/categories/merchant/shopping`;
		  this.setState({ loading: true });
				
		    fetch(url)      
		      .then(res => res.json())      
		      .then(res => {        
		        this.setState({          
		          data: res,  // database array        
		          error: res.error || null,                 
		        });        
		     })      
		     .catch(error => {        
		       this.setState({ error});      
		     });  
		  };

	renderItem=({item}) => { 
		return(
            <View style={{flexDirection:'row', marginBottom: 5}}>
                <Text style={styles.merchant} >  {item._id.Merchant} </Text>
                <Text style={styles.creditAmount} > - £{item.total.toFixed(2)} </Text>
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
			<View style={styles.container}>
			
				<Text style={styles.heading}> Transactions </Text>

				<FlatList 
					data={this.state.data}   
					renderItem={this.renderItem} 
					keyExtractor={(item,index)=> index.toString()} 
					ItemSeparatorComponent ={this.renderSeparator}
				/>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
		//justifyContent: 'center',
		//alignItems: 'center',
		backgroundColor: '#afdfed',	
    },
    heading: {
		fontSize: 20,
		marginLeft: 5,
		backgroundColor: '#afdfed',
		padding: 15,
        color: 'black',
        alignSelf: 'center'    
	},
    merchant: {
        flex:1,
        backgroundColor: '#e1e8e5',
        fontSize: 20,
        padding: 20,
        marginLeft: 5,
        height: 70,
        color: 'black',	
    },
    creditAmount: {
        flex:1,
        backgroundColor: '#e1e8e5',
        fontSize: 20,
        padding: 20,
        marginRight: 5,
        height: 70,
        textAlign: 'right',
        color: 'red'
    },
	
});
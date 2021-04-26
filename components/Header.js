/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { Navigation } from "react-native-navigation";

import React,{Component} from 'react';
import {
   StyleSheet,
  View,
  Image, 
  StatusBar,
  Alert,
  TouchableHighlight,
  Button
} from 'react-native';
   

class Header  extends Component {
	
	 constructor(){		
		super();
		Navigation.events().bindComponent(this)
		this.state={
			about:'', 			
		}
		}
	
	  
	   componentDidMount=()=>{
		
	 let URL="https://www.tbn24.com/api/about";
		let config={method:'GET'}
		fetch(URL,config).then((result)=>result.json()).then((response)=>{	
	 			this.setState({about:response.replace(/(<([^>]+)>)/gi, "")});
		}).catch((error)=>{
			 
			Alert.alert("Internet Problem"); 
		});
		
				
	}
	
	sideMenuShow=()=>{	
 		Navigation.mergeOptions(this.props.componentId,{			
			sideMenu:{
				left:{
					visible:true
				}
			}
		});
	
	}

	 
	
	render(){
  return (  
  
  <View style={{flex:10,flexDirection:'row',marginTop:0, backgroundColor:'#B10000'}}> 
<View style={{flex:8}}>  
	 <Image  style={styles.logo}  source={{uri:'https://www.tbn24.com/public/logo.png'}} />
	 </View>
	<View style={{flex:2}}> 
	<TouchableHighlight  underlayColor='none' onPress={this.sideMenuShow}>	
	<Image   style={{width:50,marginTop:20}}  source={require('../images/menu.png')} />
	
	</TouchableHighlight>
	</View> 	
	</View>
  );
	}
}

const styles = StyleSheet.create({
	 
  logo:{
		width:300,
		height:80,
		marginTop:2
	},
   
});

export default Header;

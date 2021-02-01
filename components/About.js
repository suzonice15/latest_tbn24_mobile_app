/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { Navigation } from "react-native-navigation";
import Program from "./Program";
import moment from 'moment';

import React,{Component} from 'react';
import {
   StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Alert,
  TouchableHighlight,
  Button
} from 'react-native';
   

class About  extends Component {
	
	 constructor(props){
		
		super(props);
		Navigation.events().bindComponent(this)
		 this.state={
			pageTitle:'',
			pageDescription:'',
			loading:true,

		}
	}
	 
	
	
	  
	   componentDidMount=()=>{
		
	 let URL="https://www.tbn24.com/api/page/"+this.props.page_name;
		let config={method:'GET'}
		fetch(URL,config).then((result)=>result.json()).then((response)=>{	
	 			this.setState({loading:false,pageTitle:response.pageTitle,pageDescription:response.pageContent.replace(/(<([^>]+)>)/gi, "")});
		}).catch((error)=>{
			 
			Alert.alert("No Internet Connection","You need to be connected to your network or Wi-Fi or Mobile Data"); 
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
  
  
    <View style={{flex:100,width:"100%"}}>

 
	
	 <View style={{flex:92,width:"100%",backgroundColor:'white',margin:5}}>
	<ScrollView style={{marginTop:0}}>
   <Text style={{fontSize:25,color:'black',textAlign:'center'}}>
	{this.state.pageTitle}
</Text>
 {
			this.state.loading ?
	     <ActivityIndicator  style={{fontSize:30,marginTop:100}}size="large" color="red" />:null
			 
		 }
		

<Text style={{textAlign:'left',paddingLeft:10,color:'black',margin:5,fontSize:15}}>

	{this.state.pageDescription}
	
 
	 

	</Text>
	</ScrollView>
	</View>


	 
		
  
  
 <View style={{flex:6,flexDirection:'row',color:'white',width:'100%',padding:10, backgroundColor:'#5A0000'}}>
	<View style={{flex:2,justifyContent:'center','alignItems':'center'}} >
<TouchableHighlight  underlayColor='none' onPress={()=>{

		Navigation.push(this.props.componentId, {
			component: {
				name: 'HomePage', // Push the screen registered with the 'Settings' key
				options: { // Optional options object to configure the screen
					topBar: {
						title: {
							text: 'Home' // Set the TopBar title of the new Screen
						}
					}
				}
			}
		})
	}}>

<Image   style={{height:30}} source={require('../images/live.png')} />
</TouchableHighlight>


	<Text style={{color:'white'}} >Live</Text>

	</View>
	<View style={{flex:2,justifyContent:'center','alignItems':'center'}} >
<TouchableHighlight  underlayColor='none' onPress={()=>{

		Navigation.push(this.props.componentId, {
			component: {
				name: 'ProgramPage', // Push the screen registered with the 'Settings' key
				options: { // Optional options object to configure the screen
					topBar: {
						title: {
							text: 'Program' // Set the TopBar title of the new Screen
						}
					}
				}
			}
		})
	}}>
<Image  style={{height:30}}   source={require('../images/program.png')} />
</TouchableHighlight>

<Text style={{color:'white'}} >Programs</Text>

	</View>
	<View style={{flex:2,justifyContent:'center','alignItems':'center'}} >
<TouchableHighlight  underlayColor='none' onPress={()=>{

		Navigation.push(this.props.componentId, {
			component: {
				name: 'VideoPage', // Push the screen registered with the 'Settings' key
				options: { // Optional options object to configure the screen
					topBar: {
						title: {
							text: 'Videos' // Set the TopBar title of the new Screen
						}
					}
				}
			}
		})
	}}>
<Image    style={{height:30}}   source={require('../images/youtube.png')} />
</TouchableHighlight>

<Text style={{color:'white'}} >Videos</Text>

	</View>

 

	</View>

  </View>
     
  );
	}
}

const styles = StyleSheet.create({
	 
   backgroundVideo: {
    position: 'relative',
	height:300    
  },
  logo:{
		width:300,
		height:80,
		marginTop:2
	},
   
});

export default About;

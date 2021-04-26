/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {
   StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  FlatList,
  StatusBar,
  Button,
  Alert,
  TouchableHighlight,
  TextInput
} from 'react-native';
 import Video from 'react-native-video';
  import { Navigation } from "react-native-navigation";


class Contact  extends Component {
	
	 constructor(props){
		 super(props)
	 this.state={
		 name:'',
		 email:'',
		 subject:'',
		 message:''
		 
	 }
	 }
	 contactStore=()=>{


		if(this.state.name==''){
			Alert.alert('Enter Your Name')
			return false;
		}
		if(this.state.email==''){
			Alert.alert('Enter Your Email')
			return false;
		}
		if(this.state.subject==''){
			Alert.alert('Enter Your Subject')
			return false;
		}
		if(this.state.message==''){
			Alert.alert('Enter Your Message')
			return false;
		}
		 let URL='https://www.tbn24.com/api/contact/store';
		 let configHeader={
			 Accept:'application/json',
			 'Content-Type':'application/json'
		 }
		 let configBody=JSON.stringify({
			 contact_name:this.state.name,
			 contact_email:this.state.email,
			 contact_subject:this.state.subject,
			 contact_message:this.state.message
			 
		 });
		 let config={method:'POST',headers:configHeader,body:configBody}
		 fetch(URL,config).then((response)=>response.text())
		 .then((responsData)=>{
 			  Alert.alert(responsData)
		 }).catch((erorr)=>{
			Alert.alert("No Internet Connection","You need to be connected to your network or Wi-Fi or Mobile Data"); 
		 })
		 
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
   
	 <View style={{flex:94,width:"100%",marginTop:0,backgroundColor:'white'}}>
 

<ScrollView>
	<View style={{textAlign:'center',padding:10}}>
<Text style={{fontSize:25,marginTop:-13,color:'black',textAlign:'center'}}>
Contact With Us
</Text>

 
 <TextInput onChangeText={(value)=>this.setState({name:value})}
        style={styles.formField}
        placeholder="Enter Your Name"
         
      />
	  
	  
	   <TextInput
	   
	   onChangeText={(value)=>this.setState({email:value})}
	   style={styles.formField}
        placeholder="Enter Your Email"
         
      />
	   <TextInput
	   onChangeText={(value)=>this.setState({subject:value})}
	   style={styles.formField}
        placeholder="Subject Name"
         
      />
	 
	  <TextInput
	  onChangeText={(value)=>this.setState({message:value})}
    multiline={true}
	 placeholder="Enter Your Message"
    numberOfLines={5}
    style={{fontSize:20,margin:3,height:100,   borderColor: 'black',
      borderWidth: 1,textAlignVertical: 'top',}}/>
	  
	  
	  <View style={{backgroundColor:'red',margin:2}} >  
     
	  <TouchableHighlight  underlayColor='none' onPress={this.contactStore}>
<Text style={styles.submit}  >Send Message</Text>
</TouchableHighlight>
	  </View>
	  
	  <Text style={{fontSize:25,color:'black',textAlign:'center'}}>
Contact info 
</Text>

 
	  <View style={{backgroundColor:'white',flex:100, borderColor: 'black',
      borderWidth: 1}} > 
	  
	  <View style={{backgroundColor:'white',borderBottomWidth:1,padding:10}} > 
	    <Text style={{fontSize:20,color:'black',textAlign:'left'}}>
Contact info 
</Text>

 <Text style={{fontSize:17,color:'black',fontWeight:'normal',textAlign:'left'}}>
37-19, 57th street
woodside,NY-11377 United States 
</Text>
 </View>   
   
	  <View style={{backgroundColor:'white',borderBottomWidth:1,padding:10}} > 
	    <Text style={{fontSize:20,color:'black',textAlign:'left'}}>
Email
</Text>

 <Text style={{fontSize:17,color:'black',fontWeight:'normal',textAlign:'left'}}>
 info@tban24.com 
</Text>
 </View> 
   
	  <View style={{backgroundColor:'white',borderBottomWidth:1,padding:10}} > 
	    <Text style={{fontSize:20,color:'black',textAlign:'left'}}>
Hotline </Text>

 <Text style={{fontSize:17,color:'black',fontWeight:'normal',textAlign:'left'}}>
 +1(718)808-9000 
</Text>
 </View>  
  
     
	  </View>	  
	  </View>
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
	 
   formField: {
	margin: 3,
	height: 35,
	padding:5,
	alignItems:'center',
	fontSize:20,
	borderColor: 'black',
	borderWidth: 1 
  },
  submit:{
	fontSize:18,
	borderColor: 'red',
	padding:5,
	color:'white',
	borderWidth:1,
	backgroundColor:'red',
	textAlign: 'center',
  },
  logo:{
		width:300,
		height:80,
		marginTop:2
	},
   
});

export default Contact;

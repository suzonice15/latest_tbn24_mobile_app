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
   View,
  Image,
  Text,
  Alert,
   TouchableHighlight,
  Button,
  TouchableOpacity,
  TextInput
} from 'react-native';
 import Video from 'react-native-video';
   import { Navigation } from "react-native-navigation";


class Login  extends Component {
	
	
	constructor(props){		
		super(props);
		Navigation.events().bindComponent(this)
		this.state={
			 
			email:'',
		 
			password:'',			 
			loginButton:"Login",
		 
		}
	}

	loginSubmit=()=>{
		this.setState({loginButton: "Please Wait...."})
if(this.state.email==''){
	this.setState({loginButton: "Login"})
	Alert.alert('Please Enter Your Email !')
	return false;
}
if(this.state.password==''){
	this.setState({loginButton: "Login"})
	Alert.alert('Please Enter Your Password !')
	return false;
}
 
let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if (reg.test(this.state.email) === false) {
		Alert.alert('Please Enter Your Valid Email !')
		this.setState({loginButton: "Login"})
  return false;
}


var URL='https://www.tbn24.com/api/home/loginCheck';
var configHeader={
			 Accept:'application/json',
			 'Content-Type':'application/json'
		 }
		 var configBody=JSON.stringify({
		 
			 email:this.state.email,
			 password:this.state.password,
 			 
		 });
		 var config={method:'POST',headers:configHeader,body:configBody}
		 fetch(URL,config).then((response)=>response.json())
		 .then((responsData)=>{	
		 
			if(responsData.error=='ok'){
				Alert.alert("Your Email Or Password Invalid Try Again")
				this.setState({loginButton: "Login"})

			} else {
	 
				Alert.alert("Login Success")
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
			}
			  
		 }).catch((erorr)=>{
			Alert.alert("No Internet Connection","You need to be connected to your network or Wi-Fi or Mobile Data"); 
			this.setState({loginButton: "Login"})
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

	Registration=()=>{
	
	
		Navigation.push('CenterScreen',{
			
			component:{
				name:"RegistrationPage",
				options:{
					sideMenu:{
						left:{
							visible:false						
						}
					}
					, topBar: {
		title: {
		  text: 'Registration',
		  color: 'white'
		}
					  }
				}
			}
		})
	}
	
	render(){
  return ( 
  
   <View style={{flex:100,width:"100%"}}> 	
   
	
		 <View style={{flex:94,width:"100%",backgroundColor:'white',margin:10}}>

   <View style={{backgroundColor:'white',borderColor: 'black',
      borderWidth:1,marginRight:20,marginBottom:200}} >  
  <Text style={{fontSize:20,color:'black',textAlign:'center',borderBottomWidth:1,paddingBottom:10}}>
Login Form</Text>

  <Text style={{fontSize:17,color:'black',textAlign:'left',paddingBottom:1,marginTop:5,marginLeft:18}}>
 E-Mail Address 
 </Text>
 
 <TextInput
  onChangeText={(value)=>this.setState({email:value})}
        style={{ margin: 10,
      height: 40,fontSize:20,padding:5,
      borderColor: 'black',
      borderWidth: 2}}
        placeholder="Enter Your Email"
         
      />
	  
	  
	   <Text style={{fontSize:17,color:'black',textAlign:'left',paddingBottom:1,marginTop:5,marginLeft:18}}>
Password </Text>
	  
	   <TextInput
	     secureTextEntry={true}
		 onChangeText={(value)=>this.setState({password:value})}

        style={{ fontSize:20,margin: 10,
      height: 40,
      borderColor: 'black',padding:5,
      borderWidth: 2}}
        placeholder="Enter Your Password"
         
      />	   
	    

	  <View style={{backgroundColor:'white',margin:8,marginBottom:50}} >  
     
	  <TouchableHighlight  underlayColor='none'
	 
	 onPress={() => {
	 
		this.loginSubmit();}} 
	  >
<Text style={styles.submit}  >{this.state.loginButton}</Text>

</TouchableHighlight>

  

<View style={{backgroundColor:'white',marginTop:20,}} > 

<View style={{backgroundColor:'white',textAlign:'center'}}>
<Text  style={{color:'black',textAlign:'center',fontSize:18}}>New to tbn24 ? </Text>
</View>
 
<TouchableHighlight  underlayColor='none'
	 
	 onPress={() => {
	 
		this.Registration();}} 
	  >
<Text 
 
 style={{color:'green',textAlign:'center',fontSize:18}}
>Create an account .</Text>
</TouchableHighlight>

 
</View>

	  </View>

	  


  </View>
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

export default Login;

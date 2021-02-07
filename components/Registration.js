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
  Alert,
  Button,
  TouchableHighlight,
  TextInput
} from 'react-native';
 import Video from 'react-native-video';
    import { Navigation } from "react-native-navigation";
	import AsyncStorage from '@react-native-async-storage/async-storage';



class Registration  extends Component {
	

 constructor(props){
		 super(props)
	 this.state={
		 name:'',
		 email:'',
		 phone:'',
		 password:'',
		 message:'',
		 Registration:"Registration Now",
		 user_id:"",
		 
	 }
	 }
	 
	 
	  storeSessionData = async () => {
  try {
	 var user_id= this.state.user_id;
	 
	  const jsonValue = JSON.stringify(user_id)
    await AsyncStorage.setItem('loginUser', jsonValue)
  } catch (e) {
    // saving error
  }
}
	 
	 Login=()=>{
	
	
	Navigation.push('CenterScreen',{
		
		component:{
			name:"LoginPage",
			options:{
				sideMenu:{
					left:{
						visible:false						
					}
				}
				, topBar: {
    title: {
      text: 'Login',
      color: 'white'
    }
				  }
				  ,
				    bottomTab: {
    text: 'Settings'
  }
			}
		}
	})
}
	 dataStore=()=>{
		this.setState({Registration: "Please Wait...."})

		 if(this.state.name==""){
			  Alert.alert('Enter Your Name')
			  this.setState({Registration: "Registration Now"})
			 return false;
		 }
		  if(this.state.email==""){
			this.setState({Registration: "Registration Now"})

			  Alert.alert('Enter Your Email')
			 return false;
		 }
		 
		 let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(this.state.email) === false) {
	this.setState({Registration: "Registration Now"})

    	  Alert.alert('Enter Valid Email')
     
    return false;
  }
		  if(this.state.phone==""){
			this.setState({Registration: "Registration Now"})

			  Alert.alert('Enter Your phone')
			 return false;
		 }
		  if(this.state.password==""){
			this.setState({Registration: "Registration Now"})

			  Alert.alert('Enter Your password')
			 return false;
		 }
		 
		 let URL='https://www.tbn24.com/api/registration/store';
		 let configHeader={
			 Accept:'application/json',
			 'Content-Type':'application/json'
		 }
		 let configBody=JSON.stringify({
			 name:this.state.name,
			 email:this.state.email,
			 phone:this.state.phone,
			 password:this.state.password
			 
		 });
		 let config={method:'POST',headers:configHeader,body:configBody}
		 fetch(URL,config).then((response)=>response.text())
		 .then((responsData)=>{
 			
			 			this.setState({user_id: responsData})

				this.storeSessionData();
				
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
		 }).catch((erorr)=>{
			this.setState({Registration: "Registration Now"})

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
   
	
	
	 <View style={{flex:94,width:"100%",backgroundColor:'white'}}> 
	  <Text style={{fontSize:20,color:'black',textAlign:'center',borderBottomWidth:1,paddingBottom:10}}>
Registration Form</Text>
  <ScrollView>  
 

<View style={{margin:10}}>

  <Text  style={styles.fieldRow}>
 Full Name  </Text>
 
 <TextInput
 onChangeText={(value)=>this.setState({name:value})}
        style={styles.formField}
        placeholder="Enter Your  Full Name "
         
      />
  <Text  style={styles.fieldRow}>
 E-Mail Address 
 </Text>
 
 <TextInput
 onChangeText={(value)=>this.setState({email:value})}
 style={styles.formField}
        placeholder="Enter Your Email"
         
      />
	  
	  
  <Text  style={styles.fieldRow}>
 Phone   </Text>
 
 <TextInput
 onChangeText={(value)=>this.setState({phone:value})}
 style={styles.formField}
        placeholder="Enter Your  Phone  "
         
      />
	  
	  
	   <Text style={styles.fieldRow}>
Password </Text>
 
	  
	   <TextInput
	   
	   secureTextEntry={true}
	   onChangeText={(value)=>this.setState({password:value})}
       style={styles.formField}
        placeholder="Enter Your Password"
         
      /> 
	   
	  <View style={{backgroundColor:'red',width:'100%',  marginBottom:15,marginTop: 8}} >  
 
	  

      
	 <TouchableHighlight  onPress={this.dataStore}  underlayColor='none' >
<Text style={styles.submit}  > {this.state.Registration}</Text>
 
</TouchableHighlight>


<View style={{backgroundColor:'white',marginTop:20,}} > 

<View style={{backgroundColor:'white',textAlign:'center'}}>
<Text  style={{color:'black',textAlign:'center',fontSize:18,marginTop:10}}> Already have an account ?</Text>
</View>
 
<TouchableHighlight  underlayColor='none'
	 
	 onPress={() => {
	 
		this.Login();}} 
	  >
<Text 
 
 style={{color:'green',textAlign:'center',fontSize:18}}
>Login</Text>
</TouchableHighlight>

 
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
	submit:{
		fontSize:18,
		borderColor: 'red',
		padding:2,
		color:'white',
		borderWidth:1,
		marginTop:10,
		backgroundColor:'red',
		textAlign: 'center',
		height:25,
	  },
	  fieldRow:{
		  fontSize:18,
		  color:'black',
		  textAlign:'left',
		  paddingBottom:1,
		  marginTop:5,
		  marginLeft:2
	  },
	  formField: {
		margin: 3,
		height: 35,
		padding:5,
		alignItems:'center',
		fontSize:20,
		borderColor: 'black',
		borderWidth: 1 
	  },
  logo:{
		width:300,
		height:80,
		marginTop:2
	},
   
});

export default Registration;

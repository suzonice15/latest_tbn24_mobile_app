/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import { Navigation } from "react-native-navigation";
 
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TextInput,
  Text,
  TouchableHighlight,
  ActivityIndicator,
   TouchableOpacity,
  Modal,
  StatusBar,
  FlatList,
  Alert
} from 'react-native';
 import Video from 'react-native-video';
  
 import { RadioButton } from 'react-native-paper';


class Home  extends Component {
	
	
	constructor(props){		
		super(props);
		Navigation.events().bindComponent(this)
		this.state={
			video:'https://dog.dg21bd.com/TBN24WEBUSA/index.m3u8',
			nextProgramImage:"1600861349.jpg", 
			upcommingProgramImage:"1601996603.jpg",	
			nextProgramTitle:"কুরআনের আলো"	,
			upcommingProgramTitle:"TBN24 রাতের সংবাদ",	
			loading:true, 
			isVisible: false	,
			loginNotice:'',		
			registrationNotice:'',
			email:'',
			loginModalShowStatus:1,	
			password:'',
			user_id:0,
			showRegistrationModal:false,
			modalVisible: false,
			loginButton:"Login",
			mute:false,
			Data:[],
			pulls:[],
			miniteShowNotice:false,
			programClassActive:true,
			chatClassActive:false,
			pollClassActive:false,
			nextProgramDeatail:"",
			nextProgamProgram_id:"",
			upcommingProgramDeatail:"",
			upcommingProgamProgram_id:"",
			pollAnswer:"",
			submitVote:"Vote"
		}
	}
	
	
	navigationButtonPressed({componentId}){
		Navigation.mergeOptions(this.props.componentId,{			
			sideMenu:{
				left:{
					visible:true
				}
			}
		});
	}

	toggleModal(visible) {
		this.setState({ modalVisible: visible });
	 }
	   componentDidMount=()=>{
		 
this.homeProgam();

setInterval(()=>{		 
	this.homeProgam();
	
  }, 450000);

		
	 var URL="https://www.tbn24.com/api/video";
	 var config={method:'GET'}
		fetch(URL,config).then((result)=>result.json()).then((response)=>{	
	 			this.setState({video:response,loading:false});
		}).catch((error)=>{
			 
			Alert.alert("No Internet Connection","You need to be connected to your network or Wi-Fi or Mobile Data"); 
		});	
		
	this.allPull();
		var URLNotice="https://www.tbn24.com/api/modal/notice";
		var configNotice={method:'GET'}
		fetch(URLNotice,configNotice).then((result)=>result.json()).then((response)=>{	
	 			this.setState({registrationNotice:response.five_minite,loginNotice:response.one_hour});
		}).catch((error)=>{
			Alert.alert("No Internet Connection","You need to be connected to your network or Wi-Fi or Mobile Data"); 

			 
		});	
	
		setInterval(()=>{
			if(this.state.user_id < 1){
			this.setState({isVisible: true,miniteShowNotice:true,mute:true})
			}
			
		  }, 500000);

		  setInterval(()=>{
		 
			this.setState({isVisible: true,miniteShowNotice:false,mute:true})
			 
			
		  }, 3600000);
		
	}
allPull(){
	var URLPull="https://www.tbn24.com/api/pulls";
	var configPull={method:'GET'}
	   fetch(URLPull,configPull).then((result)=>result.json()).then((response)=>{	
				this.setState({pulls:response});
	   }).catch((error)=>{
			
		});	
}
	homeProgam(){

		var URLP="https://www.tbn24.com/api/home/program";
		let configG={method:'GET'}
		fetch(URLP,configG).then((result)=>result.json()).then((response)=>{	
	 			this.setState({
					nextProgramTitle:response.nextProgramTitle,
					nextProgramImage:response.nextProgramImage,
					upcommingProgramTitle:response.upcommingProgramTitle,
					upcommingProgramImage:response.upcommingProgramImage,
					nextProgramDeatail:response.nextProgramDeatail,
					nextProgamProgram_id:response.nextProgamProgram_id,
					upcommingProgramDeatail:response.upcommingProgramDeatail,
					upcommingProgamProgram_id:response.upcommingProgamProgram_id		 
					,loading:false,
					 refressicon:false});
		}).catch((error)=>{
			this.setState({loading:false,refressicon:false});
			
			 Alert.alert(
      'No Internet Connection',
      'You need to be connected to your network or Wi-Fi');
			  

			
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
	
	radioButtonHandle(value){
		this.setState({
			pollAnswer:value
		})

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
	this.setState({loginButton: "Login"})
		Alert.alert('Please Enter Your Valid Email !')
   
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
				this.setState({mute:false,isVisible: false,user_id:responsData.user_id})
				this.setState({loginButton: "Login"})
 
			}
			  
		 }).catch((erorr)=>{
			Alert.alert("No Internet Connection","You need to be connected to your network or Wi-Fi or Mobile Data"); 
			this.setState({loginButton: "Login"})
		 })
		 
	


	  }

	  voteSubmit=(pull_id)=>{
		  this.setState({
			submitVote:"Please Wait ..."
		  })
		  if(this.state.pollAnswer==''){
			  Alert.alert("Please Enter Vote Option");
			  this.setState({
				submitVote:"Vote"
			  })
		  } else {
			var url="https://www.tbn24.com/api/pull/"+pull_id+"/"+this.state.pollAnswer;
			var config={method:'GET'}
			   fetch(url,config).then((result)=>result.json()).then((response)=>{	
				this.allPull();
				var URLPull="https://www.tbn24.com/api/pulls";
				var configPull={method:'GET'}
				   fetch(URLPull,configPull).then((result)=>result.json()).then((response)=>{	
							this.setState({pulls:response});
				   }).catch((error)=>{
					this.allPull();
					});	
				
					this.setState({
						submitVote:"Vote"
					  })
			   }).catch((error)=>{
				this.allPull();
				this.setState({
					submitVote:"Vote"
				  })
				});	
		  }
		 
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

	// if(programClassActive){

	// 	let programClass=styles.homeChatViewWithBackground;

	// } else {


	// }
	 
	 
	
	render(){
  return ( 
  
  
    <View style={{flex:100,width:"100%"}}> 	
   
	
	
	 <View style={{flex:94,width:"100%",backgroundColor:'white'}}>
	 <View style={{flex:35,width:'100%'}}>

	 
		<View style={{padding:5}}>
		  
		 <Video
		 source={{ uri: this.state.video }}
		//  rate={1.0}
		// volume={1.0}
		 isMuted={this.state.mute}
		 
		 resizeMode="cover"
		 shouldPlay={false}
		 useNativeControls={true}
		 isLooping
		 style={{ width: '100%',padding:100,marginTop:2,height: 150 }}
	   /> 
	   </View>


<View style={{margin:100,padding:10,width:"80%",height:"80%"}}>
<Modal
            animationType = {"slide"}
            transparent={false}
            visible={this.state.isVisible}
            onRequestClose={() => {
			  
			  this.setState({isVisible: false,mute:false,})
            }}>

<View style={{margin:10}}>
              <Text style = { styles.text }>
				  {this.state.miniteShowNotice ? this.state.registrationNotice:this.state.loginNotice}
              </Text>
				  <Text  style={styles.fieldRow}>
 E-Mail Address 
 </Text>
 
 <TextInput
 onChangeText={(value)=>this.setState({email:value})}
 style={styles.formField}
        placeholder="Enter Your Email"
         
      /> 
  
	  
	  
	   <Text style={styles.fieldRow}>
Password </Text>
 
	  
	   <TextInput
	   
	   secureTextEntry={true}
	   onChangeText={(value)=>this.setState({password:value})}
       style={styles.formField}
        placeholder="Enter Your Password"
         
      /> 
	    

	  <View style={{backgroundColor:'red',marginTop:5}} >  
     
	  <TouchableHighlight  underlayColor='none' 
	  
	  onPress={() => {
		this.loginSubmit();}}
	  >
<Text style={styles.submit}  >{this.state.loginButton}</Text>
</TouchableHighlight>

</View>


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
                
          </Modal>
            
         
</View>



</View>



 
<View style={{flex:54,color:'black',backgroundColor:'white'}}>
	 
<View style={{flex:6,marginTop:0,flexDirection:'row',height:40,padding:5}}>
 
			<View style={ this.state.chatClassActive ? styles.homeChatViewWithBackground : styles.homeChatView}>
	<Text onPress={()=>{
		this.setState({
			programClassActive:false,
			chatClassActive:true,
			pollClassActive:false
		})
	}} style={styles.chatText}>Chat </Text>
	</View>
	<View style={ this.state.programClassActive ? styles.homeChatViewWithBackground : styles.homeChatView}>
	<Text onPress={()=>{
		this.setState({
			programClassActive:true,
			chatClassActive:false,
			pollClassActive:false
		})
	}} style={styles.chatText}>Programs </Text>
	</View>
	<View style={ this.state.pollClassActive ? styles.homeChatViewWithBackground : styles.homeChatView}>
	<Text   onPress={()=>{
		this.setState({
			programClassActive:false,
			chatClassActive:false,
			pollClassActive:true
		})
	}}style={styles.chatText}>Poll </Text>
	</View>
	 
	
	
</View>

{  this.state.programClassActive ?
	
<View style={{flex:36,color:'white',marginTop:5,flexDirection:'row',width:'100%',height:"100%",backgroundColor:'white'}}>


<View style={styles.homeProgramShadow}>	
<Text style={styles.homeProgramTitle}>Next Program </Text>

<TouchableHighlight 
		 underlayColor='none'

		 
 onPress={()=>{
 		Navigation.push(this.props.componentId, {
			component: {
				name: 'SingleProgramPage', // Push the screen registered with the 'Settings' key
				options: { // Optional options object to configure the screen
					topBar: {
						title: {
							text: `${this.state.nextProgramTitle}` // Set the TopBar title of the new Screen
						}
					}
				},
					passProps: {
	  program_id:  `${this.state.nextProgamProgram_id}`,
	  programName:  `${this.state.nextProgramTitle}`,
	  programDescription:  `${this.state.nextProgramDeatail}`,
	  program_image:  `${this.state.nextProgramImage}`,
	  
	}
			}
		})
	}}>		 

<Image 
source={{uri:'https://www.tbn24.com/public/uploads/program/'+this.state.nextProgramImage}}  style={{height:195,padding:5,width:"100%"}}/>
</TouchableHighlight>
<Text style={styles.homeProgramButtonTitle} >{this.state.nextProgramTitle} </Text>
</View>
 


<View style={styles.homeProgramShadow}>
<Text style={styles.homeProgramTitle}>Upcoming </Text>

<TouchableHighlight 
		 underlayColor='none'

		 
 onPress={()=>{
 		Navigation.push(this.props.componentId, {
			component: {
				name: 'SingleProgramPage', // Push the screen registered with the 'Settings' key
				options: { // Optional options object to configure the screen
					topBar: {
						title: {
							text: `${this.state.upcommingProgramTitle}` // Set the TopBar title of the new Screen
						}
					}
				},
					passProps: {
	  program_id:  `${this.state.upcommingProgamProgram_id}`,
	  programName:  `${this.state.upcommingProgramTitle}`,
	  programDescription:  `${this.state.upcommingProgramDeatail}`,
	  program_image:  `${this.state.nextProgramImage}`,
	  
	}
			}
		})
	}}>
<Image source={{uri:'https://www.tbn24.com/public/uploads/program/'+this.state.upcommingProgramImage}}  style={{height:195,padding:5,width:"100%"}}/>

</TouchableHighlight>
<Text style={styles.homeProgramButtonTitle}>{this.state.upcommingProgramTitle} </Text>
</View>

 </View>: null
	
	}

{  this.state.chatClassActive ?

<View style={{flex:36,color:'white',height:"100%",marginTop:5,flexDirection:'row',width:'100%',backgroundColor:'white'}}>


 </View>: null
	
	}

{  this.state.pollClassActive ?

<View style={{flex:36,height:"100%",color:'white',marginTop:5,flexDirection:'column',width:'100%',backgroundColor:'white'}}>
<ScrollView>
{this.state.pulls.map(pull=>
<View key={pull.pull_question} style={{padding:10}}>
<Text style={{color:'black',marginLeft:5,fontSize:20,fontWeight:'bold'}}>{pull.pull_question}</Text>

{pull.options.map(option=>
<View style={{flexDirection:'row'}}>
{pull.already_given_vote == 0 ?
	  <RadioButton
	  value={option.pull_add_option_id}
	  status={ this.state.pollAnswer  ===  option.pull_add_option_id ? 'checked' : 'unchecked' }
	  onPress={this.radioButtonHandle.bind(this, option.pull_add_option_id)}
	/>
	 :	 null
	  }

	  <Text style={{marginTop:5}}>{option.option_name}</Text>
	  <Text style={{marginTop:5}}> ({option.vote_percent}%)</Text>
	  </View>
	)}
	  {pull.already_given_vote == 0 ?
	  <Text onPress={this.voteSubmit.bind(this, pull.pull_id)} style={{marginTop:5,fontSize:18,width:'100%',textAlign:'center',padding:8,color:'white',backgroundColor:'green'}}> {this.state.submitVote} </Text>
	 :	  <Text  style={{marginTop:5,fontSize:18,width:'100%',textAlign:'center',padding:8,color:'white',backgroundColor:'green'}}> You already given vote </Text>
	  }
	  </View>


)}


</ScrollView>
 </View>: null
	
	}


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
	 
    
  homeCategoryTitle:{
color:'black',
fontSize:15,
textAlign:'center'
  },
  homeProgramTitle:{
textAlign:'center',
fontSize:17,
color:'green',
fontWeight:'bold',
marginBottom:5
  },
  homeProgramButtonTitle:{
	textAlign:'center',
	fontSize:17,
	height:40,
	padding:5,
	color:'white',
backgroundColor:'red'
	  },
  homeProgramShadow:{
	width:'50%',
	height:'50%',
	margin:5,
	backgroundColor:'#ddd',
	padding:5,
	shadowColor: "#000",
	shadowOffset: {
		width: 0,
		height: 4,
	},
	shadowOpacity: 0.30,
	shadowRadius: 4.65,
	
	elevation: 8,
  },
  homeChatView:{
  flex:2,
  backgroundColor:'black',
 borderWidth:1,
 justifyContent:'center',
 alignItems:'center',
 borderColor:'black',
 color:'black'
  },
  homeChatViewWithBackground:{
	backgroundColor:'red',
	flex:2,
	borderWidth:1,
	justifyContent:'center',
	alignItems:'center',
	borderColor:'black',
	color:'white'
  },
   chatText:{
	   color:'white'
   },
  logo:{
		width:300,
		height:80,
		marginTop:0
	},
	button: {
		display: 'flex',
		height: 60,
		borderRadius: 6,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		backgroundColor: '#2AC062',
		shadowColor: '#2AC062',
		shadowOpacity: 0.5,
		shadowOffset: { 
		  height: 10, 
		  width: 0 
		},
		shadowRadius: 25,
	  },
	  closeButton: {
		display: 'flex',
		height: 60,
		borderRadius: 6,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FF3974',
		shadowColor: '#2AC062',
		shadowOpacity: 0.5,
		shadowOffset: { 
		  height: 10, 
		  width: 0 
		},
		shadowRadius: 25,
	  },
	  buttonText: {
		color: '#FFFFFF',
		fontSize: 22,
	  },
	  image: {
		marginTop: 150,
		marginBottom: 10,
		width: '100%',
		height: 350,
	  },
	  text: {
		fontSize: 18,
		marginBottom: 0,
		padding: 20,
		color:'black'
	  },submit:{
		fontSize:18,
		borderColor: 'red',
		padding:5,
		color:'white',
		borderWidth:1,
		backgroundColor:'red',
		textAlign: 'center',
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
	  height: 40,
	  padding:10,
	  alignItems:'center',
	  fontSize:20,
	  borderColor: 'black',
	  borderWidth: 1 
	},
	modal: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white',
		padding: 100
	 },
   
});

export default Home;
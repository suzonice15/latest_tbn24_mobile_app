
import React,{Component} from 'react';
import moment from 'moment';

import {
   StyleSheet,
  Alert,
  View,
  Image,
  Text,
  FlatList,
  StatusBar,
  TouchableHighlight,
  Button,
  ScrollView,
  ActivityIndicator
} from 'react-native';

 
 import { Navigation } from "react-native-navigation";

class TodayShedule  extends Component {

	constructor(){

		super();
		this.state={
			Data:[],
			loading:true,
			refressicon:true

		}
	}
	PullRefresh=()=>{
	this.onApiCall();


}
onApiCall=()=>{

	this.setState({refressicon:true});

	let URL="https://www.tbn24.com/api/today/schedule";
	let config={method:'GET'}
	fetch(URL,config).then((result)=>result.json()).then((response)=>{
		this.setState({Data:response,loading:false,refressicon:false});
}).catch((error)=>{
		this.setState({loading:false,refressicon:false});
		Alert.alert("No Internet Connection","You need to be connected to your network or Wi-Fi or Mobile Data"); 
	});

}

componentDidMount=()=>{ 

	this.onApiCall();

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

 
	 ChildView=({program_name,program_details,program_id,schedule_date,img,start_time})=>{

 		 return(
		 
		 		  
				    <View>
		 <TouchableHighlight 
		  onPress={()=>{

		Navigation.push(this.props.componentId, {
			component: {
				name: 'SingleProgramPage', // Push the screen registered with the 'Settings' key
				options: { // Optional options object to configure the screen
					topBar: {
						title: {
							text: `${program_name}` // Set the TopBar title of the new Screen
						}
					}
				},
				    passProps: {
      program_id:  `${program_id}`,
      programName:  `${program_name}`,
      programDescription:  `${program_details}`,
      program_image:  `${img}`,
      
    }
			}
		})
	}}
		 >

		 <View style={{flexDirection:'row',backgroundColor:'white',border:2,borderColor:'black', margin:3,padding:5,flex:100}}>
		   
		  <View style={{flex:30}}>
		 
		 <Image source={{uri:'https://www.tbn24.com/public/uploads/program/'+img}}   style={{height:90,padding:5,width:100}}/>
		  
		 </View>
		  <View style={{backgroundColor:'white',margin:5,flex:50}}>
		 
		 	 <Text style={{color:'black',fontSize:15}}>{program_name}</Text>
		 	 <Text style={{color:'black',fontSize:15}}>{moment({schedule_date}).format('Do MMMM YYYY')}</Text>
 		 
		  
		 </View>
		 
		   <View style={{backgroundColor:'white',margin:5,flex:20}}>
		 
		 	 <Text style={{color:'white',backgroundColor:'#5a0000',fontWeight:'bold',borderRadius:50,width:80,height:75,paddingRight:15,paddingLeft:16,paddingTop:22,fontSize:18}}>{start_time}
</Text>
		 
		  
		 </View>
		 

	
		 </View>
		 		 </TouchableHighlight>
		 </View>
		 )
	 }
	
	render(){
		
		 
	  return ( 
  
  
    <View style={{flex:100,width:"100%"}}> 	
   
	 	 <View style={{flex:94,width:"100%",backgroundColor:'white',margin:5}}>

	    
  <Text style={{fontSize:25,color:'black',textAlign:'center',marginTop:-2}}>

Today's Schedule
</Text>

 {
			this.state.loading ?
	     <ActivityIndicator  style={{fontSize:30,marginTop:100}}size="large" color="red" />:null
			 
		 }
		
  
 
 <FlatList data={this.state.Data}      keyExtractor={item => item.id} renderItem={({item})=><this.ChildView program_id={item.program_id} program_details={item.program_details} start_time={item.start_time} program_name={item.program_name} img={item.program_image} schedule_date={item.schedule_date} />} />
  
 
  		  
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

export default TodayShedule;

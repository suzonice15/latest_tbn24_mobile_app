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
  Alert,
  View,
  Image,
  Text,
  FlatList,
  StatusBar,
  Button,
  ActivityIndicator
} from 'react-native';
  

class HomeTodaySchedule  extends Component {

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
	Alert.alert("Internet Problem");
});

}

componentDidMount=()=>{ 

	this.onApiCall();

}

 
	 ChildView=({program_name,schedule_date,img,start_time})=>{

		 return(
		 <View style={{flexDirection:'row',backgroundColor:'white',border:2,borderColor:'black', margin:3,flex:100}}>
		   
		  <View style={{flex:30}}>
		 
		 <Image source={{uri:'https://www.tbn24.com/public/uploads/program/'+img}}   style={{height:90,padding:5,width:100}}/>
		  
		 </View>
		  <View style={{backgroundColor:'white',margin:5,flex:50}}>
		 
		 	 <Text style={{color:'black',fontSize:15}}>{program_name}</Text>
		 	 <Text style={{color:'black',fontSize:15}}>{schedule_date}</Text>
 		 
		  
		 </View>
		 
		   <View style={{backgroundColor:'white',margin:5,flex:20}}>
		 
		 	 <Text style={{color:'white',backgroundColor:'#5a0000',fontWeight:'bold',borderRadius:50,width:80,height:75,paddingRight:15,paddingLeft:16,paddingTop:22,fontSize:18}}>{start_time}</Text>
		 
		  
		 </View>
		 
	
		 </View>
		 )
	 }
	
	render(){
		
		
		if(this.state.loading==true){
			return(
			<View>
			 
			<View style={{flex:1,marginTop:100,flexDirection:'column',justifyContent:'center'}} >
<ActivityIndicator size="large" color="red" />
</View>
</View>
			)
			
		} else {
			
	  return ( 
  
  
    <View>
   
	 
  <View style={{backgroundColor:'white'}} >  
  <Text style={{fontSize:30,color:'black',fontWeight:'bold',textAlign:'center'}}>

Today's Schedule
</Text>
  
 
 <FlatList data={this.state.Data}  onRefresh={()=>this.PullRefresh()} refreshing={this.state.refressicon}   keyExtractor={item => item.id} renderItem={({item})=><this.ChildView start_time={item.start_time} program_name={item.program_name} img={item.program_image} schedule_date={item.schedule_date} />} />
  
  </View>
 
 
  </View>
     
  );
			
		}

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

export default HomeTodaySchedule;

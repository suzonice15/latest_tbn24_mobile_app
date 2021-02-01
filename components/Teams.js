import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableHighlight,
  Alert,
  ActivityIndicator ,
  FlatList,
  StatusBar,
  
  
} from 'react-native';
 import Video from 'react-native-video';
  import { Navigation } from "react-native-navigation";


class Teams  extends Component {
	
	
	constructor(props){
		
		super(props);
				Navigation.events().bindComponent(this)

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

		let URL="https://www.tbn24.com/api/teams";
		let config={method:'GET'}
		fetch(URL,config).then((result)=>result.json()).then((response)=>{	
	 			this.setState({Data:response,loading:false,refressicon:false});
		}).catch((error)=>{
			this.setState({loading:false,refressicon:false});
			
			 Alert.alert(
      'No Internet Connection',
      'You need to be connected to your network or Wi-Fi');
			  

			
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
	 
	
	
	   
	 ChildView=({member_description,member_advise_name,member_advise,member_parmalink,member_status,member_name,member_picture})=>{
		 return(
		   <View >
		 <TouchableHighlight 
		 underlayColor='none'
		  onPress={()=>{

		Navigation.push(this.props.componentId, {
			component: {
				name: 'SingleTeamPage', // Push the screen registered with the 'Settings' key
				options: { // Optional options object to configure the screen
					topBar: {
						title: {
							text: `${member_name}` // Set the TopBar title of the new Screen
						}
					}
				},
				    passProps: {
	member_parmalink:  `${member_parmalink}`,
	member_name:  `${member_name}`,
	  member_status:`${member_status}`,
	  member_advise:`${member_advise}`,
	  member_advise_name:`${member_advise_name}`,
	  member_description:`${member_description}`,
      
      member_picture:  `${member_picture}`,
      
    }
			}
		})
	}}
		 >
		 <View style={{flex:10,flexDirection:'column',backgroundColor:'#B10000',width:190,margin:5}}>
		  <View style={{flex:8}}>
		 
		 <Image source={{uri:'https://www.tbn24.com/public/uploads/member/'+member_picture}}  style={{height:190,padding:5,width:"100%"}}/>
		  
		 </View>
		  <View style={{flex:2,backgroundColor:'#B10000',margin:5}}>
		 
		 	 <Text style={{color:'white',textAlign:'center',fontSize:18}}>{member_name}</Text>		 
			  <Text style={{color:'white',textAlign:'center',height:40,fontSize:14}}>{member_status}</Text>		 

		 </View>	   	 
	
		 </View>
		  </TouchableHighlight>
		  		   </View>

		 
		 )
	 }
	
	render(){ 
			
  return ( 
<View style={{flex:100,width:'100%'}}>
 
	  
<View style={{flex:94,width:'100%',height:'100%'}}>

        <Text style={{fontSize:25,color:'black',textAlign:'center',}}>
Our Team Member
</Text>  

 
 
  
 

  { 	this.state.loading ?
	     <ActivityIndicator  style={{fontSize:30,marginTop:100}}size="large" color="red" />:null		 
		 }
		   
		
 

 
 <FlatList   numColumns={2} data={this.state.Data}   keyExtractor={item =>item.member_id.toString()} renderItem={({item})=><this.ChildView member_description={item.member_description} member_advise_name={item.member_advise_name} member_name={item.member_name} member_parmalink={item.member_parmalink} member_status={item.member_status} member_advise={item.member_advise} member_picture={item.member_picture}   />} />
     
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
	 
   
   
});

export default Teams;

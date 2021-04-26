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


class SingleTeam  extends Component {
	
	
	constructor(props){
		
		super(props);
				Navigation.events().bindComponent(this)

		this.state={
			Data:[],
			playlists:[],
			loading:true,
			refressicon:true
			
		}
	}
	 
	 
	
	componentDidMount=()=>{
		
		 
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
  
	
	 <View style={{flex:94,width:"100%",backgroundColor:'white',margin:5}}>
	    
            
	   <ScrollView>  

  
  
	   <View style={{ margin:10}}>
	   <Image style={{width:'100%',height:350,borderWidth:2,padding:50,borderColor:'#ddd'}} source={{uri:'https://www.tbn24.com/public/uploads/member/'+this.props.member_picture}} />
	   
	   <Text style={{fontSize:25,color:'black',textAlign:'center',marginTop:0}}>
	   {this.props.member_name}   
	   
	   </Text> 
	   <Text style={{fontSize:20,color:'black',textAlign:'center',marginTop:0}}>
	   {this.props.member_status}   
	   
	   </Text> 
	   <Text style={{fontSize:20,color:'black',textAlign:'left',marginTop:0}}>
	   {this.props.member_advise}   
	   
	   </Text>
	   <Text style={{fontSize:20,color:'black',textAlign:'left',marginTop:2,marginLeft:10}}>
	   {this.props.member_advise_name}   
	   
	   </Text> 
	   	    
	   <Text style={{fontSize:17,color:'black',textAlign:'justify',marginTop:5,padding:5}}>
 	   {this.props.member_description.replace(/(<([^>]+)>)/gi, "")}
 	   
	   </Text> 
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
	 
    
   
});

export default SingleTeam;

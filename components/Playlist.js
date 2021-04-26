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
import YouTube from 'react-native-youtube';

class Playlist  extends Component {
	
	
	constructor(props){
		
		super(props);
				Navigation.events().bindComponent(this)

		this.state={
			PlaylistVideo:[],
			 
			loading:true,
			isReady:false,
			refressicon:true,
			status:'',
			quality:'',
			error:''
			
		}
	}
	 
	
	PullRefresh=()=>{
				this.onApiCall();

		
	}
	onApiCall=()=>{
		
		this.setState({refressicon:true});

		
	}
	
	componentDidMount=()=>{
		
		
		
		var URL="https://www.tbn24.com/api/playlistVideo/"+this.props.playlist;
		var config={method:'GET'}
		fetch(URL,config).then((result)=>result.json()).then((response)=>{	
	 			this.setState({PlaylistVideo:response,loading:false,refressicon:false});
		}).catch((error)=>{
			this.setState({loading:false,refressicon:false});
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
	 
	
	  
	 PlaylistChildView=({title,picture,videoId})=>{
		 return(
		   <View>
		 <TouchableHighlight   
		 
		  onPress={()=>{

		Navigation.push(this.props.componentId, {
			component: {
				name: 'YouTubePage', // Push the screen registered with the 'Settings' key
				options: { // Optional options object to configure the screen
					topBar: {
						title: {
							text: `${title}` // Set the TopBar title of the new Screen
						}
					}
				},
				    passProps: {
      youtubeVideoId:`${videoId}`,
     
      
    }
			}
		})
	}}
		 >
		 <View style={{flexDirection:'column',backgroundColor:'#B10000',width:185,margin:5}}>
		  <View>
		 
 		 
	 <Image source={{uri:picture}}  style={{height:180,padding:5,width:"100%"}}/>
		  
		 </View>
		  <View style={{backgroundColor:'#B10000',margin:5}}>
		 
		 	 <Text style={{color:'white',textAlign:'center',height:50,fontSize:18}}>{title}</Text>		 
		  
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
	    
            
	   <ScrollView  >  

   <Text style={{fontSize:30,color:'black',fontWeight:'bold',textAlign:'center',marginTop:5}}>
	   {this.props.playlistTitle}
</Text> 
 	     <View>
 { 	this.state.loading ?
	     <ActivityIndicator  style={{fontSize:30,marginTop:100}}size="large" color="red" />:null		 
		 }
		  </View>
 
 <FlatList  numColumns={2} data={this.state.PlaylistVideo}   keyExtractor={item =>item.videoId.toString()} renderItem={({item})=><this.PlaylistChildView title={item.title} videoId={item.videoId} picture={item.picture}     />} />

 
 
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

export default Playlist;

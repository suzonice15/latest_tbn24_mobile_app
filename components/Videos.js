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
   import { Navigation } from "react-native-navigation";
 
class Videos  extends Component {
	
	
	constructor(props){
		
		super(props);
				Navigation.events().bindComponent(this)

		this.state={
			PopularVideo:[],
			PlaylistVideo:[],
			Data:[],
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
		
		
		
		var URL="https://www.tbn24.com/api/popularVideo";
		var config={method:'GET'}
		fetch(URL,config).then((result)=>result.json()).then((response)=>{	
	 			this.setState({PopularVideo:response});
		}).catch((error)=>{
			this.setState({loading:false,refressicon:false});
			Alert.alert("No Internet Connection","You need to be connected to your network or Wi-Fi or Mobile Data"); 
		});
		
	
		
		 var URL="https://www.tbn24.com/api/allVideos";
		var config={method:'GET'}
		fetch(URL,config).then((result)=>result.json()).then((response)=>{	
	 			this.setState({Data:response});
		}).catch((error)=>{
			Alert.alert("No Internet Connection","You need to be connected to your network or Wi-Fi or Mobile Data"); 

		});

		var URL="https://www.tbn24.com/api/playlistVideo";
		var config={method:'GET'}
		fetch(URL,config).then((result)=>result.json()).then((response)=>{	
	 			this.setState({PlaylistVideo:response,loading:false});
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
	singleProgram=(program_id)=>{
		
		Alert.alert(program_id)
	}
	
	
		 PlaylistChildView=({title,picture,playlist})=>{
		 return(
		   <View>
		 <TouchableHighlight   
		  underlayColor='none'
		  onPress={()=>{

		Navigation.push(this.props.componentId, {
			component: {
				name: 'PlaylistPage', // Push the screen registered with the 'Settings' key
				options: { // Optional options object to configure the screen
					topBar: {
						title: {
							text: `${title}` // Set the TopBar title of the new Screen
						}
					}
				},
				    passProps: {
      playlist:`${playlist}`,
      playlistTitle:`${title}`,
     
      
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
		 
		 	 <Text style={{color:'white',textAlign:'center',height:40,fontSize:16}}>{title}</Text>		 
		  
		 </View>	   	 
	
		 </View>
		  </TouchableHighlight>
		  		   </View>

		 
		 )
	 }
	
	  
	 PopularChildView=({title,picture,videoId})=>{
		 return(
		   <View>
		 <TouchableHighlight   
		  underlayColor='none'
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
		 
		 	 <Text style={{color:'white',textAlign:'center',height:40,fontSize:16}}>{title}</Text>		 
		  
		 </View>	   	 
	
		 </View>
		  </TouchableHighlight>
		  		   </View>

		 
		 )
	 }
	
	   
	 ChildView=({title,picture,videoId})=>{
		 return(
		   <View>
		 <TouchableHighlight   
		  underlayColor='none'
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
		 
		 	 <Text style={{color:'white',textAlign:'center',height:40,fontSize:16}}>{title}</Text>		 
		  
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
	    
            
	   <ScrollView style={{marginTop:0,height:'80%'}} >  
  <Text style={styles.videoHeading}>Popular Videos	</Text>	 
		 
	     <View>
 { 	this.state.loading ?
	     <ActivityIndicator  style={{fontSize:30,marginTop:100}}size="large" color="red" />:null		 
		 }
		  </View>	   
 
 <FlatList  numColumns={2} data={this.state.PopularVideo}   keyExtractor={item =>item.videoId.toString()} renderItem={({item})=><this.PopularChildView title={item.title} videoId={item.videoId} picture={item.picture}     />} /> 


 { 	this.state.loading ?
	     null: <Text style={styles.videoHeading}>Playlist Videos	</Text>	 
		 }

<FlatList  numColumns={2} data={this.state.PlaylistVideo}   keyExtractor={item =>item.playlist.toString()} renderItem={({item})=><this.PlaylistChildView title={item.title} playlist={item.playlist} picture={item.picture}     />} />




 { 	this.state.loading ?
	     null: <Text style={styles.videoHeading}> Videos	</Text>	 
		 }
 
 <FlatList onRefresh={()=>this.PullRefresh()} refreshing={this.state.refressicon} numColumns={2} data={this.state.Data}   keyExtractor={item =>item.index.toString()} renderItem={({item})=><this.ChildView title={item.title} videoId={item.videoId} picture={item.picture}     />} />
     
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
	 
   videoHeading: {
	   fontSize:18,color:'black',
	   textAlign:'center',
	   backgroundColor:'red',
	   color:'white',
	   marginTop:0,
	   padding:2,
	   width:'98%'
	},
  logo:{
		width:300,
		height:80,
		marginTop:2
	},
   
});

export default Videos;

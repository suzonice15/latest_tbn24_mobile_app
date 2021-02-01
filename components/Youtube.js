/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { Navigation } from "react-native-navigation";  
import React,{Component} from 'react';
import {
   StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Alert,
  TouchableHighlight,
  Button
} from 'react-native';
   
import YouTube from 'react-native-youtube';

class Youtube  extends Component {
	
	 constructor(props){
		
		super(props);
		Navigation.events().bindComponent(this)
		 this.state={
			about:'',
			loading:true,
			isReady:false,
			refressicon:true,
			status:'',
			quality:'',
			error:'',
			PopularVideo:[]

		}
	}
	componentDidMount(){
		var URL="https://www.tbn24.com/api/popularVideo";
		var config={method:'GET'}
		fetch(URL,config).then((result)=>result.json()).then((response)=>{	
	 			this.setState({PopularVideo:response});
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
   
	  
	  
	 
	
	render(){
  return ( 
  
  
  
    <View style={{flex:100,width:"100%"}}> 		
	
	 <View style={{flex:94,width:"100%",backgroundColor:'white'}}>
	 	 <View style={{padding:10}}>

	 <YouTube
	apiKey='AIzaSyAEcAvRfkqGYHQMm9neonaCzkxaIttEoxo'
  videoId={this.props.youtubeVideoId} // The YouTube video ID
  play // control playback of video with true/false
  fullscreen // control whether the video should play in fullscreen or inline
  loop // control whether the video should loop when ended
  onReady={e => this.setState({ isReady: true })}
  onChangeState={e => this.setState({ status: e.state })}
  onChangeQuality={e => this.setState({ quality: e.quality })}
  onError={e => this.setState({ error: e.error })}
  style={{ alignSelf: 'stretch', height: 200 }}
/>

	 
<ScrollView style={{marginTop:0,height:'80%'}} >  
  <Text style={styles.videoHeading}>Popular Videos	</Text>	 
		 
	    
 
 <FlatList  numColumns={2} data={this.state.PopularVideo}   keyExtractor={item =>item.videoId.toString()} renderItem={({item})=><this.PopularChildView title={item.title} videoId={item.videoId} picture={item.picture}     />} /> 

 </ScrollView>
	 
 	  
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
	 
  	 
	videoHeading: {
		fontSize:18,color:'black',
		textAlign:'center',
		backgroundColor:'red',
		color:'white',
		marginTop:5,
		padding:2,
		width:'100%'
	 },
  logo:{
		width:300,
		height:80,
		marginTop:2
	},
   
});

export default Youtube;

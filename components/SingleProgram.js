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


class SingleProgram  extends Component {
	
	
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
		
		this.setState({refressicon:true});

		let URL="https://www.tbn24.com/api/program/"+this.props.program_id;
		let config={method:'GET'}
		fetch(URL,config).then((result)=>result.json()).then((response)=>{	
	 			this.setState({Data:response.schedule,playlists:response.plalists,loading:false,refressicon:false});
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
	 
	
	   
	 plalistsView=({title,picture,videoId})=>{
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
	    
            
	   <ScrollView  >  

   <Text style={{fontSize:20,color:'black',textAlign:'center',marginTop:0}}>
	   {this.props.programName}   
	   
	   </Text> 
	   	    
  
	   <View style={{ margin:10}}>
	   <Image style={{width:'100%',height:350,borderWidth:2,padding:50,borderColor:'#ddd'}} source={{uri:'https://www.tbn24.com/public/uploads/program/'+this.props.program_image}} />
	   
	  
	   <Text style={{fontSize:17,color:'black',textAlign:'center',marginTop:5}}>
	   {this.props.programDescription}
 	   
	   </Text> 
	   	</View>
		
		
		 <View style={{ margin:10,borderColor:'red',borderWidth:1}}>
	  
	  <Text style={{color:'white',padding:5,fontSize:18,textAlign:'center',backgroundColor:'red'}}>
	   Weekly Schedule List 
	  </Text>
	  		 <View style={{ flex:9,flexDirection:'row',marginButton:2,textAlign:'center',justifyContent:'center',marginTop:5,marginLeft:5,marginRight:5}}>

            <View style={{ flex:2,borderWidth:1,borderColor:'red',textAlign:'center',}}>
<Text style={{ padding:5}} >Date</Text>
           </View>
		   <View style={{ flex:3,borderWidth:1,borderColor:'red'}}>
<Text style={{ padding:5}} >Day</Text>
           </View>
		   <View style={{ flex:4,borderWidth:1,borderColor:'red'}}>
<Text style={{ padding:5}}>Show Time</Text>
           </View>
           </View>
		   
		   
			
			 {this.state.Data.map((program) => { 
        return  <View style={{ flex:9,flexDirection:'row',marginLeft:5,marginRight:5,marginTop:0}}>
			
            <View style={{ flex:2,borderWidth:1,borderColor:'red'}}>
<Text style={{ padding:5}} >{program.schedule_date}</Text>
           </View>
		   <View style={{ flex:3,borderWidth:1,borderColor:'red'}}>
<Text style={{ padding:5}} >{program.day}</Text>
           </View>
		   <View style={{ flex:4,borderWidth:1,borderColor:'red'}}>
<Text style={{ padding:5}}>{program.start_time}-{program.end_time}</Text>
           </View> 
		   
	     	</View> 
      })}
	  
 
	  
	   	</View>
		
		<View>
		 
		<View  style={{color:'white',padding:10}}>
		  <Text style={{color:'white',padding:10,fontSize:18,textAlign:'center',backgroundColor:'red'}}>
	  Playlist Videos 
	  </Text>
	  </View>
		<FlatList  numColumns={2} data={this.state.playlists}   keyExtractor={item =>item.videoId.toString()} renderItem={({item})=><this.plalistsView title={item.title} videoId={item.videoId} picture={item.picture}     />} /> 
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

export default SingleProgram;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { Navigation } from "react-native-navigation";
import moment from 'moment';
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
  class Blog  extends Component {
	
	 constructor(props){
		
		super(props);
		Navigation.events().bindComponent(this)

		this.state={
			Data:'',
			loading:true,
 			
		}
	}
	 
	
	
	  
	   componentDidMount=()=>{
		
	 let URL="https://www.tbn24.com/api/blogs";
		let config={method:'GET'}
		fetch(URL,config).then((result)=>result.json()).then((response)=>{	
	 			this.setState({Data:response,loading:false});
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
ChildView=({post_id,post_created_date,post_title,post_name,post_picture,post_description,post_view})=>{
		 return(	
<View style={{margin:2,flex:1}}>
 <TouchableHighlight 
   underlayColor='none'
		  onPress={()=>{

		Navigation.push(this.props.componentId, {
			component: {
				name: 'SingleBlogPage', // Push the screen registered with the 'Settings' key
				options: { // Optional options object to configure the screen
					topBar: {
						title: {
							text: `${post_title}` // Set the TopBar title of the new Screen
						}
					}
				},
				    passProps: {
      post_id:  `${post_id}`,
      post_name:  `${post_name}`,
      post_title:  `${post_title}`,
      post_description:  `${post_description}`,
      post_picture:  `${post_picture}`,
      post_created_date:  `${post_created_date}`,
      post_view:  `${post_view}`,
      
    }
			}
		})
	}}
		 >
		 <View>
<Image style={{width:'100%',height:260}}  source={{uri:'https://www.tbn24.com/public/uploads/post/'+post_picture}} />
<View style={{backgroundColor:'#ddd',marginBottom:10,padding:10}}>
<Text style={{color:'black',fontSize:18,textAlign:'left'}} >{post_title}</Text>
<View style={{flex:4,flexDirection:'row',marginBottom:0}}>

<View style={{flex:2}}>
<Text style={{color:'green',fontSize:16,textAlign:'center'}} >{moment({post_created_date}).format('Do MMMM YYYY')} 
                 </Text>

</View>
<View style={{flex:2}}>
<Text style={{color:'green',fontSize:16,textAlign:'center'}} >Viewed: {post_view} </Text>
					 </View>
 </View>

<Text style={{color:'black',fontSize:15,textAlign:'left'}}>{post_description.replace(/(<([^>]+)>)/gi, "").substring(0, 185)}.....
</Text>
</View>
 </View>
</TouchableHighlight>

</View>
		 
)}
	 
	
	render(){
  return (  
   
    <View style={{flex:100,width:"100%"}}> 	
 
	
	 <View style={{flex:94,width:"100%",backgroundColor:'white',margin:5}}>
	<ScrollView>
   
<View style={{margin:5,padding:10,flex:1,flexDirection:'column'}}>




	   <View>
 { 	this.state.loading ?
	     <ActivityIndicator  style={{fontSize:30,marginTop:100}}size="large" color="red" />:null		 
		 }
		  </View>

    
 
 <FlatList  numColumns={1} data={this.state.Data}   keyExtractor={item =>item.post_id.toString()} renderItem={({item})=><this.ChildView post_id={item.post_id} post_title={item.post_title} post_name={item.post_name} post_picture={item.post_picture} post_description={item.post_description} post_created_date={item.post_created_date} post_view={item.post_view}   />} />

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

export default Blog;

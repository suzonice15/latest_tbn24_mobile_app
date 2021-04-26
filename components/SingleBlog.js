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
  Alert,
  TextInput,
  TouchableHighlight,
  Button
} from 'react-native';

import CommentForm from "./CommentForm";

  class SingleBlog  extends Component {
	
	 constructor(props){
		
		super(props);
		Navigation.events().bindComponent(this)

		this.state={
		 comments:[],
 		 name:'',
		 email:'',		
		 post_id:'',
		 comment_id:0,
		 message:'',
		 success:''
		}
		    this.subCommentForm = this.subCommentForm.bind(this);
	}
	 
	

	subCommentStore=()=>{	 
	
		 
		if(this.state.message==""){
			 Alert.alert('Enter Your Comment')
			return false;
		}
		
		if(this.state.name==""){
			 Alert.alert('Enter Your Name')
			return false;
		}
		 if(this.state.email==""){
			 Alert.alert('Enter Your Email')
			return false;
		}
		
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 if (reg.test(this.state.email) === false) {
		 Alert.alert('Enter Valid Email')
	
   return false;
 }
		
		let URL='https://www.tbn24.com/api/subComment/store';
		let configHeader={
			Accept:'application/json',
			'Content-Type':'application/json'
		}
		let configBody=JSON.stringify({
			name:this.state.name,
			email:this.state.email,
			post_id:this.state.post_id,
			comment_id:this.state.comment_id,

			comments:this.state.message			 
		});
		let config={method:'POST',headers:configHeader,body:configBody}
		fetch(URL,config).then((response)=>response.text())
		.then((responsData)=>{
			this.setState({name:''});
			this.setState({email:''});
			this.setState({message:''});
			this.commentByPostId()

			  
			  this.setState({success:responsData});

		}).catch((erorr)=>{
			Alert.alert('Something is Wrong')
		})
		
	}

	 mainCommentStore=()=>{	 
	
		 
		 if(this.state.message==""){
			  Alert.alert('Enter Your Comment')
			 return false;
		 }
		 
		 if(this.state.name==""){
			  Alert.alert('Enter Your Name')
			 return false;
		 }
		  if(this.state.email==""){
			  Alert.alert('Enter Your Email')
			 return false;
		 }
		 
		 let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(this.state.email) === false) {
    	  Alert.alert('Enter Valid Email')
     
    return false;
  }
		 
		 let URL='https://www.tbn24.com/api/mainComment/store';
		 let configHeader={
			 Accept:'application/json',
			 'Content-Type':'application/json'
		 }
		 let configBody=JSON.stringify({
			 name:this.state.name,
			 email:this.state.email,
			 post_id:this.state.post_id,
			 comments:this.state.message			 
		 });
		 let config={method:'POST',headers:configHeader,body:configBody}
		 fetch(URL,config).then((response)=>response.text())
		 .then((responsData)=>{
			this.setState({name:''});
			this.setState({email:''});
			this.setState({message:''});
			this.commentByPostId()


			this.setState({success:responsData});

			  
			 
		 }).catch((erorr)=>{
			Alert.alert("No Internet Connection","You need to be connected to your network or Wi-Fi or Mobile Data"); 
		 })
		 
	 }

	
	  
	   componentDidMount=()=>{
	
		this.commentByPostId()
		
	}

	commentByPostId=()=>{
	
		let URL="https://www.tbn24.com/api/selectBlogComment/"+this.props.post_id;
		let config={method:'GET'}
		fetch(URL,config).then((result)=>result.json()).then((response)=>{	
				 this.setState({comments:response});
				 
		}).catch((error)=>{			 
			Alert.alert("Internet Problem"); 
		});
		
		
		this.setState({
			post_id:this.props.post_id,
			 
			})
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
	subCommentSave=(comment_id)=>{
			 			this.setState({comment_id:comment_id});
						if(this.state.comment_id){
							
							this.subCommentForm()
							
						}

 	}
	
	subCommentForm=()=>{
		return(
		<View>
		<TextInput
		
onChangeText={(value)=>this.setState({name:value})}
style={ {
	margin: 3,
	height: 35,
	padding:5,
	alignItems:'center',
	fontSize:20,
	borderColor: 'black',
	borderWidth: 1 
  }} 
		placeholder="Enter Your Name"
		value={this.state.name}
         
      />
	  <TextInput
	  onChangeText={(value)=>this.setState({email:value})}
        style={ {
			margin: 3,
			height: 35,
			padding:5,
			alignItems:'center',
			fontSize:20,
			borderColor: 'black',
			borderWidth: 1 
		  }}
		placeholder="Enter Your Email"
		value={this.state.email}
         
      />
	  <TextInput
	  onChangeText={(value)=>this.setState({message:value})}
    multiline={true}
	 placeholder="Enter Your Comment"
	numberOfLines={5}
	value={this.state.message}
	style={{fontSize:20,margin:3,height:100,   borderColor: 'black',
	borderWidth: 1,textAlignVertical: 'top',}} />
	   

	  <TouchableHighlight  underlayColor='none' onPress={this.subCommentStore}>
<Text style={{
	fontSize:18,
	borderColor: 'red',
	padding:5,
	color:'white',
	borderWidth:1,
	backgroundColor:'red',
	textAlign: 'center',
}
	
}  >Replay Now</Text>
</TouchableHighlight>
		
		</View>
		
		)
	}
 
	 
	
	render(){
		let post_created_date=this.props.post_created_date
  return (  
     
    <View style={{flex:100,width:"100%"}}> 	
 
	
	
	 <View style={{flex:94,width:"100%",backgroundColor:'white',margin:5}}>
	<ScrollView>
   
<View style={{padding:10,margin:5,flex:1,flexDirection:'column'}}>


<View style={{margin:2,flex:1}}>
  
		 
<Image style={{width:'100%',height:260}}  source={{uri:'https://www.tbn24.com/public/uploads/post/'+this.props.post_picture}} />
<View style={{backgroundColor:'#ddd',marginBottom:20,padding:10}}>

 <Text style={{color:'color',fontSize:18,textAlign:'left'}} >{this.props.post_title}   </Text>
 


	  <View style={{flex:4,flexDirection:'row',marginBottom:0}}>

<View style={{flex:2}}>
<Text style={{color:'green',fontSize:16,textAlign:'center'}} >{moment({post_created_date}).format('Do MMMM YYYY')}
                 </Text>

</View>
<View style={{flex:2}}>
<Text style={{color:'green',fontSize:16,textAlign:'center'}} >Viewed: {this.props.post_view} </Text>
					 </View>
 </View>
<Text style={{color:'color',fontSize:16,textAlign:'left'}}>{this.props.post_description.replace(/(<([^>]+)>)/gi, "")}
</Text>
</View>
</View>
</View>

<View style={{margin:5,flex:1,marginTop:0}}>

	<View style={{padding:10,marginTop:0}}>

	<Text style={{color:'color',fontSize:18,textAlign:'center',marginBottom:5,}}>Leave a Reply</Text>

<TextInput


onChangeText={(value)=>this.setState({name:value})}
style={styles.formField}
		placeholder="Enter Your Name"
		value={this.state.name}
         
      />
	  <TextInput
	  onChangeText={(value)=>this.setState({email:value})}
      style={styles.formField}
		placeholder="Enter Your Email"
		value={this.state.email}
         
      />
	  <TextInput
	  onChangeText={(value)=>this.setState({message:value})}
    multiline={true}
	 placeholder="Enter Your Comment"
	numberOfLines={10}
	value={this.state.message}
    style={{fontSize:20,margin:3,height:100,   borderColor: 'black',
      borderWidth: 1,textAlignVertical: 'top',}} />
	 
	    
	  <TouchableHighlight  underlayColor='none' onPress={this.mainCommentStore}>
<Text style={styles.submit}  >Submit Now</Text>
</TouchableHighlight>
 	  
	  
	  <View style={{margin:5}}>

		  {this.state.comments.map((row)=>
	   <View style={{padding:5}}>	
	   
	   <Text style={{fontSize:20,color:'black'}}>{row.name}</Text>
	   <Text>{row.comments} </Text>
	   <Text onPress={ this.subCommentSave.bind(this, row.comment_id) } >Replay</Text>
		   {

			   this.state.comment_id==row.comment_id ?  
				   
				    <CommentForm comment_id={row.comment_id} post_id={this.state.post_id} ></CommentForm>
			    :null
		   
		   
		   
		   } 
		 
	   
	     {
			 (typeof(row.sub_comment)=='object')?
			 
			  row.sub_comment.map((sub)=><View style={{paddingLeft:30}}>	   
	  
	  <Text style={{fontSize:20,color:'black'}}>{sub.name}</Text>
	   <Text>{sub.comments} </Text>
	   
	   
		</View>)
		  :null
		}
	   
	   
	   </View>
		  )}
	   
	   
	   </View> 
	  </View>
	  
	  

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
	 
	formField: {
		margin: 3,
		height: 35,
		padding:5,
		alignItems:'center',
		fontSize:20,
		borderColor: 'black',
		borderWidth: 1 
	  },
	  submit:{
		fontSize:18,
		borderColor: 'red',
		padding:5,
		color:'white',
		borderWidth:1,
		backgroundColor:'red',
		textAlign: 'center',
	  },
  logo:{
		width:300,
		height:80,
		marginTop:2
	},
   
});

export default SingleBlog;

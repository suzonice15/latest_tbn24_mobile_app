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
  ScrollView,
  View,
  Image,
  Text,
  FlatList,
  StatusBar,
  TouchableHighlight,
  Button,
  Alert,
  TextInput
} from 'react-native';


class CommentForm  extends Component {
	
	
 	constructor(props){		
		super(props); 
		this.state={
		 comments:[],
 		 sub_name:'',
		 sub_email:'',		
		 post_id:'',
		 comment_id:0,
		 sub_message:'',
		 success:''
		}
 	}
	
	   
	
	
	
		 subCommentStore=()=>{	 
	
		 
		 if(this.state.sub_message==""){
			  Alert.alert('Enter Your Comment')
			 return false;
		 }
		 
		 if(this.state.sub_name==""){
			  Alert.alert('Enter Your Name')
			 return false;
		 }
		  if(this.state.sub_email==""){
			  Alert.alert('Enter Your Email')
			 return false;
		 }
		 
		 let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(this.state.sub_email) === false) {
    	  Alert.alert('Enter Valid Email')
     
    return false;
  }
		 
		 let URL='https://www.tbn24.com/api/subComment/store';
		 let configHeader={
			 Accept:'application/json',
			 'Content-Type':'application/json'
		 }
		 let configBody=JSON.stringify({
			 name:this.state.sub_name,
			 email:this.state.sub_email,
			 post_id:this.props.post_id,
			 comment_id:this.props.comment_id,
			 comments:this.state.sub_message			 
		 });
		 let config={method:'POST',headers:configHeader,body:configBody}
		 fetch(URL,config).then((response)=>response.text())
		 .then((responsData)=>{			 
			   Alert.alert(responsData)
			  this.setState({success:responsData})
		 }).catch((erorr)=>{
			Alert.alert("No Internet Connection","You need to be connected to your network or Wi-Fi or Mobile Data"); 

		 })
		 
	 }
	 
	
	render(){
  return ( 
  <View>
		<TextInput
		
onChangeText={(value)=>this.setState({sub_name:value})}
        style={{ margin: 5,
      height: 50,fontSize:20,
      borderColor: 'black',
      borderWidth: 2}}
        placeholder="Enter Your Name"
         
      />
	 
	  <TextInput
	  onChangeText={(value)=>this.setState({sub_email:value})}
        style={{ margin: 5,
      height: 50,fontSize:20,
      borderColor: 'black',
      borderWidth: 2}}
        placeholder="Enter Your Email"
         
      />
	  <TextInput
	  onChangeText={(value)=>this.setState({sub_message:value})}
    multiline={true}
	 placeholder="Enter Your Comment"
    numberOfLines={10}
    style={{fontSize:20, margin: 5,height:200,   borderColor: 'black',
      borderWidth: 2,textAlignVertical: 'top',}}/>
	  <Button  onPress={this.subCommentStore} title="Submit Now" ></Button>  
		
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

export default CommentForm;

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
   

 
class SplashScreen  extends Component {
	
	 constructor(props){
		
		super(props);
		Navigation.events().bindComponent(this)
		 this.state={
		 activeSplash:false
                  
        }
        
        
    }
    
   
	componentDidMount(){
        Navigation.setDefaultOptions({
            statusBar: {
              backgroundColor: '#B10000'
            },
            topBar: {
              title: {
                color: 'white'
              },
              backButton: {
                color: 'white'
              },
              background: {
                color: '#B10000'
              }
            },
            
          });

          if(this.state.activeSplash){
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
          } else {

            setTimeout(()=>{

                this.setState({activeSplash:true})
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
    
            },5000)
            
          }

      
	}
	 
	
	
	    
 
	  
	  
	 
	
	render(){
  return ( 
  
  
  
   <View style={{flex:100,width:"100%",backgroundColor:'#B10000'}}> 
     
     <View style={{flex:20}}>      


       </View>
      <View style={{flex:60,alignContent:'center',justifycontent:'center'}}> 
      <View style={{flex:20,justifycontent:'center'}}> 
             <Image  style={{marginLeft:70}} source={require('../images/logo.png')} />
            <Text style={{color:'white',textAlign:'center',fontSize:40}} >Welcome To TBN24</Text>
            </View>

            <View style={{flex:30,flexDirection:'row',justifycontent:'center',marginTop:35}}> 
            <View style={{flex:24,}}>  

              <Text style={{color:'white',textAlign:'center',fontSize:30}}>Please Wait...</Text>
</View>
        <View style={{flex:1,alignContent:'flex-start'}}> 
             <ActivityIndicator  style={{fontSize:30,}} size="large" color="white" />		 
        </View>
        <View style={{flex:5,alignContent:'flex-start'}}> 
         </View>

               </View>


       </View>

       <View style={{flex:20}}>      


</View>
    
      
	
	</View>
	 
	  

		
   
      
  );
	}
}

const styles = StyleSheet.create({
	 
  	  
  logo:{
		width:300,
		height:80,
		marginTop:2
	},
   
});

export default SplashScreen;

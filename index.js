import { Navigation } from "react-native-navigation";
import Program from "./components/Program";
import Teams from "./components/Teams";
import SingleTeam from "./components/SingleTeam";



import Home from "./components/Home";
import TodayShedule from "./components/TodayShedule";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Registration from "./components/Registration";
import LeftSideMenu from "./components/SideMenu";
import SingleProgram from "./components/SingleProgram";
import Videos from "./components/Videos";
import SingleBlog from "./components/SingleBlog";
import Blog from "./components/Blog";
import YouTube from "./components/Youtube";
import Playlist from "./components/Playlist";
import SplashScreen from "./components/SplashScreen";

Navigation.registerComponent('TeamPage', () => Teams);
Navigation.registerComponent('SingleTeamPage', () => SingleTeam);

Navigation.registerComponent('ProgramPage', () => Program);
Navigation.registerComponent('SplashScreenPage', () => SplashScreen);


Navigation.registerComponent('TodayShedulePage', () => TodayShedule);
Navigation.registerComponent('AboutPage', () => About);
Navigation.registerComponent('LoginPage', () => Login);
Navigation.registerComponent('RegistrationPage', () => Registration);
Navigation.registerComponent('ContactPage', () => Contact);
Navigation.registerComponent('HomePage', () => Home);
Navigation.registerComponent('SideMenuPage', () => LeftSideMenu);
Navigation.registerComponent('SingleProgramPage', () => SingleProgram);
Navigation.registerComponent('VideoPage', () => Videos);
Navigation.registerComponent('SingleBlogPage', () => SingleBlog);
Navigation.registerComponent('BlogPage', () => Blog);
Navigation.registerComponent('YouTubePage', () => YouTube);
Navigation.registerComponent('PlaylistPage', () => Playlist);

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: 'red'
  },
  topBar: {
    title: {
      color: 'white'
    },
    backButton: {
      color: 'white'
    },
    background: {
      color: 'red'
    }
  },
  bottomTab: {
    fontSize: 14,
    selectedFontSize: 14,
    backgroundColor:'red'
  }
});

const sideMenu ={
    left:{
        component:{
            name:'SideMenuPage'
        }
    },
    center:{
        stack:{
            id:"centerPage",
            children:[
                {
                    component:{
                        name:"HomePage",
                        options:{
                            topBar:{
                                title:{
                                    text:"TBN24"
                                },
                                leftButtons: [
                                    {
                                        icon: require('./images/menu.png'),
                                        id: 'toggleDrawer',
                                    },
                                ],
                            }
                        }
                    }
                }
            ]
        }

    }
}



Navigation.events().registerAppLaunchedListener(()=>{
    Navigation.setRoot({
        root:{
            sideMenu
        }
    })
})




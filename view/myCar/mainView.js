import React,{Component} from  'react';
//爱车主界面
import {
  View,Text,StyleSheet,TouchableHighlight,Image
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import Global from '../tools/Global';
import Util from '../tools/utils';
import Swiper from 'react-native-swiper';

import Svg,{
    Circle,Line
} from 'react-native-svg';
//
export default class MainView extends Component{
  constructor() {
    super();
    this.state = {
      pkCode:''
    };
  }

  componentWillMount(){
    this.state.pkCode = Global.pkCode;
    console.log('mainView.state:',this.state.pkCode);
  }

  _bannerPress(){

  }

  render(){
    let cricleHeight = Math.max(Util.size.width/3,140)-10;
    console.log(cricleHeight);
    return(
      <View style={styles.container}>
        <View style={styles.navigation}>
        </View>
        <Swiper height={150} showsButtons={false} autoplay={true}
          activeDot={<View style={{backgroundColor: 'rgba(255,255,255,0.8)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}>
          <TouchableHighlight onPress={()=> this._bannerPress(11)}>
            <View style={styles.slide}>
              <Image style={styles.image} source={require('../images/banner@2x.png')}></Image>

            </View>
          </TouchableHighlight>

        </Swiper>
        <View style={styles.infoView}>
          <View style={styles.info1}>
          </View>
          <View style={styles.info2}>
            <Svg style={{alignSelf:'center'}} width={cricleHeight} height={cricleHeight}>
              <Circle
                    cx={cricleHeight/2}
                    cy={cricleHeight/2}
                    r={cricleHeight/2-10}
                    stroke={Util.mainColor}
                    strokeWidth="10"
                    fill="white"
                />
            </Svg>
          </View>
          <View style={styles.info3}>
          </View>
        </View>
        <Text>MainView
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  navigation:{
    height:64,
    backgroundColor:Util.mainColor
  },
  slide: {
    flex: 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideText:{
    position:"absolute",
    bottom: 0,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:"rgba(255,255,255,0.5)",
    width: Util.size.width,
    textAlign:"center",
    fontSize: 12
  },
  image:{
    width: Util.size.width,
    flex: 1,
    alignSelf: 'stretch',
  },
  infoView:{
    height:140,
    flexDirection:'row'
  },info1:{
    flex:1,
    backgroundColor:'rgb(123,156,98)',
  },info2:{
    flex:1,
  },info3:{
    flex:1,
    backgroundColor:'rgb(59,100,130)',
  }
});

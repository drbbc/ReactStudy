/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Util from './tools/utils';

import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  StatusBar,
  TabBarIOS,
  ScrollView,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from './view/regAndLogin/login';
import TableBarExample from './view/tableExm';
import CookieManager from 'react-native-cookies';
import CustomNav from './view/customnav';
import Global from './tools/Global';
class ReactStudy extends Component {
  constructor(){
    super();
    this.state = {
      pkCode:''
    }
  }

  componentWillMount(){
    console.log('will Load');
    this.state.pkCode = Global.pkCode;
    console.log('bbb1:'+this.state.pkCode);
  }
  _showMainView(){
    if (this.state.pkCode=='' || this.state.pkCode == 'undefined') {
      Global.pkCode='ssss';
      return <CustomNav component={Login}/>;
    }else{
      return <TableBarExample/>;
    }
  }
  render() {
    return this._showMainView();
  }

}

const styles = StyleSheet.create({
  container1:{
    flex:1,
    backgroundColor: '#FF0'
  },
  itemWrapper:{
    backgroundColor: '#000'
  },
  mainContainer:{
    width: Util.size.width,
    height: Util.size.height
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#15FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  Btn:{
    position:"absolute",
    right:20,bottom:7
  },
  backBtnIcon:{
    color:"#fff"
  },
});

AppRegistry.registerComponent('ReactStudy', () => ReactStudy);

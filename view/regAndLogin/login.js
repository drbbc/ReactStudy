//登录页
'use strict';
import React,{Component} from 'react';
import Util from '../tools/utils';
import Global from '../tools/Global';
import MainView from '../myCar/mainView';
import Tabbar from '../tableExm';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  NativeModules,
  Network
} from 'react-native';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      savePassword: 1,
      pkCode:'',
    }
    // this.render = this.render.bind(this);
    this._onLoginButton = this._onLoginButton.bind(this);
    this._savePassword = this._savePassword.bind(this);
  }

  componentWillMount(){
    this.state.pkCode = Global.pkCode;
  }

  _onLoginButton(){
      var parms = {
        password:'qqqqqq1',
        deviceId:'24345B0C-E1A6-4286-9831-9C0139FE6CD5',
        loginType:'0',
        userName:'15611189213',
      };
      console.log('111111->'+this.state.pkCode);
      var Properties = NativeModules.Properties;
      Properties.getDeviceId((error,db)=>{
        //parms.deviceId = db;
        Util.post('user/login',parms,true,(response)=>{
          // console.log(JSON.stringify(response));
          if (response.state==0) {
            console.log(response.msg);
          }
          if (response.state==1) {
            Global.pkCode = response.data.pkCode;
            // this.state.pkCode = response.data.pkCode;
            this.setState({pkCode:response.data.pkCode});
            // console.log('222222->'+this.state.pkCode);
            // console.log(response.msg);
          }
        });
      });

    //  fetch('http://down.evcoming.com:5141/zdou_app/user/login',{
    //     method:'POST',
    //     body:parms
    //   })
    //   .then((response)=>{
    //     console.log(response);
    //   })
    //   .catch((err)=>{
    //     console.log(err);
    //   });


    }

    _goReg(){

    }
    _forgetPassword(){

    }

    _savePassword(){
      // console.log('save password clicked'+this.state.savePassword);
      if (this.state.savePassword===1) {
        this.setState({
          savePassword:0
        });
      }else{
        this.setState({
          savePassword:1
        });
      }
    }

    render(){
      // console.log('render run');
      var remImg = require('image!jizhumima');
      if (this.state.savePassword===1) {
        remImg = require('image!jizhumimaed');
      }
      let showView;

      let loginView = <View style={styles.container}>
        <Image style={styles.logo} source={require("../images/loginlogo.png")}/>
        <View style={styles.inputView}>
          <View style={styles.username}>
            <Image style={styles.inputImg} source={require('../images/denglu-zh.png')}/>
            <TextInput style={styles.inputText} placeholder="请输入您的手机号或用户名"/>
          </View>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image style={styles.inputImg} source={require('../images/denglu-mima.png')}/>
            <TextInput secureTextEntry={true} placeholder='请输入密码' style={styles.inputText}/>
          </View>
        </View>
        <TouchableOpacity onPress={this._onLoginButton} activeOpacity={0.6}>
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonText}>登录</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.remberView}>
          <TouchableOpacity onPress={this._savePassword}>
            <Image ref='savePass' style={{width:20,height:20,marginTop:5}} source={remImg}/>
            <Text style={{color:Util.mainColor,height:30,top:7,left:20,alignSelf:'auto',position:'absolute'}}>记住密码</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._forgetPassword}>
          <Text style={{color:Util.mainColor,height:30,top:-18,position:'absolute',left:Util.size.width-20-70,alignSelf:'flex-end'}}>忘记密码？</Text>
        </TouchableOpacity>
        </View>
        <View style={{marginTop:50}}>
          <TouchableOpacity onPress={this.goReg}>
            <Text style={{fontSize:20,color:Util.mainColor}}>注册豆藤
            </Text>
          </TouchableOpacity>

        </View>
      </View>;

      // console.log(this.state.pkCode);

      if (this.state.pkCode=='' || this.state.pkCode == 'undefined') {
        showView = loginView;
      }else {
        showView = <Tabbar />;
      }
      return showView;
    }
  }


const styles=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center'
  },
  logo:{
    width:111,
    height:136,
    marginTop:84,
  },
  inputView:{
    marginTop:30,
    borderWidth:1,
    height:90,
    width:Util.size.width-20,
    borderColor:Util.mainColor,
    borderRadius:5
  },username:{
    height:45,
    flexDirection:'row',
    borderBottomWidth:1,
    borderColor:Util.mainColor,
    alignItems:'center',
  },inputImg:{
    height:21,
    width:29,
    marginLeft:8
  },inputText:{
    height:45,flex:5,marginLeft:5,color:'gray',fontSize:18,color:Util.mainColor,
  },loginButton:{
    width:Util.size.width-20,
    alignItems:'center',
    marginTop:20,
    height:40,
    backgroundColor:Util.mainColor,
    borderRadius:5,
    justifyContent:'center'
  },loginButtonText:{
    color:'white',
    fontSize:18,
  },remberView:{
    height:30,
    width:Util.size.width-20,
  }

});

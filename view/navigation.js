'use strict';
import React, { Component } from 'react';
import Util from  '../tools/utils';
import {StyleSheet,View,StatusBar,NavigatorIOS} from 'react-native';

export default class extends Component{

  componentDidMount() {
    StatusBar.setBarStyle(0);
  }

  componentWillMount(){
    if (this.props.initView===null) {

    }
  }

  render(){
    const initView = this.props.initView?this.props.initView:<View style={styles.container}></View>;
    return (
        <NavigatorIOS
          ref='nav'
          style={styles.container1}
          initialRoute={{
            title:"30 Days of RN",
            component: initView,
            backButtonTitle: 'back',
            shadowHidden: false,
            translucent:false,
            barTintColor:'#fff',
            titleTextColor:'#000000'
          }}
          itemWrapperStyle={styles.itemWrapper}
          tintColor="#777"
        />
    );
  }
}

const styles = StyleSheet.create({
  container:{
    width:Util.size.width,
    height:Util.size.height,
    backgroundColor:'rgb(0,123,345)',
  }
});

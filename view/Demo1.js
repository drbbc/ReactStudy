'use strict';

import React,{Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Util from '../tools/utils';

export default class extends Component  {
  constructor() {
    super();
  }

  render(){
    return (
      <View style={styles.container}>
      <Text style={styles.tabText}>{this.props.text}</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'rgb(255,0,0)',
    height:Util.size.height,
    alignItems:'center',
  },

  tabText:{
    margin:50,
  }

});

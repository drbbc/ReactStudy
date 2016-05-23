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
      <View style={styles.main}><Text>Demo1</Text></View>
    )
  }

}

const styles = StyleSheet.create({
  main:{
    width:Util.size.width,
    backgroundColor:'rgb(0,234,210)',
  }
});

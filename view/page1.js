'use strict';

import React,{Component} from 'react';
import {StyleSheet,View,Image,Text} from 'react-native';

import Util from './tools/utils';
import NavUi from './navigation';
import Demo from './Demo1';

export default class extends Component {
  constructor() {
    super();
  }

  render(){
    return (<View style={styles.container}>
      <Text style={styles.tabText}>xxxx</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'rgb(139,212,55)',
    flex: 2,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

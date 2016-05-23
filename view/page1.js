'use strict';

import React,{Component,StyleSheet,View,Image,Text} from 'react-native';
import Util from '../tools/utils';
import Demo1 from './Demo1';

export default class extends Component {
  constructor() {
    super();
  }

  render(){
    return (
        <View style={styles.container}>
          <Text>第一页</Text>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    backgroundColor:'rgb(139,212,55)',
    width:Util.size.width,
    height:Util.size.height,
  }
});

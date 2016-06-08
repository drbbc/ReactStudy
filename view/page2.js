'use strict';
import React,{Component} from 'react';

import {
  View,
  Text,StyleSheet
} from 'react-native';

import Util from './tools/utils';
import Header from './common/header' ;

export default class extends Component {
  constructor() {
    super();
  }

  render(){
    return(
<View style={styles.container}>
  <Header
                navigator={this.props.navigator}
                initObj={{
                    backName: '图书',
                    title: this.props.name?this.props.name:'',
                }}/>
  <View style={st.container} >
    <Text style={st.tabText}>第二页</Text>
  </View>
</View>



    )
  }
}

// <Header navigator={this.props.navigator}
//         initObj={{
//         backName: '图书',
//         title: this.props.name?this.props.name:'',
// }}/>
const st=StyleSheet.create({
  container:{
    flex:1,

  }
,tabText:{
  color:'red'
}
})
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'rgb(123,213,100)',

  },
  tabText: {
    color: 'white',
    marginTop:20,
    fontSize:30,
  },
  navBg:{
    height:Util.size.height,
    alignItems: 'center',
    width:Util.size.width,
    height:64,
    backgroundColor:'rgb(102,176,50)',
  },
  content:{
    flex: 1,
    height:700,
    backgroundColor:'rgb(0,255,255)',
  },
  navTitle:{
    color:'#FFFFFF',
    fontSize:20,
  }
});

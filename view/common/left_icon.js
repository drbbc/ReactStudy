import Util from '../../tools/utils' ;
import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
module.exports = React.createClass({
  render: function(){
    return (
      <View>
        <View style={styles.go}>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  go:{
    borderLeftWidth: 4 * Util.pixel,
    borderBottomWidth: 4 * Util.pixel,
    width:15,
    height:15,
    transform: [{rotate: '45deg'}],
    borderColor:'#FFF',
    marginLeft:10
  }
});

'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} = ReactNative;
import Icon from 'react-native-vector-icons/Ionicons';
import Page2 from './page2';
import Demo1 from './Demo1';
import MainView from './myCar/mainView';
import NavUi from './navigation';
import CustomNav from './customnav';
var TabBarExample = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.',
  },

  displayName: 'TabBarExample',

  getInitialState: function() {
    return {
      selectedTab: 0,
      notifCount: 0,
      presses: 0,
    };
  },

  _renderContent: function(color: string, pageText: string, num?: number) {
    if (this.state.selectedTab==0) {
      return (<CustomNav component={MainView}/>);
    }else if (this.state.selectedTab==1) {
      return (<NavUi component={Demo1}/>);
    }else{
      return (<CustomNav component={Page2}/>);
    }
  },

  render: function() {
    return (
      <TabBarIOS
        unselectedTintColor='red'
        tintColor="rgb(102,176,50)"
        translucent={false}
        barTintColor="#FFFFFF">
        <TabBarIOS.Item
          title="爱车"
          selected={this.state.selectedTab === 0}
          icon={require('image!tabCar')}
          selectedIcon={require('image!tabCar1')}
          onPress={() => {
            this.setState({
              selectedTab: 0,
            });
          }}>
          {this._renderContent('#414A8C', 'Blue Tab')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="地图"
          selectedIcon={require('image!tabMap1')}
          icon={require('image!tabMap')}
          selected={this.state.selectedTab === 1}
          onPress={() => {
            this.setState({
              selectedTab: 1
            });
          }}>
          {this._renderContent('#783E33', 'Red Tab', this.state.notifCount)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          style={styles.tabItem}
          icon={require('image!tabMy')}
          selectedIcon={require('image!tabMy1')}
          title="我的"
          selected={this.state.selectedTab === 2}
          onPress={() => {
            this.setState({
              selectedTab: 2
            });
          }}>
          {this._renderContent()}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },

});

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },tabItem:{
    backgroundColor:'red'
  }
});

module.exports = TabBarExample;

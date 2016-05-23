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
import Page1 from './page1';
import Page2 from './page2';
import Demo1 from './Demo1';
import NavUi from './navigation';

var TabBarExample = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.',
  },

  displayName: 'TabBarExample',

  getInitialState: function() {
    return {
      selectedTab: 'redTab',
      notifCount: 0,
      presses: 0,
    };
  },

  _renderContent: function(color: string, pageText: string, num?: number) {
    if (this.state.selectedTab=='redTab') {
      return (<Demo1/>);
    }else if (this.state.selectedTab=='blueTab') {
      return (<NavUi initView={Demo1}/>);
    }else{
      return (<Page2/>)
    }
  },

  render: function() {
    return (
      <TabBarIOS
        unselectedTintColor="yellow"
        tintColor="white"
        barTintColor="darkslateblue">
        <Icon.TabBarItemIOS
          title="首页"
          iconName="ios-home-outline"
          selectedIconName="ios-home"
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
          {this._renderContent('#414A8C', 'Blue Tab')}
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="列表"
          iconName="ios-car-outline"
          selectedIconName="ios-car"
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab'
            });
          }}>
          {this._renderContent('#783E33', 'Red Tab', this.state.notifCount)}
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          iconName="ios-settings-outline"
          selectedIconName="ios-settings"
          renderAsOriginal
          title="更多"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab'
            });
          }}>
          {this._renderContent()}
        </Icon.TabBarItemIOS>
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
  },
});

module.exports = TabBarExample;

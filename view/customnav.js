'use strict';
var React = require('react');
var ReactNative = require('react-native');
var {
  Navigator,
  StatusBar,
  StyleSheet,
  Text,
  View
} = ReactNative;

class CustomNav extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'CustomNav';
    }
    render() {
        return (
          <Navigator
        initialRoute={{name: 'sss', component: this.props.component, index:0}}
        configureScene={()=>{return Navigator.SceneConfigs.PushFromRight;}}
        renderScene={(route, navigator) => {
          let Component = route.component;
          return (
            <View style={styles.container}>
              <Component navigator={navigator} name={route.name} route={route} {...route.passProps}/>
            </View>
          );
        }}
        />
      );
    }
}

export default CustomNav;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  emptyPageText: {
    margin: 10,
  },
});

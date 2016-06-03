import React from 'react';
import {
  Component,
  Text,
  Navigator,
  View
} from 'react-native';
import NavigationBar from 'react-native-navbar';

function renderScene(route, navigator) {
  return <route.component route={route} navigator={navigator} />;
}

class  InitialScreen extends Component {
  constructor() {

  }

  render(){
    return (
      <View style={[backgroundColor:'red',flex:1]}></View>
    );
  }
}


class Routing extends Component {
  render() {
    const initialRoute = {
      component: InitialScreen
    };

    return (
      <View style={{ flex: 1, }}>
        <Navigator
          initialRoute={initialRoute}
          renderScene={initialRoute}/>
      </View>
    );
  }
}

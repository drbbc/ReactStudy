import React, {
  Component
}
from 'react';
//爱车主界面
import {
  View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Image, ListView, PickerIOS, Animated
}
from 'react-native';

var PickerItemIOS = PickerIOS.Item;

import NavigationBar from 'react-native-navbar';
import Global from '../tools/Global';
import Util from '../tools/utils';
import Swiper from 'react-native-swiper';

export default class MainView extends Component {
  constructor() {
    super();
    this.state = {
      pkCode: '',
      carList: [],
      vin: '',
      carName: '爱车',
      fadeAnim: new Animated.Value(Util.size.height),
      buttoms: [
        '控  制', '车  况', '故  障', '充电桩', '维修点', '经销商'
      ], carInfo: {}
    };
  }

  componentWillMount() {
    this.state.pkCode = Global.pkCode;
    let parms = {
      pkCode: this.state.pkCode
    };
    Util.post('car/findCarList', parms, true, (list) => {
      console.log(list);
      let carList = list.data.carList;
      if (carList.length > 0) {
        console.log(carList[0].carName);
        this.setState({
          carList: carList,
          carName: carList[0].carName,
          vin: carList[0].vinCode
        });
        this._loadCarInfo();
      }
    });
  }

  _loadCarInfo() {
    let parms = {
      pkCode: this.state.pkCode,
      vinCode: this.state.vin
    };
    Util.post('car/carInfo', parms, true, (info) => {
      console.log('carInfo:' + JSON.stringify(info));
      this.setState({
        carInfo: info.data
      });
    });
  }

  componentDidMount() {

    // this.setState({
    //   fadeAnim:Util.size.height
    // });

    // Animated.timing(          // Uses easing functions
    //   this.state.fadeAnim,    // The value to drive
    //   { toValue: Util.size.height },           // Configuration
    // ).start();
  }

  _bannerPress() {

  }

  _pressNavTitle() {
    // console.log('clicked:' + this.state.fadeAnim);
    Animated.timing(          // Uses easing functions
      this.state.fadeAnim,    // The value to drive
      { toValue: Util.size.height - 250 },           // Configuration
    ).start();
  }

  _chanageSelectedCar(carVin, index) {
    // console.log(carVin);
    // console.log(JSON.stringify(this.state.carList));
    this.setState({
      vin: this.state.carList[index].vinCode,
      carName: this.state.carList[index].carName,
    });

    Animated.timing(          // Uses easing functions
      this.state.fadeAnim,    // The value to drive
      { toValue: Util.size.height },           // Configuration
    ).start();

    this._loadCarInfo();
  }

  _pressCon(index) {
    console.log('index:' + index);
  }

  render() {
    let cricleHeight = Math.max(Util.size.width / 3, 140) - 10;

    return (
      <View style = {styles.container} >
        <View style ={styles.navigation} >
          <TouchableOpacity onPress={() => this._pressNavTitle() } activeOpacity={0.3}>
            <View style ={styles.navTitle} >
              <Text style = {styles.navText} >
                {this.state.carName}</Text><Image style={{ width: 20, height: 20 }} source={require('../images/nav_arrow_bottom.png') }/>
            </View>
          </TouchableOpacity>
        </View>

        <Swiper
          height={150}
          showsButtons ={false}
          autoplay ={true}
          activeDot ={
            < View style = {
              {
                backgroundColor: 'rgba(255,255,255,0.8)',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }
            }/>}>
          <TouchableHighlight onPress = {() => this._bannerPress(11) }>
            <View style = {styles.slide} >
              <Image style = {styles.image} source = {require('../images/banner@2x.png') } ></Image>
            </View>
          </TouchableHighlight>
        </Swiper>
        {this._initCarInfoUI() }
        <View style={{height:12,backgroundColor:'rgb(230,230,230)'}}></View>
        <View style={styles.collection}>
          {this._initCollectionUI() }
        </View>

        <Animated.View style={{
          top: this.state.fadeAnim,
          backgroundColor: 'rgb(80,120,200)',
          position: 'absolute',
          height: 250,
          left: 0,
          right: 0,
          width: Util.size.width
        }} >
          <Text style={{ marginTop: 5, fontSize: 20 }}>车辆列表</Text>
          <PickerIOS
            selectedValue={this.state.carName}
            onValueChange={(carMake, index) => this._chanageSelectedCar(carMake, index) }
            >
            {Object.keys(this.state.carList).map((carMake, index) => (
              <PickerItemIOS
                key={index}
                value={this.state.carList[carMake].carName}
                label={this.state.carList[carMake].carName}
                />
            )
            ) }
          </PickerIOS>
        </Animated.View >
      </View >
    );
  }

  _initCarInfoUI() {
    console.log('carInfo------' + JSON.stringify(this.state.carInfo));
    let carInfo = this.state.carInfo.carInfo;
    if (carInfo != null) {
      return <View style = {styles.infoView} >
        <View style = {[styles.info1, { justifyContent: 'center' }]} >
          <View style = {{ marginLeft: 10 }}>
            <Text style={{ fontSize: 16, color: 'rgb(100,100,100)' }}>预计续航：</Text>
            <Text style={{ color: Util.mainColor, fontSize: 16 }}>{carInfo.enduranceMile}
              <Text style={{ color: 'rgb(100,100,100)' }}> KM</Text>
            </Text>

            <Text style={{ fontSize: 16, color: 'rgb(100,100,100)', marginTop: 20 }}>可用时长：</Text>
            <Text style={{ color: Util.mainColor, fontSize: 16 }}>{carInfo.enduranceTime}
            </Text>
          </View>
        </View>
        <View style = {styles.info2} ></View>
        <View style = {[styles.info3,{ justifyContent: 'center' }]} >
          <View style = {{ marginLeft: 10 }}>
            <Text style={{ fontSize: 16, color: 'rgb(100,100,100)' }}>百公里耗电：</Text>
            <Text style={{ color: Util.mainColor, fontSize: 16 }}>{carInfo.mileQuantity}
              <Text style={{ color: 'rgb(100,100,100)' }}> 度</Text>
            </Text>

            <Text style={{ fontSize: 16, color: 'rgb(100,100,100)', marginTop: 20 }}>已行驶里程：</Text>
            <Text style={{ color: Util.mainColor, fontSize: 16 }}>{carInfo.totalMileage}
            <Text style={{ color: 'rgb(100,100,100)' }}> KM</Text>
            </Text>
          </View>
        </View>
      </View>
    }
  }


  _initCollectionUI() {

    let outComp = [];
    for (let i = 0; i < this.state.buttoms.length; i++) {
      let item = this.state.buttoms[i];
      let s = '';
      let img = '';
      switch (i) {
        case 0:
          s = [styles.cItemImage, styles.cItemBk0];
          img = <Image source={require('../images/indexControl@2x.png') }/>
          break;
        case 1:
          s = [styles.cItemImage, styles.cItemBk1];
          img = <Image source={require('../images/indexCarInfo@2x.png') }/>
          break;
        case 2:
          s = [styles.cItemImage, styles.cItemBk2];
          img = <Image source={require('../images/indexMessage@2x.png') }/>
          break;
        case 3:
          s = [styles.cItemImage, styles.cItemBk3];
          img = <Image source={require('../images/indexElec@2x.png') }/>
          break;
        case 4:
          s = [styles.cItemImage, styles.cItemBk4];
          img = <Image source={require('../images/indexrepairStation@2x.png') }/>
          break;
        case 5:
          s = [styles.cItemImage, styles.cItemBk5];
          img = <Image source={require('../images/indexDealer@2x.png') }/>
          break;
      }


      outComp.push(
        <View style={styles.collectionItem} key={'list'+i}>
          <TouchableOpacity onPress={() => this._pressCon(i) }>
            <View style={styles.cItem}>
              <View style={s}>
                {img}
              </View>
              <Text style={styles.cItemText}>{item}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
    return outComp;
  }


}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigation: {
    height: 64,
    backgroundColor: Util.mainColor,
    alignItems: 'center',
  },
  navTitle: {
    marginTop: 20,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navText: {
    fontSize: 24,
    color: 'white',
  },
  slide: {
    flex: 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideText: {
    position: "absolute",
    bottom: 0,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "rgba(255,255,255,0.5)",
    width: Util.size.width,
    textAlign: "center",
    fontSize: 12
  },
  image: {
    width: Util.size.width,
    flex: 1,
    alignSelf: 'stretch',
  },
  infoView: {
    height: 140,
    flexDirection: 'row'
  },
  info1: {
    flex: 1,
  },
  info2: {
    flex: 1,
  },
  info3: {
    flex: 1,
  },
  collection: {
    height: Util.size.width / 3 * 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Util.size.width,
    borderBottomColor: 'rgb(210,210,210)',
    borderBottomWidth: 1,

  }, collectionItem: {
    width: Util.size.width / 3,
    height: Util.size.width / 3,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderLeftColor: 'rgb(210,210,210)',
    borderTopColor: 'rgb(210,210,210)',
    justifyContent: 'center'
  }, cItem: {
    alignItems: 'center',
  }, cItemText: {
    marginTop: 5,
    fontSize: 18,
    color: 'rgb(20,20,20)'
  }, cItemImage: {

    width: 61,
    height: 61,
    borderRadius: 60,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }, cItemBk0: {
    backgroundColor: Util.mainColor,
  }
  , cItemBk1: {
    backgroundColor: '#00bab6',
  },
  cItemBk2: {
    backgroundColor: '#f1cc52'
  },
  cItemBk3: {
    backgroundColor: '#ffa200'
  },
  cItemBk4: {
    backgroundColor: '#00a2f4'
  }, cItemBk5: {
    backgroundColor: '#ff6666'
  }
});

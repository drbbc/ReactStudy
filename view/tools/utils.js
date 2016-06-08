// obtained from react native tutorials

import React,{PixelRatio,NativeModules} from 'react-native';
import Dimensions from 'Dimensions';


const Util = {
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  post(url, data,empty, callback) {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:''
    };

    const Properties =  NativeModules.Properties;

    if (empty) {
      data = JSON.stringify(data);
      Properties.encryptParameters(data,(error,d)=>{
        var parms = new FormData();
        parms.append('data',d);
        fetchOptions.body = parms;
        fetch('http://down.evcoming.com:5141/zdou_app/'+url, fetchOptions)
        .then((response) => {
          var outData;
          if (empty) {
            var o;
            Properties.decryptUseDES(response._bodyText,(error,out)=>{
              callback(out);
            });
            return o;
          }else
          return response.json()
        }).catch((e)=>{
          console.log(e);
        });
      });
    }


  },
  key: 'BDKHFSDKJFHSDKFHWEFH-REACT-NATIVE',
  mainColor:'rgb(102,176,50)',
};


// import {StyleSheet, Platform} from 'react-native';

// export function create(styles: Object): {[name: string]: number} {
//   const platformStyles = {};
//   Object.keys(styles).forEach((name) => {
//     let {ios, android, ...style} = {...styles[name]};
//     if (ios && Platform.OS === 'ios') {
//       style = {...style, ...ios};
//     }
//     if (android && Platform.OS === 'android') {
//       style = {...style, ...android};
//     }
//     platformStyles[name] = style;
//   });
//   return StyleSheet.create(platformStyles);
// }

export default Util;

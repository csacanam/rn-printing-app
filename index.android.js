/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import qz from 'qz-tray';
//import sha from 'sha';
//import './shim.js'

export default class PrintingApp extends Component {

  componentWillMount(){  
    qz.api.setPromiseType(function promise(resolver) { 
      return new Promise(resolver); 
    });
    
    var createHash = require('sha.js');

    qz.api.setSha256Type(function(data){
      console.log('a');
      //var crypto = require('crypto')
      console.log('b');
      var abc = createHash('sha1').update('abc').digest('hex')
      console.log(abc)
      return createHash('sha256').update(data).digest('hex');
    });

    var options = {};
    options.host = "192.168.1.53";

    qz.websocket.connect(options).then(function() {
      Alert.alert("Connected!");
      findPrinters();
      sendPrint();
    }).catch(function(e) {
      Alert.alert("Problem");
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

function findPrinters() {
  qz.printers.find().then(function(data) {
    console.log(data);
    
     /*var list = '';
     for(var i = 0; i < data.length; i++) {
        //list += "&nbsp; " + data[i] + "<br/>";
        console.log("&nbsp; " + data[i] + "<br/>");
    }*/
    //displayMessage("<strong>Available printers:</strong><br/>" + list);
 }).catch(function(e) { console.error(e); });
}

function sendPrint() {
  var config = qz.configs.create("HP Deskjet 2050 J510 series");               // Exact printer name from OS
  var data = ['^XA^FO50,50^ADN,36,20^FDRAW ZPL EXAMPLE^FS^XZ'];   // Raw commands (ZPL provided)

  qz.print(config, data).then(function() {
    alert("Sent data to printer");
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('PrintingApp', () => PrintingApp);

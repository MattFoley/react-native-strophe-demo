/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import './shim.js'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Strophe from 'strophe.js';

export default class reactnativestrophe extends Component {

  constructor(props) {
    super();
    this.connection = new window.Strophe.Connection("ws://localhost:5280/http-ws/");
    let jid = 'test@localhost';
    let password = 'password';
    this.connection.connect(jid, password, this.onConnect);
  }

  rawInput(data) {
    console.log('RECV: ' + data);
  }
  rawOutput(data) {
    console.log('SENT: ' + data);
  }

  onConnect(status) {
    if (status == Strophe.Status.CONNECTING) {
      console.log('Strophe is connecting.');
    } else if (status == Strophe.Status.CONNFAIL) {
  	  console.log('Strophe failed to connect.');
  	  $('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.DISCONNECTING) {
  	  console.log('Strophe is disconnecting.');
    } else if (status == Strophe.Status.DISCONNECTED) {
  	  console.log('Strophe is disconnected.');
  	  $('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.CONNECTED) {
  	  console.log('Strophe is connected.');
      console.log('ECHOBOT: Send a message to ' + connection.jid +  ' to talk to me.');
  	  connection.addHandler(onMessage, null,    'message', null, null,  null);
  	  connection.addHandler(onOwnMessage, null, 'iq', 'set', null,  null);
  	  connection.send($pres().tree());
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
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

AppRegistry.registerComponent('reactnativestrophe', () => reactnativestrophe);

import React, {Component, useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';

// ...
export default class WebViewComponent extends Component {
  disableDocumentPreview = this.props.disablePreview;
  theme = this.props.theme;
  embedUrl = this.props.embedUrl;

  // For debugging purposes
  error = `
  window.onerror = function(message, sourcefile, lineno, colno, error) {
      alert('Message: ' + message + ' - Source: ' + sourcefile + ' Line: ' + lineno + ':' + colno);
      return true;
    };
  `;

  render() {
    return (
      <View style={styles.view}>
        <WebView
          style={styles.webview}
          ref={ref => (this.webview = ref)}
          source={{uri: this.embedUrl}}
          injectedJavaScriptBeforeContentLoaded={this.error}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  webview: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  view: {flex: 1, flexDirection: 'column'},
});

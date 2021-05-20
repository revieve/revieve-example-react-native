/**
 * Sample React Native App integrating Revieve framework in a webview
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';

const styles = StyleSheet.create({
  fullHeight: {
    height: '100%',
  },
});

const App = () => {
  const [userAgent, setUserAgent] = useState(null);

  useEffect(() => {
    (async () => {
      // get the userAgent from the device
      const deviceAgent = await DeviceInfo.getUserAgent();
      // Having wv in the user agent string stops getUserMedia from working. Could do with finding some more info as to what is causing this.
      setUserAgent(deviceAgent.replace(/; ?wv/g, ''));
    })();
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  // only render when we have a userAgent
  if (!userAgent) {
    return null;
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.fullHeight}>
        <WebView
          source={{uri: 'https://demov4.revieve.com'}}
          automaticallyAdjustContentInsets={false}
          geolocationEnabled={true}
          javaScriptEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          userAgent={userAgent}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

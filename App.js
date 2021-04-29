/**
 * Sample React Native App integrating Revieve framework in a webview
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          height: "100%",
        }}>
        <WebView
          source={{ uri: 'https://demov4.revieve.com' }}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

import { useRef, useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";

const HTML = `
<!doctype html>
<html lang="en">
  <headers>
    <meta name="viewport" content="width=device-width,initial-scale=1,minimal-ui">
    <meta name="theme-color" content="#000000">
  </headers>
  <body>
    <script type="text/javascript">
      // DEBUG
      const consoleLog = (type, ...log) => {
        const data = log.length === 1 ? log[0] : log; 
        window.ReactNativeWebView.postMessage(JSON.stringify( {'type': 'Console', 'data': data }));
      }
      console = {
          log: (...log) => consoleLog('log', ...log),
          debug: (log) => consoleLog('debug', log),
          info: (log) => consoleLog('info', log),
          warn: (log) => consoleLog('warn', log),
          error: (log) => consoleLog('error', log),
        };      
    </script>

    <script type="text/javascript">
      var config = {
        partner_id: '9KpsLizwYK',
        experienceId: 'experience_demo',
        env: 'test',
        onAddToCart: function(product) {
          window.ReactNativeWebView.postMessage(JSON.stringify( {'type': 'AddToCart', 'data': product }));
        }
      };

      (() => {
        try {       
            var rv = document.createElement('script');
            rv.src = 'https://d38knilzwtuys1.cloudfront.net/revieve-plugin-v4/revieve-plugin-loader.js';
            rv.charset = 'utf-8';
            rv.type = 'text/javascript';
            rv.async = 'true';
            rv.onload = rv.onreadystatechange = function() {
              try {    
                  var rs = this.readyState;
                  if (rs && rs != 'complete' && rs != 'loaded') return;
                  
                  Revieve.Init(config, function() {
                    Revieve.API.show();
                  });
                  
               } catch(e) {
                 console.log("ERROR", e.message, e)
               }
            };
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(rv, s);

         } catch(e){
           console.log("ERROR", e.message, e)
         }
      
      })()
    </script>
  </body>
</html>
`;

export function Advisor() {
  const webviewRef = useRef();
  const [product, setProduct] = useState(null);

  const messageHandler = (payload) => {
    try {
      const dataPayload = JSON.parse(payload.nativeEvent.data);
      switch (dataPayload.type) {
        case "AddToCart":
          setProduct(dataPayload.data);
          break;
        case "Console":
          console.log(`[WebView] ${JSON.stringify(dataPayload.data)}`);
          break;
        default:
          console.log(dataPayload);
      }
    } catch (e) {
      console.log("[WebView]", payload.nativeEvent.data);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.revieve}>
        <WebView
          ref={webviewRef}
          source={{
            html: HTML,
            baseUrl: "https://d38knilzwtuys1.cloudfront.net/",
          }}
          style={{ height: "100%", width: "100%" }}
          onMessage={messageHandler}
        />
      </View>
      <View style={styles.controls}>
        {product && <Text>Product added to cart: {product.name}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 20,
    backgroundColor: "#ecf0f1",
    display: "flex",
  },
  revieve: {
    flex: 1,
  },
  controls: {
    width: "100%",
    height: 100,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  button: {
    backgroundColor: "#CCCCCC",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  selected: {
    backgroundColor: "#000000",
  },
  textSelected: {
    color: "#FFFFFF",
  },
});

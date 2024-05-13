import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Advisor } from "./screens/Advisor";
import { MakeUp } from "./screens/MakeUp";

export default function App() {
  const [screen, setScreen] = useState("home");

  return (
    <View style={styles.container}>
      {screen !== "home" && (
        <TouchableOpacity style={styles.back} onPress={() => setScreen("home")}>
          <Text>{"<"} back</Text>
        </TouchableOpacity>
      )}
      {(() => {
        switch (screen) {
          case "home":
            return (
              <View style={styles.controls}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setScreen("advisor")}
                >
                  <Text>Advisor demo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setScreen("makeup")}
                >
                  <Text>MakeUp demo</Text>
                </TouchableOpacity>
              </View>
            );
          case "advisor":
            return <Advisor />;
          case "makeup":
            return <MakeUp />;
        }
      })()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 50,
    backgroundColor: "#ecf0f1",
    padding: 8,
    display: "flex",
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

  back: {
    backgroundColor: "#CCCCCC",
    width: 70,
    padding: 10,
  },
});

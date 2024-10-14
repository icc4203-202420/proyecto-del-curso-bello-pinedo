import React from "react";
import { StyleSheet} from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import HomeNavigation from "./src/Home/navigation/HomeNavigation";

function App() {
  return (
    <NavigationContainer>
      <HomeNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5c000",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
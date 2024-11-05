import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BarsScreen from "../screens/BarsScreen";

const CoreStack = createNativeStackNavigator();

const BarsNavigation = () => {
  return (
    <CoreStack.Navigator>
      <CoreStack.Screen
        name="Bars"
        component={BarsScreen}
        options={{ headerShown: false }}
      />

    </CoreStack.Navigator>
  );
};

export default BarsNavigation;
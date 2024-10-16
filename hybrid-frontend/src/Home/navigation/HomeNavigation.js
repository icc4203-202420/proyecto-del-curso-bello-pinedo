import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import BeersSearch from "../../Beers/screens/BeerSearch";  // Pantalla de búsqueda de cervezas
import BeerDetails from "../../Beers/screens/BeersDetails";  // Pantalla de detalles de una cerveza
import SignIn from "../../User/screens/SignIn";
import SignUp from "../../User/screens/SignUp";

const CoreStack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <CoreStack.Navigator initialRouteName="SignIn">
      {/* Pantalla de Inicio de Sesión */}
      <CoreStack.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: 'Sign In', headerShown: false }}
      />
      {/* Pantalla de Registro */}
      <CoreStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: 'Sign Up', headerShown: false }}
      />
      {/* Pantalla Principal (Home) */}
      <CoreStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      {/* Pantalla de Búsqueda de Cervezas */}
      <CoreStack.Screen
        name="BeersSearch"
        component={BeersSearch}
        options={{ title: 'Search Beers' }}
      />
      {/* Pantalla de Detalles de una Cerveza */}
      <CoreStack.Screen
        name="BeerDetails"
        component={BeerDetails}
        options={{ title: 'Beer Details' }}
      />
    </CoreStack.Navigator>
  );
};

export default HomeNavigation;

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
        options={{ 
          title: 'Sign In',
          headerStyle: {
            backgroundColor: '#1E1E1E',  // Cambia el color del fondo de la barra
          },
          headerTintColor: '#FFF',  // Cambia el color de la flecha y el texto
          headerTitleStyle: {
            fontWeight: 'bold',  // Ajusta el estilo del texto del título
          },
          headerShown: false,  // Oculta la barra de navegación
         }}
      />
      {/* Pantalla de Registro */}
      <CoreStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ 
          title: 'SignUp',
          headerStyle: {
            backgroundColor: '#1E1E1E',  // Cambia el color del fondo de la barra
          },
          headerTintColor: '#FFF',  // Cambia el color de la flecha y el texto
          headerTitleStyle: {
            fontWeight: 'bold',  // Ajusta el estilo del texto del título
          },
          headerShown: false, 
         }}
      />
      {/* Pantalla Principal (Home) */}
      <CoreStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ 
          title: 'Home',
          headerStyle: {
            backgroundColor: '#1E1E1E',  // Cambia el color del fondo de la barra
          },
          headerTintColor: '#f5c000',  // Cambia el color de la flecha y el texto
          headerTitleStyle: {
            fontWeight: 'bold',
              // Ajusta el estilo del texto del título
          },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
         }}
      />
      {/* Pantalla de Búsqueda de Cervezas */}
      <CoreStack.Screen
        name="BeersSearch"
        component={BeersSearch}
        options={{ 
          title: 'Beers',
          headerStyle: {
            backgroundColor: '#1E1E1E',  // Cambia el color del fondo de la barra
          },
          headerTintColor: '#f5c000',  // Cambia el color de la flecha y el texto
          headerTitleStyle: {
            fontWeight: 'bold',  // Ajusta el estilo del texto del título
          },
          headerShadowVisible: false, 
          headerTitleAlign: 'center', // Oculta la sombra de la barra
         }}
      />
      {/* Pantalla de Detalles de una Cerveza */}
      <CoreStack.Screen
        name="BeerDetails"
        component={BeerDetails}
        options={{ 
          title: 'Beer Details',
          headerStyle: {
            backgroundColor: '#1E1E1E',  // Cambia el color del fondo de la barra
          },
          headerTintColor: '#f5c000',  // Cambia el color de la flecha y el texto
          headerTitleStyle: {
            fontWeight: 'bold',  // Ajusta el estilo del texto del título
          },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
         }}
      />
    </CoreStack.Navigator>
  );
};

export default HomeNavigation;

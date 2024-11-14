import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import BeersSearch from "../../Beers/screens/BeerSearch";  // Pantalla de búsqueda de cervezas
import BeerDetails from "../../Beers/screens/BeersDetails";  // Pantalla de detalles de una cerveza
import SignIn from "../../User/screens/SignIn";
import SignUp from "../../User/screens/SignUp";
import EventsSearch from "../../Events/screens/EventsSearch";
import EventsDetails from "../../Events/screens/EventsDetails";
import EventsGallery from "../../Events/screens/EventsGallery";
import EventsPictureDetails from "../../Events/screens/EventsPictureDetails";
import EventsPictureUpload from "../../Events/screens/EventsPictureUpload";
import FriendSearch from "../../Friends/screens/FriendSearch";
import FriendDetails from "../../Friends/screens/FriendDetails";
import FeedScreen from "../../Feed/screens/FeedScreen";

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
            backgroundColor: '#1E1E1E',  
          },
          headerTintColor: '#FFF',  
          headerTitleStyle: {
            fontWeight: 'bold',  
          },
          headerShown: false,  
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
      {/* Pantalla de Búsqueda de Eventos */}
      <CoreStack.Screen
        name="EventsSearch"
        component={EventsSearch}
        options={{ 
          title: 'Events',
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

        {/* Pantalla de Detalles de un Evento */}
         <CoreStack.Screen
         name="EventsDetails"
         component={EventsDetails}
         options={{
          title: 'Event Details',
          headerStyle: {
            backgroundColor: '#1E1E1E',  // Cambia el color del fondo de
          },
          headerTintColor: '#f5c000',  // Cambia el color de la flecha y el texto
          headerTitleStyle: {
            fontWeight: 'bold',  // Ajusta el estilo del texto del título
          },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
        }}
      />
      {/* Pantalla de Galería de un Evento */}
      <CoreStack.Screen
        name="EventsGallery"
        component={EventsGallery}  // Add EventsGallery here
        options={{
          title: 'Event Gallery',
          headerStyle: {
            backgroundColor: '#1E1E1E',
          },
          headerTintColor: '#f5c000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
        }}
      />
      {/* Pantalla de Detalles de una Imagen de un Evento */}
      <CoreStack.Screen
        name="EventsPictureDetails"
        component={EventsPictureDetails}
        options={{
          title: "Picture Details",
          headerStyle: { backgroundColor: "#1E1E1E" },
          headerTintColor: "#f5c000",
          headerTitleStyle: { fontWeight: "bold" },
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      {/* Pantalla de Detalles de una Imagen de un Evento */}
      <CoreStack.Screen
        name="EventsPictureUpload"
        component={EventsPictureUpload}
        options={{
          title: "Picture Details",
          headerStyle: { backgroundColor: "#1E1E1E" },
          headerTintColor: "#f5c000",
          headerTitleStyle: { fontWeight: "bold" },
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      {/* Pantalla de Busqueda de Usuarios */}
        <CoreStack.Screen
         name="FriendSearch"
         component={FriendSearch}
         options={{
          title: 'Friends',
          headerStyle: {
            backgroundColor: '#1E1E1E',  // Cambia el color del fondo de
          },
          headerTintColor: '#f5c000',  // Cambia el color de la flecha y el texto
          headerTitleStyle: {
            fontWeight: 'bold',  // Ajusta el estilo del texto del título
          },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
        }}
      />
      {/* Pantalla de Detalles de un Usuario */}
        <CoreStack.Screen
         name="FriendDetails"
         component={FriendDetails}
         options={{
          title: 'Friend Add',
          headerStyle: {
            backgroundColor: '#1E1E1E',  // Cambia el color del fondo de
          },
          headerTintColor: '#f5c000',  // Cambia el color de la flecha y el texto
          headerTitleStyle: {
            fontWeight: 'bold',  // Ajusta el estilo del texto del título
          },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
        }}
      />
      <CoreStack.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          title: 'Feed',
          headerStyle: { backgroundColor: '#1E1E1E' },
          headerTintColor: '#f5c000',
          headerTitleStyle: { fontWeight: 'bold' },
          headerShadowVisible: true,
          headerTitleAlign: 'center',
          headerShown: true,  // Asegúrate de que esté configurado en "true"
        }}
      />

    </CoreStack.Navigator>
  );
};

export default HomeNavigation;

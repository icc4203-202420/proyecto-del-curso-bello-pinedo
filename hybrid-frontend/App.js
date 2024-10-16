import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeNavigation from "./src/Home/navigation/HomeNavigation";
import BeersSearch from './src/Beers/screens/BeerSearch'; // Pantalla de búsqueda de cervezas
import BeerDetails from './src/Beers/screens/BeersDetails'; // Pantalla de detalles de una cerveza

// Crear el Stack Navigator
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./assets/beer-icon.png')} style={styles.logo} />
          <Text style={styles.headerTitle}>BeerMark</Text>
          <TouchableOpacity>
            <Text style={styles.logoutButton}>LOG OUT</Text>
          </TouchableOpacity>
        </View>

        {/* Configuración de Stack Navigator */}
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeNavigation} options={{ headerShown: false }} />
          <Stack.Screen name="BeersSearch" component={Beers} options={{ title: 'Search Beers' }} />
          <Stack.Screen name="BeerDetails" component={BeerDetails} options={{ title: 'Beer Details' }} />
        </Stack.Navigator>

        {/* Footer con navegación */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton}>
            <Icon name="home" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Icon name="store" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Icon name="calendar" size={24} color="#000" />
          </TouchableOpacity>
          {/* Navegar a BeersSearch al presionar el ícono de búsqueda */}
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('BeersSearch')}>
            <Icon name="search" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Icon name="user" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E1E' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#f5c000' },
  logo: { width: 30, height: 30 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  logoutButton: { fontSize: 16, color: '#000' },

  footer: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#f5c000' },
  footerButton: { padding: 10 },
});

export default App;

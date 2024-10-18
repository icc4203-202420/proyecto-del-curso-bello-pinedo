import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeNavigation from "./src/Home/navigation/HomeNavigation"; // Importa HomeNavigation
import BeersSearch from "./src/Beers/screens/BeerSearch";  // Pantalla de búsqueda de cervezas
import BeerDetails from "./src/Beers/screens/BeersDetails";
import SignIn from "./src/User/screens/SignIn";
import SignUp from "./src/User/screens/SignUp";
const Stack = createNativeStackNavigator();

function Footer() {
  const navigation = useNavigation(); // Usar useNavigation para la navegación
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Bar')}>
        <Icon name="shopping-basket" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Calendar')}>
        <Icon name="calendar" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('BeersSearch')}>
        <Icon name="beer" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('SignIn')}>
        <Icon name="user" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Image source={require('./assets/beer-icon.png')} style={styles.logo} />
          <Text style={styles.headerTitle}>BeerMark</Text>
        </View>

        {/* Stack Navigator */}
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeNavigation} options={{ headerShown: false }} />
          <Stack.Screen name="BeersSearch" component={BeersSearch} options={{ title: 'Search Beers' }} />
          <Stack.Screen name="BeerDetails" component={BeerDetails} options={{ title: 'Beer Details' }} />
        </Stack.Navigator>

        <Footer />  
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

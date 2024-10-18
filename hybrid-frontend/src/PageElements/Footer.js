import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Don't forget to import Icon
import AsyncStorage from '@react-native-async-storage/async-storage'; 

function Footer() {
    const navigation = useNavigation(); 
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user'); 
            navigation.navigate('SignIn');
        } catch (error) {
            console.error('Error removing user data:', error);
        }
    };

    return (
      <SafeAreaView style={styles.safeArea}>
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
          <TouchableOpacity style={styles.footerButton} onPress={handleLogout}>
            <Icon name="sign-out" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#f5c000', // Ensure the background color applies to the safe area
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  footerButton: {
    padding: 10,
  }
});

export default Footer;

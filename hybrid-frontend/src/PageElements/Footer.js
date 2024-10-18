import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Don't forget to import Icon

function Footer() {
    const navigation = useNavigation(); // Use useNavigation for navigation
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
          <Icon name="sign-out" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5c000',
    padding: 15,
  },
  footerButton: {
    padding: 10,
  }
});

export default Footer; // Corrected export statement

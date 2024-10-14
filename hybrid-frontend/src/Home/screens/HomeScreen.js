import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('/home/topo/AppMOv/proyecto-del-curso-bello-pinedo/hybrid-frontend/assets/beer-icon.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>BeerMark</Text>
        <TouchableOpacity>
          <Text style={styles.logoutButton}>LOG OUT</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>0--0-
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Now</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Search friends" />
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="search" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Most visited Bars</Text>
          <View style={styles.barCard}>
            <Icon name="map-marker" size={20} color="#000" />
            <View>
              <Text style={styles.barName}>Oculto Beergarden</Text>
              <Text style={styles.eventDescription}>Descripcion de evento</Text>
            </View>
          </View>
          <View style={styles.barCard}>
            <Icon name="map-marker" size={20} color="#000" />
            <View>
              <Text style={styles.barName}>Barba Azul Apoquindo</Text>
              <Text style={styles.eventDescription}>Descripcion de evento</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending events</Text>
          <View style={styles.trendingEvent}>
            <Icon name="fire" size={20} color="#000" />
            <View>
              <Text style={styles.barName}>Cata a ciegas</Text>
              <Text style={styles.eventDescription}>Descripcion de evento</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="calendar" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="search" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="user" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E1E' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#f5c000' },
  logo: { width: 30, height: 30 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  logoutButton: { fontSize: 16, color: '#000' },

  content: { flex: 1, padding: 15 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#f5c000' },
  eventImage: { width: '100%', height: 150, borderRadius: 10 },

  searchContainer: { flexDirection: 'row', marginBottom: 20 },
  searchInput: { flex: 1, backgroundColor: '#FFF', padding: 10, borderRadius: 5 },
  searchButton: { marginLeft: 10, padding: 10, backgroundColor: '#f5c000', borderRadius: 5 },

  barCard: { flexDirection: 'row', padding: 15, backgroundColor: '#f5c000', marginBottom: 10, borderRadius: 10 },
  barName: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  eventDescription: { fontSize: 14, marginLeft: 10 },

  trendingEvent: { flexDirection: 'row', padding: 15, backgroundColor: '#f5c000', borderRadius: 10 },

  footer: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#f5c000' },
  footerButton: { padding: 10 }
});

export default HomeScreen;

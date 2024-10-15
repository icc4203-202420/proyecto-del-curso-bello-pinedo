import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  return (
    <View style={styles.container}>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E1E' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#f5c000' },

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
});

export default HomeScreen;

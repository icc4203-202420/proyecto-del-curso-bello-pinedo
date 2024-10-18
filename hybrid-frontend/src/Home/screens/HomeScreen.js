import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axiosInstance from '../../PageElements/axiosInstance';
import { NGROK_URL } from '@env';

const HomeScreen = () => {
  const [bars, setBars] = useState([]); 
  const [loading, setLoading] = useState(true);

  const fetchBars = async () => {
    setLoading(true);  
  
    try {
      const response = await fetch(`${NGROK_URL}/api/v1/bars`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      console.log('Raw Response:', response);
      console.log('API Response:', data);
  
      // Access the bars array within the response
      if (data && Array.isArray(data.bars)) {
        setBars(data.bars); // Set the bars state to the retrieved array
      } else {
        console.error('Expected an array of bars but got:', data);
      }
    } catch (error) {
      console.error('Error fetching bars:', error);
    } finally {
      setLoading(false);  // Set loading state to false after fetching
    }
  };
  
  useEffect(() => {
    fetchBars(); // Call the function to fetch bars when the component mounts
  }, []);  

  useEffect(() => {
    console.log("Bars state:", bars);  // Log the bars state after it's updated
  }, [bars]);
  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
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
          {loading ? (
            <Text style={{ color: '#fff' }}>Loading...</Text>
          ) : (
            bars.map((bar) => (
              <View key={bar.id} style={styles.barCard}>
                <Icon name="map-marker" size={20} color="#000" />
                <View>
                  <Text style={styles.barName}>{bar.name}</Text>
                  <Text style={styles.eventDescription}>Description of the event</Text>
                </View>
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending events</Text>
          <View style={styles.trendingEvent}>
            <Icon name="fire" size={20} color="#000" />
            <View>
              <Text style={styles.barName}>Cata a ciegas</Text>
              <Text style={styles.eventDescription}>Description of the event</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E1E' },
  content: { flex: 1, padding: 15 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#f5c000' },
  searchContainer: { flexDirection: 'row', marginBottom: 20 },
  searchInput: { flex: 1, backgroundColor: '#FFF', padding: 10, borderRadius: 5 },
  searchButton: { marginLeft: 10, padding: 10, backgroundColor: '#f5c000', borderRadius: 5 },
  barCard: { flexDirection: 'row', padding: 15, backgroundColor: '#f5c000', marginBottom: 10, borderRadius: 10 },
  barName: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  eventDescription: { fontSize: 14, marginLeft: 10 },
  trendingEvent: { flexDirection: 'row', padding: 15, backgroundColor: '#f5c000', borderRadius: 10 },
});

export default HomeScreen;

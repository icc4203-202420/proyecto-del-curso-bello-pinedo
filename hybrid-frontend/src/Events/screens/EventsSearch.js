import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../PageElements/axiosInstance';
import Footer from '../../PageElements/Footer';

function EventsSearch() {
  const [searchKeywords, setSearchKeywords] = useState('');
  const [events, setEvents] = useState([]);  
  const [filteredEvents, setFilteredEvents] = useState([]);  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    setLoading(true);
    try {
      const barsResponse = await axiosInstance.get('/bars');
      const bars = barsResponse.data.bars;

      const allEvents = await Promise.all(
        bars.map(async (bar) => {
          const eventsResponse = await axiosInstance.get(`/bars/${bar.id}/events`);
          return eventsResponse.data; 
        })
      );

      const flattenedEvents = allEvents.flat();
      setEvents(flattenedEvents);
      setFilteredEvents(flattenedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Error loading data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchKeywords(text);
    if (text === '') {
      setFilteredEvents(events);  
    } else {
      const filtered = events.filter(event =>
        event.name.toLowerCase().includes(text.toLowerCase())  
      );
      setFilteredEvents(filtered);
    }
  };

  const renderEventItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('EventsDetails', { id: item.id, barId: item.bar_id })}
    >
      <Text style={styles.eventName}>{item.name}</Text>
      <Text style={styles.eventDate}>Date: {new Date(item.date).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Events"
          value={searchKeywords}
          onChangeText={handleSearch}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#f5c000" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <FlatList
            data={filteredEvents} 
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<Text style={styles.noResults}>No results found. Try different keywords.</Text>}
          />
        )}
      </View>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f5c000',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f5c000',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  eventDate: {
    fontSize: 14,
    color: '#000',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    color: '#000',
  },
});

export default EventsSearch;

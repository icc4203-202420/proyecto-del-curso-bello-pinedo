import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../PageElements/axiosInstance';
import Footer from '../../PageElements/Footer';

function BarSearch() {
  const [searchKeywords, setSearchKeywords] = useState('');
  const [bars, setBars] = useState([]);  
  const [filteredBars, setFilteredBars] = useState([]);  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchAllBars();
  }, []);

  const fetchAllBars = () => {
    setLoading(true);
    axiosInstance
      .get('/bars')
      .then((response) => {
        if (response.data) {
          setBars(response.data);  
          setFilteredBars(response.data);  
        } else {
          setBars([]);
          setFilteredBars([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching bars:', error);
        setError('Error loading data.');
        setLoading(false);
      });
  };

  const handleSearch = (text) => {
    setSearchKeywords(text);
    if (text === '') {
      setFilteredBars(bars);  
    } else {
      const filtered = bars.filter(bar =>
        bar.name.toLowerCase().includes(text.toLowerCase())  
      );
      setFilteredBars(filtered);
    }
  };

  const renderBarItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('BarDetails', { barId: item.id })}
    >
      <Text style={styles.barName}>{item.name}</Text>
      <Text style={styles.barLatitude}>Latitude: {item.latitude.toFixed(2)}</Text>
      <Text style={styles.barLongitude}>Longitude: {item.longitude.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Bars"
          value={searchKeywords}
          onChangeText={handleSearch}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#f5c000" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <FlatList
            data={filteredBars} 
            renderItem={renderBarItem}
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
  barName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  barLatitude: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
  },
  barLongitude: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    color: '#f5c000',
  },
});

export default BarSearch;

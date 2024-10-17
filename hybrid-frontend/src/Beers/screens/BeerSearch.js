import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../PageElements/axiosInstance';

function BeersSearch() {
  const [searchKeywords, setSearchKeywords] = useState('');
  const [beers, setBeers] = useState([]);  
  const [filteredBeers, setFilteredBeers] = useState([]);  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchAllBeers();
  }, []);

  const fetchAllBeers = () => {
    setLoading(true);
    axiosInstance
      .get('/beers')
      .then((response) => {
        if (response.data && response.data.beers) {
          setBeers(response.data.beers);  
          setFilteredBeers(response.data.beers);  
        } else {
          setBeers([]);
          setFilteredBeers([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching beers:', error);
        setError('Error loading data.');
        setLoading(false);
      });
  };

  const handleSearch = (text) => {
    setSearchKeywords(text);
    if (text === '') {
      setFilteredBeers(beers);  
    } else {
      const filtered = beers.filter(beer =>
        beer.name.toLowerCase().includes(text.toLowerCase())  
      );
      setFilteredBeers(filtered);
    }
  };

  const renderBeerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('BeerDetails', { id: item.id })}
    >
      <Text style={styles.beerName}>{item.name}</Text>
      <Text style={styles.beerStyle}>Style: {item.style}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Beers</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Beers"
        value={searchKeywords}
        onChangeText={handleSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#f5c000" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={filteredBeers} 
          renderItem={renderBeerItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.noResults}>No results found. Try different keywords.</Text>}
        />
      )}
    </View>
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
  beerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  beerStyle: {
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

export default BeersSearch;

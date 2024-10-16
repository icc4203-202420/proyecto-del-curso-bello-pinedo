import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../PageElements/axiosInstance';

function BeersSearch() {
  const [searchKeywords, setSearchKeywords] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  // Fetch beers from API
  useEffect(() => {
    if (searchKeywords !== '') {
      fetchBeers();
    }
  }, [searchKeywords]);

  const fetchBeers = () => {
    setLoading(true);
    axiosInstance
      .get(`/beers?query=${searchKeywords}`)
      .then((response) => {
        if (response.data && response.data.beers) {
          setSearchResults(response.data.beers);
        } else {
          setSearchResults([]);  // Si no hay cervezas
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching beers:', error);  // Log del error
        setError('Error loading data.');
        setLoading(false);
      });
  };
  
  
  const handleSearch = (text) => {
    console.log('Search keyword:', text);  // Log para ver el valor ingresado
    setSearchKeywords(text);
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

      {/* Barra de búsqueda */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search Beers"
        value={searchKeywords}
        onChangeText={handleSearch}
      />

      {/* Lista de cervezas */}
      {loading ? (
        <ActivityIndicator size="large" color="#f5c000" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={searchResults}
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
    backgroundColor: '#fff',
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

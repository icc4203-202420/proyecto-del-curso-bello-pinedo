import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../PageElements/axiosInstance';
import Footer from '../../PageElements/Footer'; 

function FriendSearch() {
  const [searchKeywords, setSearchKeywords] = useState('');
  const [users, setUsers] = useState([]);  
  const [filteredusers, setFilteredusers] = useState([]);  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = () => {
    setLoading(true);
    axiosInstance
      .get('/users')
      .then((response) => {
        if (response.data) {
          setUsers(response.data);  
          setFilteredusers(response.data);  
        } else {
          setUsers([]);
          setFilteredusers([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching friends:', error);
        setError('Error loading data.');
        setLoading(false);
      });
  };

  const handleSearch = (text) => {
    setSearchKeywords(text);
    if (text === '') {
      setFilteredusers(users);  
    } else {
      const filtered = users.filter(user =>
        user.handle.toLowerCase().includes(text.toLowerCase())  
      );
      setFilteredusers(filtered);
    }
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('FriendDetails', { id: item.id })}
    >
      <Text style={styles.beerName}>{item.handle}</Text>
      <Text style={styles.friendstyle}>{item.first_name} {item.last_name}</Text>
    </TouchableOpacity>
  );

  return (
    <>
    <View style={styles.container}>

      <TextInput
        style={styles.searchInput}
        placeholder="Search friends"
        value={searchKeywords}
        onChangeText={handleSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#f5c000" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={filteredusers} 
          renderItem={renderUserItem}
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
  beerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  friendstyle: {
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

export default FriendSearch;

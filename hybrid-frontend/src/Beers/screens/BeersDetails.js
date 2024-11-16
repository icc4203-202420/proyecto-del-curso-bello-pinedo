import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings'; 
import axiosInstance from '../../PageElements/axiosInstance';
import Footer from '../../PageElements/Footer';
import * as SecureStore from 'expo-secure-store';

function reviewsReducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: '', success: '' };
    case 'SUCCESS':
      return { ...state, loading: false, reviews: action.payload, error: '', success: '' };
    case 'ERROR':
      return { ...state, loading: false, error: action.payload, success: '' };
    case 'SUBMIT_SUCCESS':
      return { ...state, loading: false, reviews: [...state.reviews, action.payload], success: 'Review submitted successfully!', error: '' };
    default:
      return state;
  }
}

function BeerDetails() {
  const [beer, setBeer] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const { id } = useRoute().params;
  const navigation = useNavigation();

  const [state, dispatch] = useReducer(reviewsReducer, {
    reviews: [],
    loading: false,
    error: '',
    success: ''
  });

  useEffect(() => {
    fetchBeerDetails();
    fetchReviews();

    const fetchUserData = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync('user');
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const fetchBeerDetails = () => {
    axiosInstance.get(`/beers/${id}`)
      .then((res) => {
        const beerData = res.data;
        setBeer(beerData);
        setRating(beerData.avg_rating || 0);
      })
      .catch(() => {
        setError('Error fetching beer details.');
      });
  };

  const fetchReviews = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const reviewsResponse = await axiosInstance.get('/reviews');
      if (reviewsResponse.data && reviewsResponse.data.reviews) {
        const filteredReviews = reviewsResponse.data.reviews.filter(
          (review) => review.beer_id === parseInt(id)
        );

        // Añade el handle del usuario a cada review
        const reviewsWithHandle = await Promise.all(
          filteredReviews.map(async (review) => {
            try {
              const userResponse = await axiosInstance.get(`/users/${review.user_id}`);
              const userHandle = userResponse.data.handle || 'Unknown';
              return { ...review, user_handle: userHandle };
            } catch (error) {
              console.error(`Error fetching user handle for user_id ${review.user_id}:`, error);
              return { ...review, user_handle: 'Unknown' };
            }
          })
        );

        dispatch({ type: 'SUCCESS', payload: reviewsWithHandle });
      } else {
        dispatch({ type: 'ERROR', payload: 'No reviews found.' });
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      dispatch({ type: 'ERROR', payload: 'Error fetching reviews.' });
    }
  };

  const renderReview = ({ item }) => (
    <View style={styles.reviewCard}>
      <Text style={styles.reviewText}>Rating: {item.rating}</Text>
      <Text style={styles.reviewText}>Comment: {item.text}</Text>
      <Text style={styles.reviewText}>Posted by: {item.user_handle || 'Unknown'}</Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.card}>
      <Text style={styles.title}>{beer.name}</Text>
      <Text style={styles.brewery}>
        Brewery: {beer.breweries && beer.breweries.length > 0 ? beer.breweries[0].name : 'Unknown'}
      </Text>
      <Text style={styles.details}>Style: {beer.style || 'Unknown'}</Text>
      <Text style={styles.details}>Hop: {beer.hop || 'Unknown'}</Text>
      <Text style={styles.details}>Yeast: {beer.yeast || 'Unknown'}</Text>
      <Text style={styles.details}>Malts: {beer.malts || 'Unknown'}</Text>
      <Text style={styles.details}>IBU: {beer.ibu || 'Unknown'}</Text>
      <Text style={styles.details}>Alcohol: {beer.alcohol || 'Unknown'}</Text>
      <Text style={styles.details}>Blg: {beer.blg || 'Unknown'}</Text>
      <Text style={styles.details}>Rating: {beer.avg_rating || 'No rating yet'}</Text>
    </View>
  );

  if (!beer) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f5c000" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <FlatList
        data={state.reviews}
        renderItem={renderReview}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.container}
        ListEmptyComponent={<Text style={styles.noReviews}>No reviews yet.</Text>}
      />
      <Footer /> {/* Footer fijo */}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: '#1E1E1E' },
  container: { padding: 20 },
  card: { backgroundColor: '#f5c000', padding: 20, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  brewery: { fontSize: 16, marginBottom: 5 },
  details: { fontSize: 14, marginBottom: 5 },
  reviewCard: { padding: 10, backgroundColor: '#fff', borderRadius: 5, marginBottom: 10 },
  reviewText: { fontSize: 14, marginBottom: 5 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E1E1E' },
  loadingText: { marginTop: 10, color: '#f5c000' },
  noReviews: { color: '#f5c000', textAlign: 'center', marginTop: 20 },
});

export default BeerDetails;

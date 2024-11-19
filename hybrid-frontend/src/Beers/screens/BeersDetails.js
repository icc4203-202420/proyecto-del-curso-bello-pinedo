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
      return { ...state, loading: false, success: 'Review submitted successfully!', error: '' };
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
  const [successMessage, setSuccessMessage] = useState('');
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

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmit = () => {
    const wordCount = comment.trim().split(/\s+/).length;
  
    if (wordCount < 15) {
      setError('The comment must be at least 15 words.');
      return;
    }

    if (!rating || rating < 1 || rating > 5) {
      setError('The rating must be between 1 and 5.');
      return;
    }
  
    setError('');
    dispatch({ type: 'LOADING' });
  
    if (currentUser) {
      axiosInstance
        .post(`/users/${currentUser.id}/reviews`, {
          beer_id: id,
          rating: rating,
          text: comment,
        })
        .then(() => {
          dispatch({
            type: 'SUBMIT_SUCCESS',
            payload: { rating, text: comment, user_id: currentUser.id },
          });
  
          // Reset values
          setComment('');
          setSuccessMessage('Your review was submitted successfully!');
          setTimeout(() => setSuccessMessage(''), 3000);
  
          // Show success message temporarily
          setError('');
          dispatch({ type: 'SUCCESS', success: 'Review submitted successfully!' });
        })
        .catch(() => {
          dispatch({
            type: 'ERROR',
            payload: 'Error submitting the review. Please try again.',
          });
        })
        .finally(() => {
          fetchReviews();
        }
      );
    } else {
      setError('User not found. Please log in.');
    }
  };

  const renderReview = ({ item }) => (
    <View style={styles.reviewCard}>
      <Text style={styles.reviewText}>Rating: {item.rating}</Text>
      <Text style={styles.reviewText}>Comment: {item.text}</Text>
      <Text style={styles.reviewText}>Posted by: {item.user_handle || 'Unknown'}</Text>
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
        ListHeaderComponent={
          <>
            <View style={styles.card}>
              <Text style={styles.title}>{beer.name}</Text>
              <Text style={styles.brewery}>
                Brewery: {beer.brand && beer.brand.brewery ? beer.brand.brewery.name : 'Unknown'}
              </Text>
              <Text style={styles.details}>Style: {beer.style || 'Unknown'}</Text>
              <Text style={styles.details}>Type: {beer.type || 'Unknown'}</Text>
              <Text style={styles.details}>Hop: {beer.hop || 'Unknown'}</Text>
              <Text style={styles.details}>Yeast: {beer.yeast || 'Unknown'}</Text>
              <Text style={styles.details}>Malts: {beer.malts || 'Unknown'}</Text>
              <Text style={styles.details}>IBU: {beer.ibu || 'Unknown'}</Text>
              <Text style={styles.details}>Alcohol: {beer.alcohol || 'Unknown'}</Text>
              <Text style={styles.details}>Blg: {beer.blg || 'Unknown'}</Text>
              <Text style={styles.details}>Rating: {beer.avg_rating?.toFixed(1) || 'No rating yet'}</Text>
              <Text style={styles.details}>
                Countries: {beer.brand && beer.brand.brewery && beer.brand.brewery.countries ? beer.brand.brewery.countries.map(country => country.name).join(', ') : 'Unknown'}
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.subtitle}>Rate this beer:</Text>
              <Rating
                showRating
                startingValue={rating}
                onFinishRating={handleRatingChange}
                style={styles.rating}
                ratingCount={5}
              />
              <TextInput
                style={styles.input}
                placeholder="Add a comment"
                value={comment}
                onChangeText={handleCommentChange}
              />
              {error ? <Text style={styles.error}>{error}</Text> : null}
              {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
              <Button title="Submit Review" color="#1E1E1E" onPress={handleSubmit} />
            </View>
          </>
        }
        contentContainerStyle={styles.container}
        ListEmptyComponent={<Text style={styles.noReviews}>No reviews yet.</Text>}
      />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: '#1E1E1E' },
  container: { padding: 20 },
  card: { backgroundColor: '#f5c000', padding: 20, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  details: { fontSize: 14, marginBottom: 5 },
  brewery: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 10, borderColor: '#ccc', borderWidth: 1, color: '#000', fontSize: 16 },
  rating: { marginVertical: 20, alignSelf: 'center', backgroundColor: '#1E1E1E', borderRadius: 10, padding: 10, width: '90%' },
  reviewCard: { padding: 10, backgroundColor: '#fff', borderRadius: 5, marginBottom: 10 },
  reviewText: { fontSize: 14, marginBottom: 5 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E1E1E' },
  loadingText: { marginTop: 10, color: '#f5c000' },
  noReviews: { color: '#f5c000', textAlign: 'center', marginTop: 20 },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  success: { color: 'green', textAlign: 'center', marginBottom: 10, fontWeight: 'bold' },
});

export default BeerDetails;
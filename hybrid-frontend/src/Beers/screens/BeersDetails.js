import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, ScrollView, TextInput, Button, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings'; 
import axiosInstance from '../../PageElements/axiosInstance'; 

// Reducer para manejar el estado de las evaluaciones
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
  const { id } = useRoute().params;
  const navigation = useNavigation();

  // Estado manejado con useReducer para las reviews
  const [state, dispatch] = useReducer(reviewsReducer, {
    reviews: [],
    loading: false,
    error: '',
    success: ''
  });

  useEffect(() => {
    fetchBeerDetails();
    fetchReviews();
  }, [id]);

  // Fetch beer details
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

  // Fetch reviews for the specific beer
  const fetchReviews = () => {
    dispatch({ type: 'LOADING' });
    axiosInstance.get('/reviews')
      .then((res) => {
        if (res.data && res.data.reviews) {
          // Filtramos las reviews que pertenecen a la cerveza actual usando `beer_id`
          const filteredReviews = res.data.reviews.filter(review => review.beer_id === parseInt(id));
          dispatch({ type: 'SUCCESS', payload: filteredReviews });
        } else {
          dispatch({ type: 'ERROR', payload: 'No reviews found.' });
        }
      })
      .catch(() => {
        dispatch({ type: 'ERROR', payload: 'Error fetching reviews.' });
      });
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

    const currentUser = { id: 1 };

    axiosInstance.post(`/users/${currentUser.id}/reviews`, {
      beer_id: id,
      rating: rating,
      text: comment
    })
      .then(() => {
        dispatch({ type: 'SUBMIT_SUCCESS', payload: { rating, text: comment, user_id: currentUser.id } });
        setRating(0);
        setComment('');
      })
      .catch(() => {
        dispatch({ type: 'ERROR', payload: 'Error submitting the review. Please try again.' });
      });
  };

  if (!beer) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f5c000" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{beer.name}</Text>
        <Text style={styles.brewery}>Brewery: {beer.breweries && beer.breweries.length > 0 ? beer.breweries[0].name : 'Unknown'}</Text>
        <Text style={styles.details}>Style: {beer.style || 'Unknown'}</Text>
        <Text style={styles.details}>Hop: {beer.hop || 'Unknown'}</Text>
        <Text style={styles.details}>Yeast: {beer.yeast || 'Unknown'}</Text>
        <Text style={styles.details}>Malts: {beer.malts || 'Unknown'}</Text>
        <Text style={styles.details}>Ibu: {beer.ibu || 'Unknown'}</Text>
        <Text style={styles.details}>Alcohol: {beer.alcohol || 'Unknown'}</Text>
        <Text style={styles.details}>Blg: {beer.blg || 'Unknown'}</Text>
        <Text style={styles.details}>Rating: {beer.avg_rating || 'No rating yet'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Rate this beer:</Text>
        <Rating
          showRating
          startingValue={rating}
          onFinishRating={handleRatingChange}
          style={styles.rating}
          ratingCount={5}
          imageSize={50}
        />

        <TextInput
          style={styles.input}
          placeholder="Add a comment"
          value={comment}
          onChangeText={handleCommentChange}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {state.success ? <Text style={styles.success}>{state.success}</Text> : null}

        <Button title="Submit Review" color="#1E1E1E" onPress={handleSubmit} />
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Reviews</Text>
        {state.loading ? (
          <ActivityIndicator size="large" color="#f5c000" />
        ) : state.reviews.length > 0 ? (
          <FlatList
            data={state.reviews}
            renderItem={({ item }) => (
              <View style={styles.reviewCard}>
                <Text style={styles.reviewText}>Rating: {item.rating}</Text>
                <Text style={styles.reviewText}>Comment: {item.text}</Text>
                <Text style={styles.reviewText}>Posted by: {item.user_id || 'Unknown'}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={5}
          />
        ) : (
          <Text>No reviews yet.</Text>
        )}
      </View>

      <Button
        title="Where to Find It"
        color="#f5c000"
        onPress={() => navigation.navigate('BeerBars', { beerId: beer.id })}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1E1E1E' },
  card: { backgroundColor: '#f5c000', padding: 20, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  brewery: { fontSize: 16, marginBottom: 5 },
  details: { fontSize: 14, marginBottom: 5 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  rating: { backgroundColor: '#f5c000', padding: 5, borderRadius: 10 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 10, borderColor: '#ccc', borderWidth: 1, marginTop: 10 },
  error: { color: 'red', marginBottom: 10 },
  success: { color: 'green', marginBottom: 10 },
  reviewCard: { backgroundColor: '#1E1E1E', padding: 10, borderRadius: 5, marginBottom: 10 },
  reviewText: { fontSize: 14, color: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 18, color: '#000' },
});

export default BeerDetails;

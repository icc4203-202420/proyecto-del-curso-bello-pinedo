import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings'; // Usar react-native-ratings para el sistema de rating

function BeerDetails() {
  const [beer, setBeer] = useState(null);  // Estado para manejar la cerveza
  const [rating, setRating] = useState(0);  // Estado para manejar el rating
  const [comment, setComment] = useState('');  // Estado para manejar el comentario
  const [error, setError] = useState('');  // Estado para manejar mensajes de error
  const [success, setSuccess] = useState('');  // Estado para manejar el mensaje de éxito
  const [reviews, setReviews] = useState([]);  // Estado para manejar las reseñas de otros usuarios
  const { id } = useRoute().params;  // Obtener id desde los parámetros de la ruta
  const storedUser = localStorage.getItem('currentUser');
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const navigation = useNavigation();

  // Fetch beer details
  useEffect(() => {
    axiosInstance.get(`/beers/${id}`)
      .then((res) => {
        setBeer(res.data);
        setRating(res.data.avg_rating || 0);
        setReviews(res.data.reviews || []);
      })
      .catch(() => {
        setError('Error fetching beer details.');
      });
  }, [id]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmit = () => {
    if (!currentUser) {
      setError('You must be logged in to submit a review.');
      return;
    }
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

    axiosInstance.post(`/users/${currentUser.id}/reviews`, {
      beer_id: id,
      rating: rating,
      text: comment
    })
      .then(() => {
        setSuccess('Review submitted successfully!');
        setRating(0);
        setComment('');
      })
      .catch(() => {
        setError('Error submitting the review. Please try again.');
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
        <Text style={styles.details}>Rating: {beer.avg_rating || 'Unknown'}</Text>
      </View>

      {/* Rating */}
      <View style={styles.card}>
        <Text style={styles.subtitle}>Rate this beer:</Text>

        <Rating
          showRating
          startingValue={rating}
          onFinishRating={handleRatingChange}
          style={styles.rating}
        />

        <TextInput
          style={styles.input}
          placeholder="Add a comment"
          value={comment}
          onChangeText={handleCommentChange}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {success ? <Text style={styles.success}>{success}</Text> : null}

        <Button title="Submit Review" onPress={handleSubmit} />
      </View>

      {/* Reviews */}
      <View style={styles.card}>
        <Text style={styles.subtitle}>Reviews</Text>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <Text style={styles.reviewText}>Rating: {review.rating}</Text>
              <Text style={styles.reviewText}>Comment: {review.text}</Text>
              <Text style={styles.reviewText}>Posted by: {review.user_id || 'Unknown'}</Text>
            </View>
          ))
        ) : (
          <Text>No reviews yet.</Text>
        )}
      </View>

      {/* Botón para ver los bares */}
      <Button
        title="Where to Find It"
        onPress={() => navigation.navigate('BeerBars', { beerId: beer.id })}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  card: { backgroundColor: '#f5c000', padding: 20, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  brewery: { fontSize: 16, marginBottom: 5 },
  details: { fontSize: 14, marginBottom: 5 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  rating: { paddingVertical: 10 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 10, borderColor: '#ccc', borderWidth: 1 },
  error: { color: 'red', marginBottom: 10 },
  success: { color: 'green', marginBottom: 10 },
  reviewCard: { backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 10 },
  reviewText: { fontSize: 14, color: '#000' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 18, color: '#000' },
});

export default BeerDetails;

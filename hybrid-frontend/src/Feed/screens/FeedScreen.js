import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FeedContext } from '../../contexts/FeedContext';
import Footer from '../../PageElements/Footer';
import { useNavigation } from '@react-navigation/native';

function FeedScreen() {
  const { reviews } = useContext(FeedContext);
  const navigation = useNavigation(); // Hook para la navegación

  const renderReviewItem = ({ item }) => (
    <TouchableOpacity
      style={styles.reviewCard}
      onPress={() => navigation.navigate('BarsScreen', { barId: item.barId })}
    >
      <Text style={styles.reviewHeader}>
        {item.userName} hizo el siguiente comentario en la cerveza {item.beerName}:
      </Text>
      <Text style={styles.reviewText}>"{item.text}"</Text>
      <Text style={styles.reviewRating}>Nota: {item.rating}</Text>
      <Text style={styles.reviewDate}>{new Date(item.created_at).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={reviews}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.noReviews}>No hay comentarios aún.</Text>}
        />
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 10,
    backgroundColor: '#1E1E1E',
  },
  reviewCard: {
    backgroundColor: '#f5c000',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  reviewHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  reviewText: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
    fontStyle: 'italic',
  },
  reviewRating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: '#555',
    marginTop: 10,
    textAlign: 'right',
  },
  noReviews: {
    textAlign: 'center',
    marginTop: 20,
    color: '#f5c000',
  },
});

export default FeedScreen;

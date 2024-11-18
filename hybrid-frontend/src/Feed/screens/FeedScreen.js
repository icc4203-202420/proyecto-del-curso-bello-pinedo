import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FeedContext } from '../../contexts/FeedContext';
import Footer from '../../PageElements/Footer';
import { useNavigation } from '@react-navigation/native';
import { createConsumer } from "@rails/actioncable";
import config from '../../config/config'; // Ensure this file exports the correct WS_BASE_URL
import Icon from 'react-native-vector-icons/FontAwesome';


function FeedScreen() {
  const { reviews, setReviews } = useContext(FeedContext);
  const navigation = useNavigation();

  useEffect(() => {
    const consumer = createConsumer(config.WS_BASE_URL);

    const subscription = consumer.subscriptions.create("FeedChannel", {
      received(data) {
        console.log("New live feed update:", data);
        setReviews((prevReviews) => [data, ...prevReviews]);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setReviews]);

  const renderReviewItem = ({ item }) => (
    <TouchableOpacity
      style={styles.reviewCard}
      onPress={() => navigation.navigate('BeerDetails', { id: item.beer_id })}
    >
      <View style={styles.reviewTitleContainer}>
        <Icon name="beer" size={18} color="#000" />
        <Text style={styles.reviewTitleHeader}>Beer Review</Text>
      </View>
      <Text style={styles.reviewHeader}>
        <Text style={styles.boldText}>{item.userName || 'Unknown'}</Text> commented on <Text style={styles.boldText}>{item.beerName || 'Unknown beer'}</Text>:
      </Text>
      <Text style={styles.reviewText}>"{item.text}"</Text>
      <Text style={styles.reviewRating}>Score: {item.rating} / 5.0</Text>
      <Text style={styles.reviewDate}>{new Date(item.created_at).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  const renderEventItem = ({ item }) => (
    <TouchableOpacity
      style={styles.reviewCard}
      onPress={() => navigation.navigate('EventDetails', { id: item.id, barId: item.bar_id })}
    >
      <View style={styles.reviewTitleContainer}>
        <Icon name="calendar" size={18} color="#000" />
        <Text style={styles.reviewTitleHeader}>Event Upload</Text>
      </View>
      <Text style={styles.reviewHeader}>
        <Text style={styles.boldText}>{item.userName || 'Unknown'}</Text> uploaded on <Text style={styles.boldText}>{item.name || 'Unknown event'}</Text>:
      </Text>
      <Text style={styles.reviewText}>{item.description}</Text>
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
          ListEmptyComponent={<Text style={styles.noReviews}>No Comments yet.</Text>}
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
  reviewTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewCard: {
    backgroundColor: '#f5c000',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  reviewTitleHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  reviewHeader: { fontSize: 16 },
  boldText: { fontWeight: 'bold' },
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
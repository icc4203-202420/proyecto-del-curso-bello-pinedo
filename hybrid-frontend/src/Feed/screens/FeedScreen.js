import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Button, Modal, ScrollView } from 'react-native';
import { FeedContext } from '../../contexts/FeedContext';
import Footer from '../../PageElements/Footer';
import { useNavigation } from '@react-navigation/native';

function FeedScreen() {
  const { reviews, setFilter, friends, bars } = useContext(FeedContext);
  const [currentFilter, setCurrentFilter] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);
  const [filterType, setFilterType] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  const renderReviewItem = ({ item }) => (
    <TouchableOpacity
      style={styles.reviewCard}
      onPress={() => navigation.navigate('BeerDetails', { id: item.beer_id })}
    >
      <Text style={styles.reviewHeader}>
        <Text style={styles.boldText}>{item.userName || 'Unknown'}</Text> commented on <Text style={styles.boldText}>{item.beerName || 'Unknown beer'}</Text>:
      </Text>
      <Text style={styles.reviewText}>"{item.text}"</Text>
      <Text style={styles.reviewRating}>Score: {item.rating} / 5</Text>
      <Text style={styles.reviewDate}>{new Date(item.created_at).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  const openFilterModal = (type) => {
    setFilterType(type);
    setIsModalVisible(true);

    switch (type) {
      case 'friend':
        setFilterOptions(friends.map((friend) => ({ label: friend.user_handle, value: friend.friend_id })));
        break;
      case 'bar':
        setFilterOptions(bars.map((bar) => ({ label: bar.name, value: bar.name })));
        break;
      case 'beer':
        setFilterOptions(beers.map((beer) => ({ label: beer.name, value: beer.name })));
        break;
      case 'country':
        setFilterOptions(bars.map((beer) => ({ label: bar.name, value: bar.name })));
        break;
      default:
        setFilterOptions([]);
        break;
    }
  };

  const applyFilter = (selectedOption) => {
    if (!selectedOption) return;
    setCurrentFilter({ type: filterType, value: selectedOption.value });
    setFilter({ type: filterType, value: selectedOption.value });
    setIsModalVisible(false);
  };

  const clearFilter = () => {
    setCurrentFilter(null);
    setFilter(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <Text style={styles.filterHeader}>Filter by:</Text>
          <View style={styles.filterButtons}>
            <Button title="Friends" color={"#f5c000"} onPress={() => openFilterModal('friend')} />
            <Button title="Bars" color={"#f5c000"} onPress={() => openFilterModal('bar')} />
            <Button title="Beers" color={"#f5c000"} onPress={() => openFilterModal('beer')} />
            <Button title="Country" color={"#f5c000"} onPress={() => openFilterModal('country')} />
          </View>
          {currentFilter && (
            <Button title="Remove Filter" onPress={clearFilter} color="red" />
          )}
        </View>
        {reviews.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#f5c000" />
            <Text style={styles.loadingText}>Loading Comments...</Text>
          </View>
        ) : (
          <FlatList
            data={reviews}
            renderItem={renderReviewItem}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<Text style={styles.noReviews}>No Comments yet.</Text>}
          />
        )}
      </View>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select an option</Text>
            {filterOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOption}
                onPress={() => applyFilter(option)}
              >
                <Text style={styles.modalOptionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
            <Button title="Cancel" onPress={() => setIsModalVisible(false)} color="red" />
          </ScrollView>
        </View>
      </Modal>
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
  filterContainer: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  filterHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f5c000',
    marginBottom: 10,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  reviewCard: {
    backgroundColor: '#f5c000',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#f5c000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOptionText: {
    fontSize: 16,
  },
});

export default FeedScreen;

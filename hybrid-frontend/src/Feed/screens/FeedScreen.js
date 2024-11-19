import React, { useContext, useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, Modal, ScrollView, Image} from 'react-native';
import { FeedContext } from '../../contexts/FeedContext';
import { useNavigation } from '@react-navigation/native';
import { createConsumer } from '@rails/actioncable';
import config from '../../config/config';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../../PageElements/Footer';
import axiosInstance from '../../PageElements/axiosInstance';
import { Picker } from '@react-native-picker/picker';

function FeedScreen() {
  const { feedData, setFeedData, friends = {}, bars, beers } = useContext(FeedContext);
  const navigation = useNavigation();
  const [currentUserId, setCurrentUserId] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedBar, setSelectedBar] = useState(null);
  const [selectedBeer, setSelectedBeer] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (friends && Array.isArray(friends.friendships)) {
        const friendIds = friends.friendships.map((friendship) => friendship.friend_id);
  
        try {
          const reviewsPromises = friendIds.map((id) => axiosInstance.get(`/reviews/by_user/${id}`));
          const picturesPromises = friendIds.map((id) => axiosInstance.get(`/event_pictures/by_user/${id}`));
  
          const reviewsResponses = await Promise.all(reviewsPromises);
          const picturesResponses = await Promise.all(picturesPromises);
  
          const reviews = reviewsResponses.flatMap(response => response.data.reviews);
          const pictures = picturesResponses.flatMap(response => response.data.images);
  
          setFeedData([...reviews, ...pictures]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
  
    fetchData();
  }, [friends]);

  useEffect(() => {
    const consumer = createConsumer(config.WS_BASE_URL);

    const subscription = consumer.subscriptions.create("FeedChannel", {
      received(data) {
        console.log("New live feed update:", data);
        console.log('Friends:', friends);

        setFeedData((prevReviews) => {
          if (friends && Array.isArray(friends.friendships)) {
            const friendIds = friends.friendships.map((friendship) => friendship.friend_id);
            console.log('Friend IDs:', friendIds);
            if (friendIds.includes(data.user_id)) {
              console.log('Data added to feed:', data);
              return [data, ...prevReviews];
            }
          }
          return prevReviews;
        });
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setFeedData, friends]);

  const filteredFeedData = useMemo(() => {
    return feedData.filter((item) => {
      if (selectedFriend && item.user_id !== selectedFriend) return false;
      if (selectedBar && item.type === 'event' && item.bar_id !== selectedBar) return false;
      if (selectedBeer && item.type === 'review' && item.beer_id !== selectedBeer) return false;
      return true;
    });
  }, [feedData, selectedFriend, selectedBar, selectedBeer]);

  const renderItem = ({ item }) => {
    if (item.type === 'event') {
      return (
        <TouchableOpacity
          style={styles.reviewCard}
          onPress={() => navigation.navigate('EventsDetails', { id: item.event_id, barId: item.bar_id })}
        >
        <View style={styles.reviewTitleContainer}>
          <Icon name="calendar" size={18} color="#000" />
          <Text style={styles.reviewTitleHeader}>Event Upload</Text>
        </View>
        <Text style={styles.reviewHeader}>
          <Text style={styles.boldText}>{item.userName || 'Unknown'}</Text> uploaded on <Text style={styles.boldText}>{item.name || 'Unknown event'}</Text>:
        </Text>
        <Image source={{ uri: item.url }} style={styles.image} />
        <Text style={styles.reviewDate}>{new Date(item.created_at).toLocaleString()}</Text>
        </TouchableOpacity>
      );
    } else if (item.type === 'review') {
      return (
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
    }
  };

  const openFilterModal = (type) => {
    setFilterType(type);
    setIsModalVisible(true);

    switch (type) {
      case 'friend':
        if (friends.friendships) {
          setFilterOptions([
            { label: "Select User", value: null },
            ...friends.friendships.map((friend) => ({ label: friend.friend_handle, value: friend.friend_id }))
          ]);
        }
        break;
      case 'bar':
        setFilterOptions([
          { label: "Select Bar", value: null },
          ...bars.map((bar) => ({ label: bar.name, value: bar.id }))
        ]);
        break;
      case 'beer':
        setFilterOptions([
          { label: "Select Beer", value: null },
          ...beers.map((beer) => ({ label: beer.name, value: beer.id }))
        ]);
        break;
      default:
        setFilterOptions([]);
        break;
    }
  };

  const applyFilter = (value) => {
    switch (filterType) {
      case 'friend':
        setSelectedFriend(value);
        break;
      case 'bar':
        setSelectedBar(value);
        break;
      case 'beer':
        setSelectedBeer(value);
        break;
      default:
        break;
    }
    setIsModalVisible(false);
  };

  const removeFilters = () => {
    setSelectedFriend(null);
    setSelectedBar(null);
    setSelectedBeer(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container2}>
        <View style={styles.filterButtonsContainer}>
        <ScrollView horizontal contentContainerStyle={styles.filterButtonsContainer}>
          <View style={styles.buttonWrapper}>
            <Button title="Filter by Friend" color={"#f5c000"} onPress={() => openFilterModal('friend')} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="Filter by Bar" color={"#f5c000"} onPress={() => openFilterModal('bar')} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="Filter by Beer" color={"#f5c000"} onPress={() => openFilterModal('beer')} />
          </View>
        </ScrollView>
        </View>
        {(selectedFriend || selectedBar || selectedBeer) && (
            <View style={styles.buttonWrapper}>
              <Button title="Remove Filters" color={"#f05d6c"} onPress={removeFilters} />
            </View>
          )}
        <FlatList
          data={filteredFeedData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.noReviews}>No Comments yet.</Text>}
        />
      </View>
      <Footer />
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={filterType === 'friend' ? selectedFriend : filterType === 'bar' ? selectedBar : selectedBeer}
              onValueChange={(itemValue) => applyFilter(itemValue)}
            >
              {filterOptions.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
            <Button title="Close" color={"#1E1E1E"}  onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
  container2: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  buttonWrapper: {
    marginHorizontal: 10,
  },
  reviewTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
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
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#f5c000',
    padding: 20,
    borderRadius: 10,
  },
});

export default FeedScreen;
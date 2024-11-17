import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '../PageElements/axiosInstance';
import * as SecureStore from 'expo-secure-store';
import useWebSocket from 'react-use-websocket';
import config from '../config/config';

export const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [friends, setFriends] = useState([]);
  const [bars, setBars] = useState([]);
  const [filter, setFilter] = useState(null);

  const { lastMessage, sendMessage } = useWebSocket(config.WS_BASE_URL, {
    onOpen: () => console.log('Connected to WebSocket'),
    onClose: () => console.log('Disconnected from WebSocket'),
    shouldReconnect: () => true,
  });

  useEffect(() => {
    const loadFeedData = async () => {
      try {
        // Obtener el usuario actual desde SecureStore
        const storedUser = await SecureStore.getItemAsync('user');
        if (!storedUser) {
          console.error('No user data found in storage.');
          return;
        }
        const user = JSON.parse(storedUser);
        setCurrentUserId(user.id);

        // Obtener amistades
        console.log(`Fetching friendships for user ${user.id}...`);
        const friendshipsResponse = await axiosInstance.get('/friendships', {
          params: { user_id: user.id },
        });

        const friendships = friendshipsResponse.data.friendships;
        setFriends(friendships); // Guarda toda la información de amigos
        const friendIds = friendships.map((friendship) => friendship.friend_id);

        // Obtener y filtrar reseñas
        console.log('Fetching all reviews...');
        const reviewsResponse = await axiosInstance.get('/reviews');
        const allReviews = reviewsResponse.data.reviews;

        const filteredReviews = await Promise.all(
          allReviews
            .filter((review) => friendIds.includes(review.user_id))
            .map(async (review) => {
              const userName = await fetchUserName(review.user_id);
              const beerName = await fetchBeerName(review.beer_id);
              return { ...review, userName, beerName };
            })
        );

        console.log('Filtered reviews:', filteredReviews);
        setReviews(filteredReviews);

        // Obtener bares
        console.log('Fetching all bars...');
        const barsResponse = await axiosInstance.get('/bars');
        setBars(barsResponse.data.bars);
      } catch (error) {
        console.error('Error loading feed data:', error);
      }
    };

    loadFeedData();
  }, []);

  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const data = JSON.parse(lastMessage.data);

        if (data.type === 'ping') return;

        if (data.message && data.message.review) {
          const newReview = data.message.review;

          fetchUserName(newReview.user_id).then((userName) => {
            fetchBeerName(newReview.beer_id).then((beerName) => {
              const updatedReview = { ...newReview, userName, beerName };

              setReviews((prevReviews) => [updatedReview, ...prevReviews]);
            });
          });
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    }
  }, [lastMessage]);

  const fetchUserName = async (userId) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}`);
      const { first_name, last_name } = response.data;
      return `${first_name} ${last_name}`;
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
      return 'Usuario desconocido';
    }
  };

  const fetchBeerName = async (beerId) => {
    try {
      const response = await axiosInstance.get(`/beers/${beerId}`);
      return response.data.name || 'Cerveza desconocida';
    } catch (error) {
      console.error(`Error fetching beer ${beerId}:`, error);
      return 'Cerveza desconocida';
    }
  };

  const filteredReviews = reviews.filter((review) => {
    if (!filter) return true; // Sin filtro, muestra todo
    switch (filter.type) {
      case 'friend':
        return review.user_id === filter.value; // Filtra por ID de amigo
      case 'bar':
        return review.bar_name === filter.value;
      case 'country':
        return review.country === filter.value;
      case 'beer':
        return review.beer_name === filter.value;
      default:
        return true;
    }
  });

  return (
    <FeedContext.Provider
      value={{
        reviews: filteredReviews,
        friends,
        bars,
        setFilter,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

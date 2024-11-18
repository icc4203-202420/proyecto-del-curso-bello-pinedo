import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '../PageElements/axiosInstance';
import * as SecureStore from 'expo-secure-store';
import { createConsumer } from '@rails/actioncable';
import config from '../config/config';

export const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [friends, setFriends] = useState([]);
  const [bars, setBars] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    const loadFeedData = async () => {
      try {
        // Get the current user from SecureStore
        const storedUser = await SecureStore.getItemAsync('user');
        if (!storedUser) {
          console.error('No user data found in storage.');
          return;
        }
        const user = JSON.parse(storedUser);
        setCurrentUserId(user.id);

        // Fetch friendships
        console.log(`Fetching friendships for user ${user.id}...`);
        const friendshipsResponse = await axiosInstance.get('/friendships', {
          params: { user_id: user.id },
        });

        const friendships = friendshipsResponse.data.friendships;
        setFriends(friendships); // Save all friend information
        const friendIds = friendships.map((friendship) => friendship.friend_id);

        // Fetch and filter reviews
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

        const eventResponse = await axiosInstance.get('/event_pictures');
        const allEvents = eventResponse.data.images;

        const filteredEvents = await Promise.all(
          allEvents
            .filter((event) => friendIds.includes(event.user_id))
            .map(async (event) => {
              const userName = await fetchUserName(event.user_id);
              return { ...event, userName };
            })
        );

        console.log('Filtered events:', filteredEvents);
        setEvents(filteredEvents);

        // Fetch bars
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
    const setupSubscription = async () => {
      const consumer = createConsumer(config.WS_BASE_URL);

      const subscription = consumer.subscriptions.create('FeedChannel', {
        received(data) {
          console.log("New live feed update:", data);
          setReviews((prevReviews) => [data, ...prevReviews]);
        },
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    setupSubscription();
  }, [setReviews]);

  const fetchUserName = async (userId) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}`);
      const { first_name, last_name } = response.data;
      return `${first_name} ${last_name}`;
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
      return 'Unknown User';
    }
  };

  const fetchBeerName = async (beerId) => {
    try {
      const response = await axiosInstance.get(`/beers/${beerId}`);
      return response.data.name || 'Unknown Beer';
    } catch (error) {
      console.error(`Error fetching beer ${beerId}:`, error);
      return 'Unknown Beer';
    }
  };

  const filteredReviews = reviews.filter((review) => {
    if (!filter) return true; // No filter, show all
    switch (filter.type) {
      case 'friend':
        return review.user_id === filter.value; // Filter by friend ID
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

  const filteredEvents = events.filter((event) => {
    if (!filter) return true; // No filter, show all
    switch (filter.type) {
      case 'friend':
        return event.user_id === event.value; // Filter by friend ID
      default:
        return true;
    }
  });

  return (
    <FeedContext.Provider
      value={{
        reviews: filteredReviews,
        events: filteredEvents,
        friends,
        bars,
        setFilter,
        setReviews, // Ensure setReviews is provided in the context
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};
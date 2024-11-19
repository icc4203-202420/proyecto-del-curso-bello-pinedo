import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '../PageElements/axiosInstance';
import * as SecureStore from 'expo-secure-store';
import { createConsumer } from 'react-native-actioncable';
import config from '../config/config';

export const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  const [feedData, setFeedData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [bars, setBars] = useState([]);
  const [beers, setBeers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [subscription, setSubscription] = useState(null);

  const setupFeedData = async () => {
    const storedUser = await SecureStore.getItemAsync('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      const response = await axiosInstance.get(`/friendships`, {
        params: { user_id: user.id },
      });
      const response2 = await axiosInstance.get(`/bars`);
      const response3 = await axiosInstance.get(`/beers`);
      const response4 = await axiosInstance.get(`/countries`);

      setCountries(response4.data);
      setBeers(response3.data);
      setBars(response2.data);
      setFriends(response.data);
    }
  };

  useEffect(() => {
    setupFeedData();
  }, []);

  const addFriend = async (friendId, selectedEvent) => {
    const storedUser = await SecureStore.getItemAsync('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      await axiosInstance.post(`/friendships`, {
        user_id: user.id,
        friend_id: friendId,
        event_id: selectedEvent,
      });
      setupFeedData();
    }
  };

  const removeFriend = async (friendshipId) => {
    const storedUser = await SecureStore.getItemAsync('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      await axiosInstance.delete(`/friendships/${friendshipId}`);
      setupFeedData();
    }
  };

  const handleLogout = async () => {
    try {
      if (subscription) {
        subscription.unsubscribe();
        setSubscription(null);
      }
      setFriends([]);
      setBars([]);
      setBeers([]);
      setFeedData([]);
      setCurrentUser(null);

    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleLogindata = async () => {
    try {
      await setupFeedData();
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  }

  return (
    <FeedContext.Provider
      value={{
        feedData,
        friends,
        bars,
        beers,
        countries,
        setFeedData,
        addFriend,
        removeFriend,
        handleLogout,
        handleLogindata,
        unsubscribe: () => {
          if (subscription) {
            subscription.unsubscribe();
            setSubscription(null);
          }
        },
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};
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
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const setupFeedData = async () => {
      const storedUser = await SecureStore.getItemAsync('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        const response = await axiosInstance.get(`/friendships`, {
          params: { user_id: user.id },
        });
        setFriends(response.data);
      }
    };
  
    setupFeedData();
  }, []);

  useEffect(() => {
    const setupSubscription = async () => {
      const storedUser = await SecureStore.getItemAsync('user');
      if (storedUser) {
        const consumer = createConsumer(config.WS_BASE_URL);

        const subscription = consumer.subscriptions.create('FeedChannel', {
          received(data) {
            console.log("New live feed update:", data);
            setFeedData((prevFeedData) => {
              const friendIds = friends.map((friendship) => friendship.friend_id);
              if (friendIds.includes(data.user_id)) {
                return [data, ...prevFeedData];
              }
              return prevFeedData;
            });
          },
        });

        setSubscription(subscription);
      }
    };

    setupSubscription();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [friends]);

  return (
    <FeedContext.Provider
      value={{
        feedData,
        friends,
        setFeedData,
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
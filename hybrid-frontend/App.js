// App.js
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, SafeAreaView, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import HomeNavigation from "./src/Home/navigation/HomeNavigation";
import BeersSearch from "./src/Beers/screens/BeerSearch";
import BeerDetails from "./src/Beers/screens/BeersDetails";
import SignIn from "./src/User/screens/SignIn";
import SignUp from "./src/User/screens/SignUp";
import { FeedProvider } from "./src/contexts/FeedContext";  

const Stack = createNativeStackNavigator();

function App() {
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
    });

    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      Alert.alert('Notification Received', notification.request.content.body);
    });

    return () => {
      notificationListener.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <FeedProvider>
        <View style={styles.container}>
          {/* Header */}
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <Image source={require('./assets/beer-icon.png')} style={styles.logo} />
              <Text style={styles.headerTitle}>BeerMark</Text>
            </View>
          </SafeAreaView>

          {/* Stack Navigator */}
          <Stack.Navigator initialRouteName="Sign In">
            <Stack.Screen name="Home" component={HomeNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="BeersSearch" component={BeersSearch} options={{ title: 'Search Beers' }} />
            <Stack.Screen name="BeerDetails" component={BeerDetails} options={{ title: 'Beer Details' }} />
            <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'Sign In' }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up' }} />
          </Stack.Navigator>
        </View>
      </FeedProvider>
    </NavigationContainer>
  );
}

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    Alert.alert('Permission Denied', 'You will not receive notifications.');
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E1E' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#f5c000' },
  logo: { width: 30, height: 30 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  safeArea: { backgroundColor: '#f5c000' },
});

export default App;

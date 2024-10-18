import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axiosInstance from '../../PageElements/axiosInstance';

function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    const user = {"user": {first_name: firstname, last_name: lastname, handle: handle, email: email, password: password, password_confirmation: confirmPassword }};
    axiosInstance.post('/signup', user)
      .then((response) => {
        setLoading(false);
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('SignIn');  // Navegar a la pantalla de inicio de sesión después del registro
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert('Error', 'Could not create account');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstname}
        onChangeText={setFirstname}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastname}
        onChangeText={setLastname}
      />
      <TextInput
        style={styles.input}
        placeholder="Handle"
        value={handle}
        onChangeText={setHandle}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#f5c000" />
      ) : (
        <Button title="Sign Up" onPress={handleSignUp}  />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1E1E1E', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#f5c000' },
  input: { backgroundColor: '#f5f5f5', padding: 10, borderRadius: 8, borderColor: '#ccc', borderWidth: 1, marginBottom: 20 },
});

export default SignUp;

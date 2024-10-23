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
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = () => {
    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (firstname.trim() === '') {
      newErrors.firstname = 'First name is required.';
    }

    if (lastname.trim() === '') {
      newErrors.lastname = 'Last name is required.';
    }

    if (firstname.length < 2) {
      newErrors.handle = 'First Name must be at least 6 characters long.';
    }

    if (lastname.length < 2) {
      newErrors.handle = 'Last Name must be at least 6 characters long.';
    }

    if (handle.length < 6) {
      newErrors.handle = 'Handle must be at least 6 characters long.';
    }

    if (handle.trim() === '') {
      newErrors.lastname = 'Handle is required.';
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const user = { "user": { first_name: firstname, last_name: lastname, handle: handle, email: email, password: password, password_confirmation: confirmPassword } };
    axiosInstance.post('/signup', user)
      .then((response) => {
        setLoading(false);
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('SignIn');  // Navigate to sign-in after registration
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
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstname}
        onChangeText={setFirstname}
      />
      {errors.firstname && <Text style={styles.error}>{errors.firstname}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastname}
        onChangeText={setLastname}
      />
      {errors.lastname && <Text style={styles.error}>{errors.lastname}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Handle"
        value={handle}
        onChangeText={setHandle}
      />
      {errors.handle && <Text style={styles.error}>{errors.handle}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#f5c000" />
      ) : (
        <Button title="Sign Up" onPress={handleSignUp} />
      )}
      <Text style={styles.signUpText}>
        Already have an account?{' '}
        <Text style={styles.signUpLink} onPress={() => navigation.navigate('SignIn')}>
          Sign In
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1E1E1E', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#f5c000' },
  input: { backgroundColor: '#f5f5f5', padding: 10, borderRadius: 8, borderColor: '#ccc', borderWidth: 1, marginBottom: 20 },
  error: { color: 'red', marginBottom: 10 },
  signUpText: { textAlign: 'center', marginTop: 20, color: '#f5c000' },
  signUpLink: { color: '#f5c000', fontWeight: 'bold' },
});

export default SignUp;

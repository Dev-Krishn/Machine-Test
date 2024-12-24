import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ThemeContext } from '../themes/ThemeContext';

type RootStackParamList = {
  Login: undefined;
  Recipes: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { theme, themeStyles, toggleTheme } = useContext(ThemeContext); // Access theme

  const handleLogin = async () => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'emilys',
          password: 'emilyspass',
          expiresInMins: 30, // optional
        }),
        credentials: 'include',
      });
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert('Login Successful', `Welcome, ${data.username}!`);
        navigation.navigate('MainTabs'); // Navigate to the Tab Navigator
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };
  

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeStyles[theme].backgroundColor },
      ]}
    >
      <Text style={[styles.title, { color: themeStyles[theme].textColor }]}>Login</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: themeStyles[theme].inputBackgroundColor || themeStyles[theme].backgroundColor,
            color: themeStyles[theme].textColor,
            borderColor: themeStyles[theme].textColor,
          },
        ]}
        placeholder="Username"
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: themeStyles[theme].inputBackgroundColor || themeStyles[theme].backgroundColor,
            color: themeStyles[theme].textColor,
            borderColor: themeStyles[theme].textColor,
          },
        ]}
        placeholder="Password"
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: themeStyles[theme].buttonColor || '#6200ea' }]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
        <Text style={[styles.themeButtonText, { color: themeStyles[theme].accentColor }]}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  themeButton: {
    marginTop: 20,
  },
  themeButtonText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

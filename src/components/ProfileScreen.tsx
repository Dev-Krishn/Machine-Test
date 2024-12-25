import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {ThemeContext} from '../themes/ThemeContext';

const ProfileScreen: React.FC = ({navigation}: any) => {
  const {theme, themeStyles} = useContext(ThemeContext);

  const userData = {
    username: 'John Doe',
    profilePhoto: 'https://www.example.com/profile.jpg',
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: themeStyles[theme].backgroundColor},
      ]}>
      <Image
        source={{uri: userData.profilePhoto}}
        style={styles.profileImage}
      />
      <Text style={[styles.username, {color: themeStyles[theme].textColor}]}>
        {userData.username}
      </Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#6200ea',
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;

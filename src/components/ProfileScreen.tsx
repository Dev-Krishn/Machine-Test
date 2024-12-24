import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../themes/ThemeContext';

const ProfileScreen: React.FC = () => {
  const { theme, themeStyles } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeStyles[theme].backgroundColor },
      ]}
    >
      <Text style={{ color: themeStyles[theme].textColor, fontSize: 18 }}>
        Welcome to the Profile Screen!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;

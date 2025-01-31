// AboutScreen.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AboutScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-center items-center bg-white p-5">
      <Text className="text-xl mb-5">About This App</Text>
      <Text className="text-base text-center mb-5">
        This app allows students to log in, search for study papers (past papers), and view them.
      </Text>
      <Text className="text-base text-center mb-5">
        Use the login page to access the content. Register if you haven't created an account.
      </Text>

      <TouchableOpacity
        className="bg-blue-500 p-3 rounded-md"
        onPress={() => navigation.goBack()}>
        <Text className="text-white">Go Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AboutScreen;

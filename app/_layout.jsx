// import { StyleSheet, Text, View } from "react-native";
// import React from "react";
// import { Stack } from "expo-router";

// const RootLayout = () => {
//   return (
//     <Stack>
//       <Stack.Screen name="home" options={{headerShown:false}} />
//     </Stack>
//   );
// };

// export default RootLayout;

// const styles = StyleSheet.create({});

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AboutScreen from './screens/AboutScreen';
import SearchPapersScreen from './screens/SearchPapersScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="SearchPapers" component={SearchPapersScreen} options={{ title: 'Search Papers' }} />
        <Stack.Screen name="PDFViewer" component={PDFViewerScreen} options={{ title: 'View PDF' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

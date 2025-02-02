import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";

const AboutScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>
      <Text style={styles.description}>
        This app allows students to log in, search for study papers (past
        papers), and view them.
      </Text>
      <Text style={styles.description}>
        Use the login page to access the content. Register if you haven't
        created an account.
      </Text>

      <Link href="/HomeScreen">
        <Text style={styles.goBackText}>Go Back to Home</Text>
      </Link>
      {/* <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Text style={styles.goBackText}>Go Back to Home</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  goBackButton: {
    backgroundColor: "#3b82f6", // Blue
    padding: 10,
    borderRadius: 8,
  },
  goBackText: {
    color: "white",
    fontSize: 16,
  },
});

export default AboutScreen;

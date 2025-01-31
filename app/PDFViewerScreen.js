import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';

const PDFViewerScreen = ({ route }) => {
  const { pdfUrl } = route.params;

  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri: pdfUrl, cache: true }}
        style={styles.pdf}
        onLoadProgress={() => <ActivityIndicator size="large" color="#6200ee" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default PDFViewerScreen;

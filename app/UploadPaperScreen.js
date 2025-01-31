import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const UploadPaperScreen = () => {
  const [title, setTitle] = useState('');
  const [unitCode, setUnitCode] = useState('');
  const [year, setYear] = useState('');
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('unitCode', unitCode);
    formData.append('year', year);
    formData.append('paper', file);

    try {
      const response = await axios.post('http://your-api-url/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data.message);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Past Paper</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Unit Code"
        value={unitCode}
        onChangeText={setUnitCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Year"
        keyboardType="numeric"
        value={year}
        onChangeText={setYear}
      />
      <input type="file" onChange={handleFileUpload} />
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.uploadButtonText}>Upload Paper</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  uploadButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    width: '100%',
    borderRadius: 5,
  },
  uploadButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default UploadPaperScreen;

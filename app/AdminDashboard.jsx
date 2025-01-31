import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

// Admin Dashboard
const AdminDashboard = () => {
  const [papers, setPapers] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newUnitCode, setNewUnitCode] = useState('');
  const [newFile, setNewFile] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editPaperId, setEditPaperId] = useState('');

  // Fetch papers
  const fetchPapers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/papers', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPapers(response.data);
    } catch (error) {
      console.error('Error fetching papers:', error);
    }
  };

  // Handle add/edit paper
  const handleSubmit = async () => {
    if (isEditing) {
      // Edit paper logic
      await axios.put(`http://localhost:5000/admin/papers/${editPaperId}`, { title: newTitle, unitCode: newUnitCode, file: newFile }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    } else {
      // Add new paper logic
      await axios.post('http://localhost:5000/admin/papers', { title: newTitle, unitCode: newUnitCode, file: newFile }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    }
    fetchPapers(); // Refresh paper list
  };

  // Handle delete paper
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/admin/papers/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    fetchPapers(); // Refresh paper list
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <TextInput
        style={styles.input}
        placeholder="Paper Title"
        value={newTitle}
        onChangeText={setNewTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Unit Code"
        value={newUnitCode}
        onChangeText={setNewUnitCode}
      />
      <TextInput
        style={styles.input}
        placeholder="File URL"
        value={newFile}
        onChangeText={setNewFile}
      />

      <Button title={isEditing ? 'Update Paper' : 'Add Paper'} onPress={handleSubmit} />

      <FlatList
        data={papers}
        renderItem={({ item }) => (
          <View style={styles.paperItem}>
            <Text>{item.title} - {item.unitCode}</Text>
            <TouchableOpacity onPress={() => handleDelete(item._id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { marginBottom: 10, padding: 8, borderWidth: 1, borderColor: '#ccc' },
  paperItem: { padding: 10, marginBottom: 10, backgroundColor: '#f5f5f5' },
  deleteButton: { color: 'red', marginTop: 5 }
});

export default AdminDashboard;

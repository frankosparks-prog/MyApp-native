// import React, { useState } from 'react';
// import { 
//   View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList, Alert 
// } from 'react-native';
// import * as FileSystem from 'expo-file-system';
// import * as Sharing from 'expo-sharing';
// import { useNavigation } from '@react-navigation/native';

// const SERVER_URL = 'http://localhost:5000'; // Change this to your actual backend URL

// const SearchPapersScreen = () => {
//   const [unitCode, setUnitCode] = useState('');
//   const [papers, setPapers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();

//   const handleSearch = async () => {
//     if (!unitCode.trim()) {
//       Alert.alert('Error', 'Please enter a unit code.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(`${SERVER_URL}/papers/search?unitCode=${unitCode}`);
//       const data = await response.json();

//       if (response.ok) {
//         setPapers(data);
//       } else {
//         Alert.alert('Error', data.message || 'No past papers found.');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to fetch past papers.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = async (filePath, title) => {
//     try {
//       const fileUri = FileSystem.documentDirectory + title + '.pdf';
//       const downloadResumable = FileSystem.createDownloadResumable(
//         `${SERVER_URL}/${filePath}`,
//         fileUri
//       );

//       const { uri } = await downloadResumable.downloadAsync();

//       if (await Sharing.isAvailableAsync()) {
//         await Sharing.shareAsync(uri);
//       } else {
//         Alert.alert('Downloaded', `File saved to ${uri}`);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to download file.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Search Past Papers</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Unit Code"
//         value={unitCode}
//         onChangeText={setUnitCode}
//       />
//       <TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={loading}>
//         <Text style={styles.searchButtonText}>{loading ? 'Searching...' : 'Search'}</Text>
//       </TouchableOpacity>

//       {papers.length > 0 && (
//         <FlatList
//           data={papers}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => (
//             <View style={styles.paperItem}>
//               <Text style={styles.paperText}>{item.title} ({item.unitCode})</Text>
//               <TouchableOpacity 
//                 style={styles.downloadButton} 
//                 onPress={() => handleDownload(item.file, item.title)}
//               >
//                 <Text style={styles.downloadText}>Download</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     padding: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     padding: 12,
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     backgroundColor: '#fff',
//   },
//   searchButton: {
//     backgroundColor: '#6200ee',
//     paddingVertical: 12,
//     width: '100%',
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   searchButtonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   paperItem: {
//     backgroundColor: '#fff',
//     padding: 15,
//     marginVertical: 5,
//     width: '100%',
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   paperText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   downloadButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 8,
//     marginTop: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   downloadText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default SearchPapersScreen;


//TRIAL
// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, Text, FlatList, Modal, StyleSheet } from 'react-native';
// import Pdf from 'react-native-pdf'; // For rendering PDF
// import Modal from 'react-native-modal';

// const SearchPapersScreen = () => {
//   const [unitCode, setUnitCode] = useState('');
//   const [papers, setPapers] = useState([]); // Simulated papers list for now
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedPdf, setSelectedPdf] = useState(null);

//   const handleSearch = async () => {
//     // This is where you'll fetch papers from the API
//     console.log('Searching for papers...');
//     // Example papers
//     setPapers([
//       { id: 1, title: 'Math Paper 1', unitCode: 'MATH101', file: 'path_to_pdf_1.pdf' },
//       { id: 2, title: 'Physics Paper 1', unitCode: 'PHYS101', file: 'path_to_pdf_2.pdf' },
//     ]);
//   };

//   const handleOpenPdf = (pdfPath) => {
//     setSelectedPdf(pdfPath);
//     setIsModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalVisible(false);
//     setSelectedPdf(null);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Search Past Papers</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Unit Code"
//         value={unitCode}
//         onChangeText={setUnitCode}
//       />
//       <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
//         <Text style={styles.searchButtonText}>Search</Text>
//       </TouchableOpacity>

//       <FlatList
//         data={papers}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => handleOpenPdf(item.file)} style={styles.paperItem}>
//             <Text style={styles.paperTitle}>{item.title}</Text>
//           </TouchableOpacity>
//         )}
//         keyExtractor={(item) => item.id.toString()}
//       />

//       {/* Inline Modal for PDF */}
//       <Modal isVisible={isModalVisible} style={styles.modal}>
//         <View style={styles.modalContent}>
//           {selectedPdf && (
//             <Pdf
//               source={{uri: selectedPdf, cache: true}}
//               onLoadComplete={(numberOfPages, filePath) => {
//                 console.log(`number of pages: ${numberOfPages}`);
//               }}
//               onError={(error) => {
//                 console.log(error);
//               }}
//             />
//           )}
//           <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     padding: 20,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     padding: 10,
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//   },
//   searchButton: {
//     backgroundColor: '#6200ee',
//     paddingVertical: 10,
//     width: '100%',
//     borderRadius: 5,
//   },
//   searchButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 18,
//   },
//   paperItem: {
//     padding: 10,
//     marginBottom: 10,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 5,
//   },
//   paperTitle: {
//     fontSize: 18,
//     color: '#333',
//   },
//   modal: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     width: '90%',
//     height: '80%',
//   },
//   closeButton: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: '#6200ee',
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 18,
//   },
// });

// export default SearchPapersScreen;
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, Modal, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';
import axios from 'axios'; // Import axios for making API requests

const SearchPapersScreen = () => {
  const [unitCode, setUnitCode] = useState('');
  const [title, setTitle] = useState('');
  const [papers, setPapers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [page, setPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages

  // Fetch papers with pagination
  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/papers/search', {
        params: { unitCode, title, page, limit: 10 }, // Pass title for additional filtering
      });
      setPapers(response.data.papers);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching papers:', error);
    }
  };

  const handleOpenPdf = (pdfPath) => {
    setSelectedPdf(pdfPath);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedPdf(null);
  };

  // Pagination handler
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    handleSearch();
  }, [unitCode, title, page]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Past Papers</Text>

      {/* Unit Code Filter */}
      <TextInput
        style={styles.input}
        placeholder="Enter Unit Code"
        value={unitCode}
        onChangeText={setUnitCode}
      />

      {/* Title Filter */}
      <TextInput
        style={styles.input}
        placeholder="Enter Paper Title"
        value={title}
        onChangeText={setTitle}
      />

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      <FlatList
        data={papers}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleOpenPdf(item.file)} style={styles.paperItem}>
            <Text style={styles.paperTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Inline Modal for PDF */}
      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={styles.modalContent}>
          {selectedPdf && (
            <Pdf
              source={{ uri: selectedPdf, cache: true }}
              onLoadComplete={(numberOfPages) => {
                console.log(`number of pages: ${numberOfPages}`);
              }}
              onError={(error) => {
                console.log(error);
              }}
            />
          )}
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Pagination Controls */}
      <View style={styles.pagination}>
        <TouchableOpacity
          disabled={page === 1}
          onPress={() => handlePageChange(page - 1)}
          style={styles.paginationButton}
        >
          <Text>Previous</Text>
        </TouchableOpacity>
        <Text>{`Page ${page} of ${totalPages}`}</Text>
        <TouchableOpacity
          disabled={page === totalPages}
          onPress={() => handlePageChange(page + 1)}
          style={styles.paginationButton}
        >
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
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
  searchButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    width: '100%',
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  paperItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  paperTitle: {
    fontSize: 18,
    color: '#333',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    height: '80%',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#6200ee',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  paginationButton: {
    padding: 10,
    backgroundColor: '#6200ee',
    borderRadius: 5,
    marginHorizontal: 10,
  },
});

export default SearchPapersScreen;


// import React, { useState } from 'react';
// import { 
//   View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList, Alert 
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const SERVER_URL = 'http://localhost:5000'; // Change to your backend URL

// const SearchPapersScreen = () => {
//   const [unitCode, setUnitCode] = useState('');
//   const [papers, setPapers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();

//   const handleSearch = async () => {
//     if (!unitCode.trim()) {
//       Alert.alert('Error', 'Please enter a unit code.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(`${SERVER_URL}/papers/search?unitCode=${unitCode}`);
//       const data = await response.json();

//       if (response.ok) {
//         setPapers(data);
//       } else {
//         Alert.alert('Error', data.message || 'No past papers found.');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to fetch past papers.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Search Past Papers</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Unit Code"
//         value={unitCode}
//         onChangeText={setUnitCode}
//       />
//       <TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={loading}>
//         <Text style={styles.searchButtonText}>{loading ? 'Searching...' : 'Search'}</Text>
//       </TouchableOpacity>

//       {papers.length > 0 && (
//         <FlatList
//           data={papers}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => (
//             <View style={styles.paperItem}>
//               <Text style={styles.paperText}>{item.title} ({item.unitCode})</Text>
//               <TouchableOpacity 
//                 style={styles.viewButton} 
//                 onPress={() => navigation.navigate('PDFViewer', { pdfUrl: `${SERVER_URL}/${item.file}`, title: item.title })}
//               >
//                 <Text style={styles.viewText}>View PDF</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     padding: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     padding: 12,
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     backgroundColor: '#fff',
//   },
//   searchButton: {
//     backgroundColor: '#6200ee',
//     paddingVertical: 12,
//     width: '100%',
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   searchButtonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   paperItem: {
//     backgroundColor: '#fff',
//     padding: 15,
//     marginVertical: 5,
//     width: '100%',
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   paperText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   viewButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 8,
//     marginTop: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   viewText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default SearchPapersScreen;

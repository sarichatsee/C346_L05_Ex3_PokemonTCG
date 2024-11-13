import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './AppStyles';

const elementTypes = [
  { name: 'Colorless', color: '#CCCCCC' },
  { name: 'Darkness', color: '#4F4F4F' },
  { name: 'Dragon', color: '#D1A054' },
  { name: 'Fairy', color: '#E8A3DC' },
  { name: 'Fighting', color: '#D96A4A' },
  { name: 'Fire', color: '#F67F7D' },
  { name: 'Grass', color: '#7AC74C' },
  { name: 'Lightning', color: '#F6E652' },
  { name: 'Metal', color: '#B0B0B0' },
  { name: 'Psychic', color: '#B08BC4' },
  { name: 'Water', color: '#6390F0' },
];

const App = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState({});

  const toggleSearch = () => {
    setIsSearching(!isSearching);
    setSearchQuery('');
  };

  const handleSearch = (query) => {
    const alphabeticQuery = query.replace(/[^a-zA-Z]/g, '');
    setSearchQuery(alphabeticQuery);
  };

  const toggleFilterModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cards</Text>

      <View style={styles.controlRow}>
        <View style={styles.cardCount}>
          <FontAwesome name="book" size={18} color="#333" style={styles.bookIcon} />
          <Text style={styles.cardCountText}>280</Text>
        </View>

        {isSearching && (
          <TextInput
            style={styles.searchInput}
            placeholder="Search Pokémon"
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus={true}
          />
        )}

        <TouchableOpacity onPress={toggleSearch}>
          <FontAwesome name="search" size={24} color="#333" style={styles.searchIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleFilterModal} style={styles.filterButton}>
          <FontAwesome name="filter" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Modal without Overlay */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Filter by Element Type</Text>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {elementTypes.map((element) => (
              <View key={element.name} style={[styles.filterOption, { borderColor: element.color }]}>
                <Text style={[styles.filterLabel, { color: element.color }]}>{element.name}</Text>
                <TouchableOpacity onPress={() => handleTypeToggle(element.name)}>
                  <FontAwesome
                    name={selectedTypes[element.name] ? 'check-square' : 'square-o'}
                    size={20}
                    color={element.color}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={toggleFilterModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default App;

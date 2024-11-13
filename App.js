import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, ScrollView, FlatList, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './AppStyles';
import pokemonData from './pokemonData';

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
  const [spotlightPokemon, setSpotlightPokemon] = useState(null);

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

  const handleCardClick = (pokemon) => {
    setSpotlightPokemon(pokemon);
  };

  const closeSpotlight = () => {
    setSpotlightPokemon(null);
  };

  // Flattened and filtered Pokémon data based on selected types and search query
  const filteredPokemonData = pokemonData
    .filter((section) => !Object.keys(selectedTypes).some((type) => selectedTypes[type]) || selectedTypes[section.title])
    .reduce((acc, section) => {
      const filteredSectionData = section.data.filter((pokemon) =>
        pokemon.name && pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return acc.concat(filteredSectionData);
    }, []);

  const renderPokemon = ({ item }) => (
    <TouchableOpacity style={styles.pokemonCard} onPress={() => handleCardClick(item)}>
      <Image source={{ uri: item.imageUrl }} style={styles.pokemonImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Gray Background Header with My Cards, Filter Button, Card Counter, and Search Bar */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTopRow}>
          <Text style={styles.title}>My Cards</Text>
          <TouchableOpacity onPress={toggleFilterModal} style={styles.filterButton}>
            <FontAwesome name="filter" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerBottomRow}>
          <View style={styles.cardCount}>
            <FontAwesome name="book" size={18} color="#333" style={styles.bookIcon} />
            <Text style={styles.cardCountText}>
              {filteredPokemonData.length}
            </Text>
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
        </View>
      </View>

      {/* Pokémon Card Grid in White Background */}
      <View style={styles.cardGridContainer}>
        <FlatList
          data={filteredPokemonData}
          numColumns={3} // Grid view with 3 columns
          renderItem={renderPokemon}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.cardContainer}
        />
      </View>

      {/* Spotlight Modal */}
      <Modal visible={!!spotlightPokemon} transparent={true} animationType="slide">
        {spotlightPokemon && (
          <View style={styles.spotlightContainer}>
            <Image source={{ uri: spotlightPokemon.imageUrl }} style={styles.spotlightImage} />
            <TouchableOpacity onPress={closeSpotlight} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>

      {/* Filter Modal */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
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

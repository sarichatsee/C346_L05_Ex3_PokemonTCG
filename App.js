import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, ScrollView, FlatList, Image, Animated, Easing } from 'react-native';
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

  // Animation references
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(300)).current;
  const closeButtonOpacity = useRef(new Animated.Value(0)).current;

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
    
    // Start overlay fade-in and slide-up animation
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(closeButtonOpacity, {
        toValue: 1,
        duration: 400,
        delay: 300,
        useNativeDriver: true,
      })
    ]).start();
  };

  const closeSpotlight = () => {
    // Start close button fade-out and slide-down animation
    Animated.parallel([
      Animated.timing(closeButtonOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 300,
        duration: 500,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 300,
        delay: 200,
        useNativeDriver: true,
      })
    ]).start(() => setSpotlightPokemon(null)); // Reset spotlightPokemon after animation
  };

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
      {spotlightPokemon && (
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
          <Animated.View style={[styles.spotlightContainer, { transform: [{ translateY: slideUpAnim }] }]}>
            <Image source={{ uri: spotlightPokemon.imageUrl }} style={styles.spotlightImage} />
            <Animated.View style={{ opacity: closeButtonOpacity }}>
              <TouchableOpacity onPress={closeSpotlight} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      )}

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

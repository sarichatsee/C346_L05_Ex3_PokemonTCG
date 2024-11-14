import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, ScrollView, FlatList, SectionList, Image, Animated, Easing, PanResponder } from 'react-native';
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

  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(300)).current;
  const closeButtonOpacity = useRef(new Animated.Value(0)).current;
  const tiltX = useRef(new Animated.Value(0)).current;
  const tiltY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const { moveX, moveY } = gestureState;
        const tiltStrength = 15;
        tiltX.setValue(((moveX / 300) - 0.5) * tiltStrength);
        tiltY.setValue(((moveY / 420) - 0.5) * tiltStrength);
      },
      onPanResponderRelease: () => {
        Animated.spring(tiltX, { toValue: 0, useNativeDriver: true }).start();
        Animated.spring(tiltY, { toValue: 0, useNativeDriver: true }).start();
      },
    })
  ).current;

  const toggleSearch = () => {
    setIsSearching(!isSearching);
    setSearchQuery('');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
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

  const handleCardClick = (pokemon, element) => {
    setSpotlightPokemon({ ...pokemon, element }); // Add the element to spotlightPokemon
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
    ]).start(() => setSpotlightPokemon(null));
  };

  const filteredData = pokemonData
    .filter(section => !Object.keys(selectedTypes).some(type => selectedTypes[type]) || selectedTypes[section.title])
    .map(section => ({
      ...section,
      data: section.data.filter(pokemon =>
        pokemon.name && pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(section => section.data.length > 0);

  const renderPokemonSection = ({ section }) => (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionHeaderText, { backgroundColor: section.color }]}>{section.title}</Text>
      <FlatList
        data={section.data}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.pokemonCard} onPress={() => handleCardClick(item, section.title)}>
            <Image source={{ uri: item.imageUrl }} style={styles.pokemonImage} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.name}
        contentContainerStyle={styles.cardContainer}
      />
    </View>
  );

  return (
    <View style={styles.container}>
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
            <Text style={styles.cardCountText}>{filteredData.reduce((acc, section) => acc + section.data.length, 0)}</Text>
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

      <SectionList
        sections={filteredData}
        keyExtractor={(item, index) => item.name + index}
        renderSectionHeader={renderPokemonSection}
        renderItem={() => null} // Do not render default items
      />

      {spotlightPokemon && (
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
          <Animated.View
            style={[
              styles.spotlightContainer,
              {
                transform: [
                  { translateY: slideUpAnim },
                  { perspective: 1000 },
                  { rotateX: tiltY.interpolate({ inputRange: [-10, 10], outputRange: ['-10deg', '10deg'] }) },
                  { rotateY: tiltX.interpolate({ inputRange: [-10, 10], outputRange: ['-10deg', '10deg'] }) },
                ],
              },
            ]}
            {...panResponder.panHandlers}
          >
            <Image source={{ uri: spotlightPokemon.imageUrl }} style={styles.spotlightImage} />
            <View style={styles.infoBox}>
              <Text style={styles.pokemonElement}>Element: {spotlightPokemon.element}</Text>
              <Text style={styles.pokemonName}>Name: {spotlightPokemon.name}</Text>
            </View>
            <Animated.View style={{ opacity: closeButtonOpacity }}>
              <TouchableOpacity onPress={closeSpotlight} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      )}

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

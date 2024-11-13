import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#e0e0e0', // Gray background for the header
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  cardCount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
  },
  bookIcon: {
    marginRight: 5,
  },
  cardCountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  searchIcon: {
    padding: 5,
  },
  searchInput: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    flex: 1,
  },
  filterButton: {
    padding: 8,
    borderRadius: 20,
  },
  cardGridContainer: {
    flex: 1,
    backgroundColor: '#ffffff', // White background for the card grid
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  pokemonCard: {
    margin: 8,
    width: 100,
    height: 140,
  },
  pokemonImage: {
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    paddingVertical: 10,
  },
  spotlightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  spotlightImage: {
    width: 300,
    height: 420,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    padding: 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '50%',
  },
  modalContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
    margin: 5,
  },
  filterLabel: {
    fontSize: 16,
    marginRight: 5,
  },
});

export default styles;

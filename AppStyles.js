import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#e0e0e0',
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
    backgroundColor: '#ffffff',
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spotlightContainer: {
    width: 300,
    height: 420,
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  spotlightImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  holoEffect: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 8,
    opacity: 0.75,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backgroundSize: '200% 200%',
    backgroundImage:
      'linear-gradient(115deg, rgba(0,231,255,0.5) 0%, rgba(255,0,231,0.5) 100%), url("https://assets.codepen.io/13471/holo.png"), url("https://assets.codepen.io/13471/sparkles.gif")',
    mixBlendMode: 'color-dodge',
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

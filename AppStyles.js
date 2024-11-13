import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    
  container: {
    padding: 10,
    backgroundColor: '#f0f5ff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
  },
  cardCount: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginLeft: 10,
    flex: 1,
  },
  filterButton: {
    position: 'absolute',
    right: 10,
    top: 60,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 3,
  },
  modalContainer: {
    backgroundColor: 'white', // Black background for the modal itself
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', // Add a shadow to the modal
    borderRadius: 10,
    width: '90%',
    padding: 20,
    alignItems: 'center',
    alignSelf: 'center', // Center horizontally
    marginTop: '50%', // Position in the middle of the screen
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff', // White color for text on black background
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
    borderColor: '#fff', // White border for options for visibility on black background
  },
  filterLabel: {
    fontSize: 16,
    marginRight: 5,
    color: '#fff', // White color for text on black background
  },
  closeButton: {
    marginTop: 15,
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
});

export default styles;

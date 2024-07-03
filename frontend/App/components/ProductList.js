import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ProductList = ({ endpoint, filterType, filters, setFilter, selectedFilter, selectedProducts, setSelectedProducts, navigation, handleSave }) => {
  const [products, setProducts] = useState([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    getProducts();
  }, [endpoint, selectedFilter]);

  const getProducts = async () => {
    try {
      let url = selectedFilter === '' ? `${endpoint}` : `${endpoint}/filter?${filterType}=${selectedFilter}`;
      const response = await fetch(url);
      const data = await response.json();

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error('Error: Data is not an array:', data);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleProductSelection = (product) => {
    if (selectedProducts.some(p => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleFilterChange = (itemValue) => {
    setFilter(itemValue === '' ? '' : itemValue);
  };

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollToTop(offsetY > 200);
  };

  const scrollToTop = () => {
    scrollViewRef.scrollTo({ y: 0, animated: true });
  };

  let scrollViewRef = null;

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.container}
        ref={(ref) => { scrollViewRef = ref; }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={require('../assets/left.png')} style={styles.backButton} />
          </TouchableOpacity>
          <Text style={styles.header}>𝑆𝑒𝑛𝑖𝑛𝑆𝑡𝑖𝑙𝑖𝑛</Text>
        </View>

        <View style={styles.filterContainer}>
          <Picker
            selectedValue={selectedFilter}
            onValueChange={handleFilterChange}
            style={styles.filterPicker}
          >
            {filters.map(filter => (
              <Picker.Item key={filter.value} label={filter.label} value={filter.value} />
            ))}
          </Picker>
        </View>

        <View style={styles.productContainer}>
          {products.map(product => (
            <TouchableOpacity
              key={product.id}
              style={[
                styles.productButton,
                selectedProducts.some(p => p.id === product.id) && styles.selectedProductButton
              ]}
              onPress={() => toggleProductSelection(product)}
            >
              <Image source={{ uri: product.image_url }} style={styles.productImage} />
              <Text style={styles.productText}>{product.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.saveButtonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {showScrollToTop && (
        <TouchableOpacity style={styles.scrollToTopButton} onPress={scrollToTop}>
          <Text style={styles.scrollToTopButtonText}>↑</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  backButton: {
    width: 25,
    height: 25,
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  filterContainer: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  filterPicker: {
    height: 50,
    width: '50%',
    backgroundColor: 'lightgrey',
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 20,
    paddingBottom: 100,
  },
  productButton: {
    width: '47%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#912cee'
  },
  selectedProductButton: {
    backgroundColor: '#ab82ff',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  productText: {
    fontSize: 16,
    marginTop: 10,
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 25,
    right: 20,
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
  },
  saveButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 10,
  },
  saveButtonText: {
    color: 'black',
    fontSize: 18,
  },
  scrollToTopButton: {
    bottom: 20,
    left: '47%', 
    backgroundColor: '#ab82ff',
    borderRadius: 25,
    elevation: 5,
    width: 25,
    height: 40,
  },
  scrollToTopButtonText: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default ProductList;

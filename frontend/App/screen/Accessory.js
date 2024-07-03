import React, { useState, useCallback, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Accessory = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [savedProductIds, setSavedProductIds] = useState([]);

  const categoryFilters = [
    { label: 'Tümü', value: '' },
    { label: 'Kolye', value: '12' },
    { label: 'Küpe', value: '13' },
    { label: 'Bileklik', value: '14' },
    { label: 'Yüzük', value: '15' },
  ];

  useFocusEffect(
    useCallback(() => {
      setSelectedFilter('');
      loadSavedProducts();
    }, [])
  );

  const loadSavedProducts = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://192.168.56.1:5000/userproductaccessory/getUserProducts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      setSavedProductIds(data.map(product => product.accessory_id));
      setSelectedProducts(data.map(product => ({ id: product.accessory_id, ...product }))); 
    } catch (error) {
      console.error('Error loading saved products:', error);
    }
  };

  const handleSave = async () => {
    const productIdsToSave = selectedProducts
      .map(product => product.id)
      .filter(id => !savedProductIds.includes(id));

    if (productIdsToSave.length === 0) {
      Alert.alert('Warning', 'Please select at least one product to save.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://192.168.56.1:5000/userproductaccessory/addUserProducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ product_ids: productIdsToSave }),
      });

      const data = await response.json();

      console.log('Response data:', data);

      if (response.ok) {
        Alert.alert('Success', data.message, [{ text: 'OK' }]);
        setSavedProductIds([...savedProductIds, ...productIdsToSave]);
        loadSavedProducts();
      } else {
        Alert.alert('Error', data.error, [{ text: 'OK' }]);
      }
    } catch (error) {
      console.error('Error saving products:', error);
      Alert.alert('Error', 'An error occurred while saving products.', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ProductList
        endpoint="http://192.168.56.1:5000/accessory"
        filterType="categories_id"
        filters={categoryFilters}
        setFilter={setSelectedFilter}
        selectedFilter={selectedFilter}
        navigation={navigation}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        handleSave={handleSave}
      />
    </View>
  );
};

export default Accessory;

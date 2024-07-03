import React, { useState, useCallback } from 'react';
import { View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import ProductList from '../components/ProductList';

const Outerwear = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [savedProductIds, setSavedProductIds] = useState([]);

  const categoryFilters = [
    { label: 'Tümü', value: '' },
    { label: 'Trençkot', value: '5' },
    { label: 'Kaban', value: '7' },
    { label: 'Mont', value: '8' },
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
      const response = await fetch('http://192.168.56.1:5000/userproductouterwear/getUserProducts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      setSavedProductIds(data.map(product => product.outerwear_id));
      setSelectedProducts(data.map(product => ({ id: product.outerwear_id, ...product }))); // Assuming product objects have an `id` field
    } catch (error) {
      console.error('Kaydedilen ürünler yüklenirken hata oluştu:', error);
      Alert.alert('Error', 'An error occurred while loading saved products.', [{ text: 'OK' }]);
    }
  };

  const handleSave = async () => {
    const productIdsToSave = selectedProducts
      .map(product => product.id)
      .filter(id => !savedProductIds.includes(id));

    if (productIdsToSave.length === 0) {
      Alert.alert('Uyarı', 'Lütfen kaydetmek için en az bir ürün seçin.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://192.168.56.1:5000/userproductouterwear/addUserProducts', {
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
        Alert.alert('Başarılı', data.message, [{ text: 'OK' }]);
        setSavedProductIds([...savedProductIds, ...productIdsToSave]);
      } else {
        Alert.alert('Error', data.error, [{ text: 'OK' }]);
      }
    } catch (error) {
      console.error('Error saving products:', error);
      Alert.alert('Error', 'Ürünler kaydedilirken bir hata oluştu.', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ProductList
        endpoint="http://192.168.56.1:5000/outerwear"
        filterType="categories_id"
        filters={categoryFilters}
        setFilter={setSelectedFilter}
        selectedFilter={selectedFilter}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        navigation={navigation}
        handleSave={handleSave}
      />
    </View>
  );
};

export default Outerwear;

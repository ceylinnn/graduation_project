// BottomProduct.js
import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductList from '../components/ProductList';
import { useFocusEffect } from '@react-navigation/native';

const BottomProduct = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);

  const categoryFilters = [
    { label: 'Tümü', value: '' },
    { label: 'Pantolon', value: '1' },
    { label: 'Jeans', value: '2' },
    { label: 'Etek', value: '3' },
  ];

  useFocusEffect(
    useCallback(() => {
      setSelectedFilter('');
      setSelectedProducts([]);
    }, [])
  );

  const handleSave = async () => {
    if (selectedProducts.length === 0) {
      Alert.alert('Uyarı', 'Lütfen kaydetmek için en az bir ürün seçin.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const productIds = selectedProducts.map(product => product.id);

      const existingProducts = await fetch('http://192.168.56.1:5000/userproductlowerwear/getUserProducts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!existingProducts.ok) {
        throw new Error('Failed to fetch existing products.');
      }

      const existingProductsData = await existingProducts.json();
      const existingProductIds = existingProductsData.map(product => product.lowerwear_id);

      const newProductIds = productIds.filter(productId => !existingProductIds.includes(productId));

      if (newProductIds.length === 0) {
        Alert.alert('Uyarı', 'Seçilen ürünlerin tümü zaten kaydedildi.');
        return;
      }

      // Save only the new products
      const response = await fetch('http://192.168.56.1:5000/userproductlowerwear/addUserProducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ product_ids: newProductIds }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Başarılı', data.message, [{ text: 'OK' }]);
      } else {
        Alert.alert('Error', data.error, [{ text: 'OK' }]);
      }
    } catch (error) {
      console.error('Ürünler kaydedilirken hata oluştu:', error);
      Alert.alert('Error', 'An error occurred while saving products.', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ProductList
        endpoint="http://192.168.56.1:5000/lowerwear"
        title="Bottom Products"
        filterParam="categories_id"
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

export default BottomProduct;




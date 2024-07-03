// TopProduct.js
import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductList from '../components/ProductList';
import { useFocusEffect } from '@react-navigation/native';

const TopProduct = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);

  const sleeveLengthFilters = [
    { label: 'Tümü', value: '' },
    { label: 'Kısa Kollu', value: '2' },
    { label: 'Uzun Kollu', value: '1' },
    { label: 'Kolsuz', value: '3' },
    { label: 'Askılı', value: '5' },
    { label: 'Straplez', value: '6' },
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

        const existingProducts = await fetch('http://192.168.56.1:5000/userproductupperwear/getUserProducts', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!existingProducts.ok) {
            throw new Error('Failed to fetch existing products.');
        }

        const existingProductsData = await existingProducts.json();
        const existingProductIds = existingProductsData.map(product => product.upperwear_id);

        const newProductIds = productIds.filter(productId => !existingProductIds.includes(productId));

        if (newProductIds.length === 0) {
            Alert.alert('Uyarı', 'Seçilen tüm ürünler zaten kaydedildi.');
            return;
        }

        const response = await fetch('http://192.168.56.1:5000/userproductupperwear/addUserProducts', {
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
        console.error('Error saving products:', error);
        Alert.alert('Error', 'Ürünler kaydedilirken bir hata oluştu.', [{ text: 'OK' }]);
    }
};


  return (
    <View style={{ flex: 1 }}>
      <ProductList
        endpoint="http://192.168.56.1:5000/upperwear"
        title="Top Products"
        filterParam="sleeve_length_id"
        filterType="sleeve_length_id"
        filters={sleeveLengthFilters}
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

export default TopProduct;


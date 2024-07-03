import React, { useState, useCallback, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Shoes = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [savedProductIds, setSavedProductIds] = useState([]);

  const categoryFilters = [
    { label: 'Tümü', value: '' },
    { label: 'Sandalet', value: '16' },
    { label: 'Sneaker', value: '17' },
    { label: 'Bot', value: '18' },
    { label: 'Çizme', value: '19' },
    { label: 'Topuklu', value: '21' },
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
      const response = await fetch('http://192.168.56.1:5000/userproductshoes/getUserProducts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      setSavedProductIds(data.map(product => product.shoes_id));
      setSelectedProducts(data.map(product => ({ id: product.shoes_id, ...product }))); 
    } catch (error) {
      console.error('Error loading saved products:', error);
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
      const response = await fetch('http://192.168.56.1:5000/userproductshoes/addUserProducts', {
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
        Alert.alert('Başarılı', [{ text: 'OK' }]);
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
        endpoint="http://192.168.56.1:5000/shoes"
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

export default Shoes;

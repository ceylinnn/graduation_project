import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Gardrob = () => {
    const [outerwear, setOuterwear] = useState([]);
    const [upperwear, setUpperwear] = useState([]);
    const [lowerwear, setLowerwear] = useState([]);
    const [accessory, setAccessories] = useState([]);
    const [shoes, setShoes] = useState([]);

    useEffect(() => {
        const fetchUserProducts = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };

                const fetchData = async (url) => {
                    const response = await fetch(url, config);
                    if (!response.ok) {
                        throw new Error(`Error fetching data from ${url}`);
                    }
                    return response.json();
                };

                const fetchProducts = async () => {
                    const outerwearData = await fetchData('http://192.168.56.1:5000/userproductouterwear/getUserProducts');
                    const upperwearData = await fetchData('http://192.168.56.1:5000/userproductupperwear/getUserProducts');
                    const lowerwearData = await fetchData('http://192.168.56.1:5000/userproductlowerwear/getUserProducts');
                    const shoesData = await fetchData('http://192.168.56.1:5000/userproductshoes/getUserProducts');
                    const accessoryData = await fetchData('http://192.168.56.1:5000/userproductaccessory/getUserProducts');

                    setOuterwear(outerwearData);
                    setUpperwear(upperwearData);
                    setLowerwear(lowerwearData);
                    setShoes(shoesData);
                    setAccessories(accessoryData);
                };

                fetchProducts();
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserProducts();
    }, []);

    const renderProducts = ({ item }) => (
        <Image key={item.id} source={{ uri: item.image_url }} style={styles.productImage} />
    );

    return (
        <ScrollView style={styles.scrollview}>
            <Text style={styles.heading}>𝐺𝐴𝑅𝐷𝑅𝑂𝑃</Text>

           

            <Text style={styles.category}>Üst Giyim</Text>
            <FlatList
                data={upperwear}
                renderItem={renderProducts}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                contentContainerStyle={styles.productContainer}
            />

            <Text style={styles.category}>Alt Giyim</Text>
            <FlatList
                data={lowerwear}
                renderItem={renderProducts}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                contentContainerStyle={styles.productContainer}
            />

            <Text style={styles.category}>Ayakkabı</Text>
            <FlatList
                data={shoes}
                renderItem={renderProducts}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                contentContainerStyle={styles.productContainer}
            />

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollview: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
        color: 'black',
    },
    category: {
        fontSize: 22,
        fontWeight: '400',
        marginVertical: 10,
        marginLeft: 10,
        color: 'black'
    },
    productContainer: {
        marginBottom: 20,
    },
    productImage: {
        width: 140,
        height: 140,
        marginTop: 5,
        marginBottom: 5,
        resizeMode: 'contain',
        marginLeft: -10,
        marginRight: -10,
        borderWidth: 2,
        borderColor: '#912cee'
    }
});

export default Gardrob;
// Favoriler.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favoriler = () => {
    const [savedCombinations, setSavedCombinations] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Fetch user id on component mount
        const getUserId = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const response = await fetch('http://192.168.56.1:5000/users/profile', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    const data = await response.json();
                    if (response.ok) {
                        setUserId(data.id);
                        fetchSavedCombinations(data.id);
                    } else {
                        console.error('Failed to fetch user profile:', data.error);
                    }
                }
            } catch (error) {
                console.error('Failed to load user id from storage:', error);
            }
        };

        getUserId();
    }, []);

    // Fetch saved combinations for the user
    const fetchSavedCombinations = async (userId) => {
        try {
            const response = await fetch(`http://192.168.56.1:5000/combinations/user/${userId}/images`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                setSavedCombinations(data);
            } else {
                console.error('Failed to fetch saved combinations:', data.error);
            }
        } catch (error) {
            console.error('Error fetching saved combinations:', error);
        }
    };

    const renderCombination = ({ item }) => (
        <View style={styles.combinationContainer}>
            {/*item.outerwear_image && (
                <View style={styles.itemContainer}>
                    <Image style={styles.itemImage} source={{ uri: item.outerwear_image }} />
                </View>
            )*/}
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                <View style={styles.itemContainer}>
                    <Image style={styles.itemImage} source={{ uri: item.upperwear_image }} />
                </View>
                <View style={styles.itemContainer}>
                    <Image style={styles.itemImage} source={{ uri: item.lowerwear_image }} />
                </View>
                <View style={styles.itemContainer}>
                    <Image style={styles.itemImage} source={{ uri: item.shoes_image }} />
                </View>
            </ScrollView>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>𝐹𝑎𝑣𝑜𝑟𝑖𝑙𝑒𝑟𝑖𝑚</Text>
            <FlatList
                data={savedCombinations}
                renderItem={renderCombination}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.combinationsList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
        color: 'black',
    },
    combinationsList: {
        width: '100%',
        paddingHorizontal: 20,
    },
    combinationContainer: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#912cee',
        top: 20,
    },
    itemContainer: {
        alignItems: 'center',
        marginBottom: 5,
        marginRight: -20,
        marginLeft: -15,
    },
    itemImage: {
        width: 150,
        height: 150,
        borderRadius: 5,
        resizeMode: 'contain',
    },
});

export default Favoriler;

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Kombin = () => {
    const [combinations, setCombinations] = useState([]);
    const [userId, setUserId] = useState(null);
    const [selectedCombinations, setSelectedCombinations] = useState([]); 

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

    // Function to handle selection of a combination
    const handleSelectCombination = (combination) => {
        // Check if the combination is already selected
        const index = selectedCombinations.findIndex((item) => item === combination);
        if (index === -1) {
            // Combination not found in selected list, add it
            setSelectedCombinations([...selectedCombinations, combination]);
        } else {
            // Combination found in selected list, remove it
            const updatedSelection = [...selectedCombinations];
            updatedSelection.splice(index, 1);
            setSelectedCombinations(updatedSelection);
        }
    };

    // Function to handle saving the selected combinations
    const handleSaveCombinations = async () => {
        if (selectedCombinations.length === 0) {
            Alert.alert('Kombinasyon seçilmedi', 'Lütfen kaydetmek için en az bir kombinasyon seçin.');
            return;
        }

        try {
            // Send the selected combinations to the backend to save
            const response = await fetch('http://192.168.56.1:5000/combinations/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: userId,
                    combinations: selectedCombinations
                })
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert('Kombinasyonlar kaydedildi', 'Seçilen kombinasyonlar başarıyla kaydedildi.');
                // Optionally, update local state or refresh combinations list
            } else {
                console.error('Failed to save combinations:', data.error);
                Alert.alert('Kayıt başarısız', 'Seçilen kombinasyonlar kaydedilemedi.');
            }
        } catch (error) {
            console.error('Error saving combinations:', error);
            Alert.alert('Error', 'Seçilen kombinasyonlar kaydedilemedi.');
        }
        console.log(req.body);
    };

    // Function to handle creating new combinations
    const handleCreateOutfit = async () => {
        if (!userId) {
            console.error('User not logged in');
            return;
        }

        try {
            const response = await fetch(`http://192.168.56.1:5000/combinations/generate/${userId}`);
            const data = await response.json();

            if (response.ok) {
                setCombinations(data);
            } else {
                console.error('Failed to generate combinations:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const renderCombination = ({ item }) => (
        <TouchableOpacity onPress={() => handleSelectCombination(item)}>
            <View style={[styles.combinationContainer, selectedCombinations.includes(item) ? { backgroundColor: '#ab82ff' } : null]}>
                {item.outerwear_required && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                        <View style={styles.itemContainer}>
                            <Image style={styles.itemImage} source={{ uri: item.outerwear_image }} />
                        </View>
                    </ScrollView>
                )}
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
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleCreateOutfit} style={styles.button}>
                    <Text style={styles.buttonText}>Kombin Oluştur</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSaveCombinations} style={styles.saveButton}>
                    <Text style={styles.buttonText}>Kaydet</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={combinations}
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    button: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
        elevation: 10,
    },
    saveButton: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
        elevation: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
    },
    combinationsList: {
        marginTop: 20,
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

export default Kombin;

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Button, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 

const Sorular = () => {
    const [selectedButtons, setSelectedButtons] = useState({});
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const navigation = useNavigation(); 

    useEffect(() => {
        fetch('http://192.168.56.1:5000/survey/questions')
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleButtonPress = (questionIndex, buttonNumber) => {
        setSelectedButtons(prevSelectedButtons => ({
            ...prevSelectedButtons,
            [questionIndex]: prevSelectedButtons[questionIndex] === buttonNumber ? null : buttonNumber
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            console.log("Tebrikler! Son soruya ulaşıldı.");
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        }
    };

    const handleSave = async () => {
        try {
            const selectedImages = Object.entries(selectedButtons).map(([index, value]) => {
                if (value !== null) {
                    const question = questions[parseInt(index)];
                    return {
                        question_id: question.id,
                        image_url: value === 0 ? question.image_url_1 : question.image_url_2,
                        style: value === 0 ? question.style_1 : question.style_2,
                        color_palette: value === 0 ? question.color_palette_1 : question.color_palette_2
                    };
                }
                return null;
            }).filter(image => image !== null);

            console.log("Selected images:", selectedImages);

            if (!selectedImages || selectedImages.length === 0) {
                console.error('No selected images found');
                Alert.alert('Error', 'No selected images found');
                return;
            }

            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Error', 'User not authenticated');
                return;
            }

            const response = await fetch('http://192.168.56.1:5000/survey/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ selectedImages }),
            });

            const text = await response.text();
            console.log('Server response:', text);
            
            let responseData;
            try {
                responseData = JSON.parse(text);
            } catch (error) {
                throw new Error(`Server returned invalid JSON: ${text}`);
            }

            if (response.ok) {
                Alert.alert('Başarılı', 'Anket cevapları kaydedildi.');
                navigation.navigate('Home'); 
            } else {
                Alert.alert('Error', responseData.error || 'Failed to save survey results');
            }
        } catch (error) {
            console.error('Error saving survey results:', error);
            Alert.alert('Error', error.message);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];
    const nextButtonText = currentQuestionIndex < questions.length - 1 ? "Devam" : "Kaydet";

    return (
        <View style={styles.container}>
            {currentQuestion && (
                <View style={styles.buttonContainer1}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { borderColor: selectedButtons[currentQuestionIndex] === 0 ? '#e74c3c' : 'grey' }
                        ]}
                        onPress={() => handleButtonPress(currentQuestionIndex, 0)}
                    >
                        <Image source={{ uri: currentQuestion.image_url_1 }} style={styles.image} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { borderColor: selectedButtons[currentQuestionIndex] === 1 ? '#e74c3c' : 'grey' }
                        ]}
                        onPress={() => handleButtonPress(currentQuestionIndex, 1)}
                    >
                        <Image source={{ uri: currentQuestion.image_url_2 }} style={styles.image} />
                    </TouchableOpacity>
                </View>
            )}
            <View style={styles.buttonContainer2}>
                <Button title="Geri" onPress={handlePreviousQuestion} />
                <Button title={nextButtonText} onPress={nextButtonText === "Kaydet" ? handleSave : handleNextQuestion} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    button: {
        width: 180,
        height: 300,
        borderRadius: 15,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        resizeMode: 'cover',
    },
    buttonContainer1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        top: '10%',
    },
    buttonContainer2: {
        flexDirection: 'row',
        marginTop: '20%',
        paddingHorizontal: 50,
        justifyContent: 'space-between',
    },
});

export default Sorular;

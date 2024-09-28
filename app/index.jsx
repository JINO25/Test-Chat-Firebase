
import React, { useState, useEffect, createContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function Index() {
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.navigate('Home');
            } else {
                navigation.navigate('Login');
            }
            setIsLoading(false);
        });

        return unsubscribe;
    }, [navigation]);


    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return null;
}

import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors';
import ChatList from '../components/ChatList'
import { StatusBar } from "expo-status-bar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const user = auth.currentUser;
    const [users, setUsers] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        if (user?.uid) {
            getUsers();
        }
    }, []);

    const getUsers = async () => {
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('userId', '!=', user?.uid));
            const querySnapshot = await getDocs(q);

            let data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data() });
            });

            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const onSignOut = async () => {
        await signOut(auth)
        await AsyncStorage.multiRemove(['userToken', 'tokenFirebase'])
        navigation.navigate('Login');
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginRight: 10
                    }}
                    onPress={onSignOut}
                >
                    <AntDesign name="logout" size={24} color={colors.gray} style={{ marginRight: 10 }} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);


    return (

        <View className="flex-1 bg-white">
            <StatusBar style="dark" />
            <ChatList users={users} />
        </View>
    );
};

export default Home;
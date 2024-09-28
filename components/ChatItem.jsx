import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import { collection, doc, query, getDocs, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { getRoomId } from '../utils/getId';

const ChatItem = ({ item }) => {
    const [message, setMessages] = useState("");
    const navigation = useNavigation();


    const onHandleRouter = () => {

        navigation.navigate("ChatRoom", {
            item
        })

    };


    useEffect(() => {
        const user = auth.currentUser;
        let userId = item.userId;
        let roomId = getRoomId(user?.uid, userId);
        let docRef = doc(db, "rooms", roomId);
        const messageRef = collection(docRef, "messages");
        const q = query(messageRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = querySnapshot.docs.map(doc => ({
                ...doc.data()
            }));
            if (messages.length > 0) {
                setMessages(messages[0].text);
            }
        }, (error) => {
            console.error("Error fetching messages:", error);
        });

        return () => unsubscribe();

    }, [item.userId]);

    return (
        <>
            <TouchableOpacity onPress={onHandleRouter} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2`}>
                <Image
                    source={{
                        uri: item?.profileUrl
                    }}
                    style={{ height: 40, width: 40 }}
                    className="rounded-full"
                />

                <View className="flex-1 gap-1">
                    <View className="flex-row justify-between">
                        <Text style={{ fontSize: 18 }} className="font-semibold text-neutral-800">{item?.name}</Text>
                        <Text style={{ fontSize: 16 }} className="font-medium text-neutral-500">Time</Text>
                    </View>
                    <Text style={{ fontSize: 16 }} className="font-medium text-neutral-500">{message}</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default ChatItem

const styles = StyleSheet.create({})
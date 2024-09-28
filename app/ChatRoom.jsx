import React, { useState, useLayoutEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot,
    doc,
    setDoc,
    Timestamp
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { getRoomId } from '../utils/getId';

export default function Chat({ route }) {
    const item = route.params;
    const itemId = item.item.userId;
    const user = auth.currentUser;

    const createRoomIfNotExist = async () => {
        let roomId = getRoomId(user?.uid, itemId);
        await setDoc(doc(db, "rooms", roomId), {
            roomId,
            createAt: Timestamp.fromDate(new Date())
        });
    };

    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        createRoomIfNotExist();
        let roomId = getRoomId(user?.uid, itemId);
        let docRef = doc(db, "rooms", roomId);
        const messageRef = collection(docRef, "messages");

        const q = query(messageRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: {
                        _id: doc.data().userId,
                        avatar: item.item.profileUrl
                    }
                }))
            );
        });

        return unsubscribe;
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)
        );
        const { createdAt, text } = messages[0];
        let roomId = getRoomId(user?.uid, itemId);
        let docRef = doc(db, "rooms", roomId);
        const messageRef = collection(docRef, "messages");

        addDoc(messageRef, {
            createdAt,
            text,
            userId: user?.uid
        });
    }, []);

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            showUserAvatar={false}
            onSend={messages => onSend(messages)}
            messagesContainerStyle={{
                backgroundColor: '#fff'
            }}
            textInputStyle={{
                backgroundColor: '#fff',
                borderRadius: 20,
            }}
            user={{
                _id: user?.uid,
            }}
        />
    );
}

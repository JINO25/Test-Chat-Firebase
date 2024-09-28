import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { RoleContext } from "./ContextProvider";

// const { setRole } = useContext(RoleContext);

export default Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleLoginSuccessfully = async (credential) => {
        try {
            const res = await axios.post('http://192.168.1.151:3000/BE_React/login', { email: credential });
            const token = res.data.token;
            const role = res.data.data.user.role;
            AsyncStorage.setItem('userRole', role);
            AsyncStorage.setItem('userToken', token);
        } catch (error) {
            console.error("Error during login:", error);
        }


    }

    const onHandleLogin = async () => {
        let tokenUser;
        // await signInWithEmailAndPassword(auth, email, password)
        await signInWithEmailAndPassword(auth, "jino@gmail.com", '123456')
            .then((userCre) => {
                tokenUser = userCre._tokenResponse.idToken;
                // handleLoginSuccessfully(email);
                handleLoginSuccessfully('jino@gmail.com');
                AsyncStorage.setItem('tokenFirebase', tokenUser);
                navigation.navigate('Home')
            })
            .catch((err) => Alert.alert("Login error", err.message));
    };

    return (
        <View style={styles.container}>
            <View style={styles.whiteSheet} />
            <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Log In</Text>
                {/* <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoFocus={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                /> */}
                <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Log In</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                        <Text style={{ color: '#f57c00', fontWeight: '600', fontSize: 14 }}> Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <StatusBar barStyle="light-content" />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "orange",
        alignSelf: "center",
        paddingBottom: 24,
    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    backImage: {
        width: "100%",
        height: 340,
        position: "absolute",
        top: 0,
        resizeMode: 'cover',
    },
    whiteSheet: {
        width: '100%',
        height: '75%',
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    button: {
        backgroundColor: '#f57c00',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
});

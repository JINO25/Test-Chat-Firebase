import { Text, View, Modal, Pressable, StyleSheet } from 'react-native';
import React from 'react';

const AlertError = ({ visible, onClose }) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <Text>Bạn không có quyền truy cập</Text>
                    <Pressable style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>Đóng</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
    },
    closeText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default AlertError;

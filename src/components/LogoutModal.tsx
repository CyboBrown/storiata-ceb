import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

interface ComponentProps {
  modalVisible: boolean;
  setModalVisible: any;
  handleLogOut: any;
}

export default function LogoutModal({ modalVisible, setModalVisible, handleLogOut }: ComponentProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeaderText}>Confirm Log Out</Text>
          <Text style={styles.modalText}>Are you sure you want to log out?</Text>

          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.buttonCancel]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonConfirm]}
              onPress={handleLogOut}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 350,
    padding: 25,
    backgroundColor: 'white',
    borderRadius: 10,
    
  },
  modalHeaderText: {
    fontSize: 24,
    fontWeight: "900",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: 'gray',
  },
  buttonConfirm: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
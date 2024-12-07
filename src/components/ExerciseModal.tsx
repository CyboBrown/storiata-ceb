import React from "react";
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import ExerStartAnim from "../assets/exercise_start.gif";

interface ComponentProps {
  userIsContributor: boolean;
  exerciseTitle: string;
  modalVisible: boolean;
  setModalVisible: any;
  handleRedirect: any;
  handleRedirectEdit: any;
}

export default function ExerciseModal({
  userIsContributor,
  exerciseTitle,
  modalVisible,
  setModalVisible,
  handleRedirect,
  handleRedirectEdit,
}: ComponentProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
        <View style={styles.modalContentWrapper} onStartShouldSetResponder={() => true}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeaderText}>{exerciseTitle}</Text>
            <View style={{ alignItems: "center" }}>
              <Image source={ExerStartAnim} style={{ height: 100, width: 100 }} />
            </View>
            <Text style={styles.modalText}>
              Do you wish to begin the exercise?
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleRedirect}
              >
                <Text style={styles.buttonText}>BEGIN EXERCISE</Text>
              </TouchableOpacity>
              {userIsContributor && (
                <TouchableOpacity
                  style={[styles.button, styles.buttonConfirm]}
                  onPress={handleRedirectEdit}
                >
                  <Text style={styles.buttonText}>EDIT EXERCISE</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContentWrapper: {
    width: "90%",
    alignSelf: "center",
  },
  modalContent: {
    padding: "7%",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalHeaderText: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "900",
  },
  modalText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 25,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: "75%",
    alignItems: "center",
  },
  buttonConfirm: {
    backgroundColor: "dodgerblue",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
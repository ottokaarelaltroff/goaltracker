import { StyleSheet, Modal, View, Dimensions } from "react-native";
import { GText } from "./GText";
import { Colors } from "../util/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ModalProps {
  visible: boolean,
  setModalVisible: (value: boolean) => void
};

const { height } = Dimensions.get("window");

export const GModal = ({ visible, setModalVisible }: ModalProps) => {

  return (
    // <View style={styles.container}>

    <Modal visible={visible}
      // transparent={true}
      animationType="slide"
      onRequestClose={() => { }}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <GText >{'Modal content goes here'}</GText>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <GText>Close Modal</GText>
        </TouchableOpacity>
      </View>
    </Modal>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    height: height / 2,
  },
  modal: {
    justifyContent: 'flex-start',
    margin: 0,
    height: height / 3,
    backgroundColor: Colors.primary,
    borderWidth: 5,
    borderColor: Colors.lightRed
  },
  modalContent: {
    backgroundColor: Colors.primary,
    height: height / 3,
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 5,
    borderColor: Colors.lightRed
  },
});
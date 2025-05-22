// components/CustomModal.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  Dimensions,
} from 'react-native';
import Colors from '../constants/colors';

const { height: deviceHeight } = Dimensions.get('window');

interface CustomModalProps {
  visible: boolean;
  onClose: (event: GestureResponderEvent) => void;
  title: string;
  message: string;
  confirmText: string;
  onConfirm?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  message,
  confirmText,
  onConfirm,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={[styles.overlay,{ height: deviceHeight }]}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={(e) => {
                onConfirm?.();
                onClose(e);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  overlay: {
    // flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    // height:'100%',
  },
  modalContainer: {
    backgroundColor: Colors.backgroundLight,
    padding: 24,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: Colors.BlueBtn,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.textInverse,
    fontWeight: '600',
  },
});

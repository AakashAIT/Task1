// components/CustomModal.tsx
import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  GestureResponderEvent,
  Pressable,
} from 'react-native';

const { height: deviceHeight } = Dimensions.get('window');

interface CustomModalProps {
  visible: boolean;
  onClose: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  children,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable
        onPress={onClose}
        style={[styles.overlay, { height: deviceHeight }]}
      >
        <Pressable onPress={() => {}} style={styles.modalContainer}>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '80%',
    maxHeight: '80%',
  },
});

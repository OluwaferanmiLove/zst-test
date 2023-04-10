import React, {ReactNode} from 'react';
import Modal, {ModalProps} from 'react-native-modal';
import {StyleSheet, View} from 'react-native';
import {wp} from '@utils/responsive-dimension';

export interface BottomModalProps extends Partial<ModalProps> {
  children: ReactNode;
  closeModal: () => void;
}

const BottomModal = ({children, closeModal, ...rest}: BottomModalProps) => {
  return (
    <Modal
      avoidKeyboard={true}
      animationIn={'bounceInUp'}
      animationOut={'bounceOutDown'}
      animationInTiming={400}
      animationOutTiming={400}
      style={styles.main}
      onBackdropPress={() => closeModal!()}
      onBackButtonPress={() => closeModal!()}
      {...rest}>
      <View style={styles?.modalInner}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  main: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalInner: {
    backgroundColor: '#36373A',
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
  },
});

export default BottomModal;

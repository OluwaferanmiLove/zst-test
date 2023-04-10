import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {colors} from '@theme/colors';
import {hp, wp} from '@utils/responsive-dimension';
import Modal, {ModalProps} from 'react-native-modal';

export interface BaseModalProps extends Partial<ModalProps> {
  isVisible: boolean;
  onPressClose?: () => void;
  children: React.ReactNode;
  styleButton?: StyleProp<ViewStyle>;
  containerStyles?: StyleProp<ViewStyle>;
  margin?: number;
}

const BaseModal = ({
  isVisible,
  onPressClose,
  children,
  margin = wp(24),
  containerStyles = {},
  ...rest
}: BaseModalProps) => {
  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      backdropColor={'#000000a3'}
      onBackdropPress={onPressClose}
      avoidKeyboard={true}
      isVisible={isVisible}
      style={[styles.centeredView, {margin}]}
      {...rest}>
      <View style={[styles.modalView, containerStyles]}>{children}</View>
    </Modal>
  );
};

export default BaseModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    paddingTop: hp(40),
    paddingBottom: hp(40),
    paddingHorizontal: wp(32),
    backgroundColor: colors.lighterGrey,
    borderRadius: wp(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
});

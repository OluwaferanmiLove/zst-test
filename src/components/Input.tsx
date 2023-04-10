import React, {ReactNode} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TextInputProps,
  StyleProp,
  ViewStyle,
  LayoutAnimation,
} from 'react-native';
import {colors} from '../theme/colors';
import {wp, hp} from '../utils/responsive-dimension';
import Row from './Row';

export interface InputProps extends TextInputProps {
  height?: number;
  width?: number;
  value?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  paddingVertical?: number;
  paddingHorizontal?: number;
  marginTop?: number;
  secureTextEntry?: boolean;
  autoFocus?: boolean;
  placeholder: string | number | any;
  onChangeText?: (arg: string) => void;
  inputBlur?: () => void;
  inputFocused?: () => void;
  textAlign?: 'center' | 'left' | 'right' | undefined;
  inputStyles?: StyleProp<TextInputProps>;
  inputContainerStyles?: StyleProp<ViewStyle>;
  reff?: any;
}

const Input: React.FC<InputProps> = ({
  secureTextEntry = false,
  marginTop,
  placeholder,
  onChangeText,
  inputFocused,
  inputBlur,
  value,
  autoFocus,
  textAlign,
  paddingVertical = hp(0),
  paddingHorizontal = wp(0),
  width = '100%',
  inputContainerStyles,
  inputStyles,
  reff,
  ...rest
}) => {
  const styles = StyleSheet.create({
    inputContainer: {
      marginTop: marginTop,
      paddingVertical,
      paddingHorizontal,
      width,
      // borderWidth: wp(1),
    },
    textInput: {
      flex: 1,
      fontFamily: 'Poppins-Regular',
      color: colors.white,
      fontSize: wp(14),
      lineHeight: hp(20),
      paddingVertical: 0,
      textAlign,
    },
  });

  const onFocus = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    inputFocused?.();
  };

  const onBlur = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    inputBlur?.();
  };

  return (
    <View style={[styles.inputContainer, inputContainerStyles]}>
      <Row>
        <TextInput
          style={[styles.textInput, inputStyles]}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          onFocus={onFocus}
          autoFocus={autoFocus}
          value={value}
          ref={reff}
          onBlur={onBlur}
          onChangeText={onChangeText}
          {...rest}
        />
      </Row>
    </View>
  );
};

export default Input;

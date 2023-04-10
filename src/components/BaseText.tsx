import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {colors} from '@theme/colors';
import {hp, wp} from '@utils/responsive-dimension';

export interface BaseTextT extends TextProps {
  value?: string;
  children?: ReactNode;
  fontSize?: number;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  lineHeight?: number;
  letterSpacing?: number;
  fontFamily?:
    | 'Poppins-Light'
    | 'Poppins-Regular'
    | 'Poppins-Medium'
    | 'Poppins-SemiBold'
    | 'Poppins-Bold'
    | 'Poppins-Black'
    | 'Poppins-ExtraBold';
  color?: string;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  customStyles?: StyleProp<TextStyle>;
}

const BaseText: React.FC<BaseTextT> = ({
  value,
  children,
  fontSize = wp(16),
  fontFamily = 'Poppins-Medium',
  marginTop = 0,
  marginLeft = 0,
  lineHeight = hp(24),
  marginRight = 0,
  marginBottom = 0,
  letterSpacing,
  customStyles = {},
  textAlign = 'left',
  color = colors.black,
  ...rest
}) => {
  const styles = StyleSheet.create({
    main: {
      fontSize,
      fontFamily,
      marginTop,
      marginLeft,
      lineHeight,
      marginRight,
      marginBottom,
      color,
      textAlign,
      letterSpacing,
    },
  });

  return (
    <Text style={[styles.main, customStyles]} {...rest}>
      {value}
      {children}
    </Text>
  );
};
export default BaseText;

import React, {ReactNode} from 'react';
import {
  FlexAlignType,
  StyleProp,
  StyleSheet,
  TextProps,
  TextStyle,
  View,
} from 'react-native';

export interface RowT extends TextProps {
  children?: ReactNode;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  alignItems?: FlexAlignType;
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  marginHorizontal?: number;
  marginVertical?: number;
  customStyles?: StyleProp<TextStyle>;
}

const Row: React.FC<RowT> = ({
  alignItems = 'center',
  justifyContent = 'space-between',
  flexWrap,
  marginHorizontal,
  marginVertical,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  customStyles,
  children,
  ...rest
}) => {
  const styles = StyleSheet.create({
    main: {
      flexDirection: 'row',
      alignItems,
      justifyContent,
      marginHorizontal,
      marginVertical,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      flexWrap,
    },
  });

  return (
    <View style={[styles.main, customStyles]} {...rest}>
      {children}
    </View>
  );
};
export default Row;

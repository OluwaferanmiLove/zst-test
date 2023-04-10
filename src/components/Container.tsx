import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {wp} from '@utils/responsive-dimension';

interface ContainerT {
  flex?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  customStyles?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const Container: React.FC<ContainerT> = ({
  flex = 1,
  marginHorizontal = wp(24),
  marginVertical = 0,
  marginTop = 0,
  marginLeft = 0,
  marginRight = 0,
  marginBottom = 0,
  customStyles = {},
  children,
  ...rest
}) => {
  const styles = StyleSheet.create({
    main: {
      flex,
      marginHorizontal,
      marginVertical,
      marginTop: marginVertical ? marginVertical : marginTop,
      marginLeft: marginHorizontal ? marginHorizontal : marginLeft,
      marginRight: marginHorizontal ? marginHorizontal : marginRight,
      marginBottom: marginVertical ? marginVertical : marginBottom,
    },
  });

  return (
    <View style={[styles.main, customStyles]} {...rest}>
      {children}
    </View>
  );
};
export default Container;

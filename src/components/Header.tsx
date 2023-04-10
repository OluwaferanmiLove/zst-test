/* eslint-disable react/no-unstable-nested-components */
import React, {ReactNode} from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '@theme/colors';
import {hp, wp} from '@utils/responsive-dimension';
import CustomText from './CustomText';

interface HeaderT {
  title?: string;
  onPressLeftElement?: (event: GestureResponderEvent) => void;
  onPressRightElement?: (event: GestureResponderEvent) => void;
  titleAlign?: 'center' | 'left' | 'right';
  titleStyle?: StyleProp<TextStyle>;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  textColor?: string;
}

const Header: React.FC<HeaderT> = ({
  title,
  textColor = colors.white,
  onPressLeftElement,
  onPressRightElement,
  rightElement,
  leftElement,
  titleAlign,
  titleStyle,
}) => {
  const styles = StyleSheet.create({
    main: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: hp(14),
      marginVertical: hp(8),
      marginTop: hp(16),
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: wp(8),
    },
    image: {
      width: wp(165),
      height: hp(34),
      resizeMode: 'contain',
    },
  });

  const Space = () => {
    return <View style={{width: wp(20)}} />;
  };

  return (
    <View style={styles.main}>
      {leftElement && (
        <TouchableOpacity onPress={onPressLeftElement}>
          {leftElement}
        </TouchableOpacity>
      )}
      {!leftElement && <Space />}
      <View style={styles.titleContainer}>
        {title && (
          <CustomText.Header
            textAlign={titleAlign}
            customStyles={titleStyle}
            color={textColor}>
            {title!}
          </CustomText.Header>
        )}
      </View>
      {rightElement}
      {!rightElement && <Space />}
    </View>
  );
};
export default Header;

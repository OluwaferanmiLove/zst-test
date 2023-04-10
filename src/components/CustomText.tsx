import {colors} from '@theme/colors';
import React, {ReactNode} from 'react';
import {wp} from '../utils/responsive-dimension';
import BaseText, {BaseTextT} from './BaseText';

interface CustomTextProps extends BaseTextT {
  children: ReactNode;
}

const Header: React.FC<CustomTextProps> = ({children, ...rest}) => {
  return (
    <BaseText
      fontFamily={'Poppins-Medium'}
      fontSize={wp(18)}
      lineHeight={wp(24)}
      letterSpacing={wp(0.15)}
      color={colors.white}
      {...rest}>
      {children}
    </BaseText>
  );
};

const BodyLarge: React.FC<CustomTextProps> = ({children, ...rest}) => {
  return (
    <BaseText
      fontSize={wp(16)}
      letterSpacing={wp(0.5)}
      lineHeight={wp(22)}
      color={colors.white}
      {...rest}>
      {children}
    </BaseText>
  );
};

const BodySmall: React.FC<CustomTextProps> = ({children, ...rest}) => {
  return (
    <BaseText
      fontSize={wp(14)}
      lineHeight={wp(20)}
      letterSpacing={wp(0.25)}
      fontFamily={'Poppins-Regular'}
      color={colors.white}
      {...rest}>
      {children}
    </BaseText>
  );
};

const Caption: React.FC<CustomTextProps> = ({children, ...rest}) => {
  return (
    <BaseText
      fontSize={wp(12)}
      lineHeight={wp(16)}
      letterSpacing={wp(0.4)}
      color={colors.white}
      {...rest}>
      {children}
    </BaseText>
  );
};

const HelperText: React.FC<CustomTextProps> = ({children, ...rest}) => {
  return (
    <BaseText
      fontSize={wp(10)}
      lineHeight={wp(13)}
      color={colors.white}
      customStyles={{letterSpacing: wp(0.4)}}
      {...rest}>
      {children}
    </BaseText>
  );
};

const CustomText = {
  Header,
  BodyLarge,
  BodySmall,
  Caption,
  HelperText,
};

export default CustomText;

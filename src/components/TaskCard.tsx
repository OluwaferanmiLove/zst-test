import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '@theme/colors';
import {hp, wp} from '@utils/responsive-dimension';
import CustomText from './CustomText';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import {dateFromNow} from '@utils/helper';

interface TaskCardT {
  title?: string;
  description?: string;
  date?: Date;
  stared?: boolean;
  completed?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  onLongPress?: () => void;
  onPress?: () => void;
  disabled?: boolean;
}

const TaskCard: React.FC<TaskCardT> = ({
  title,
  date,
  description,
  titleStyle,
  stared,
  completed,
  onLongPress,
  onPress,
  disabled,
}) => {
  const styles = StyleSheet.create({
    main: {
      // flexDirection: 'row',
      // alignItems: 'center',
      // justifyContent: 'space-between',
      // marginHorizontal: hp(20),
      // marginVertical: hp(8),
      marginTop: hp(35),
    },
    top: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      // marginHorizontal: hp(20),
      // marginVertical: hp(8),
      // marginTop: hp(16),
    },
    datePill: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: hp(10),
      paddingVertical: hp(6),
      marginTop: hp(8),
      borderWidth: wp(1),
      borderColor: colors?.secondary,
      borderRadius: wp(20),
      marginLeft: wp(32),
    },
    textContainer: {
      flex: 1,
      marginHorizontal: wp(16),
    },
    image: {
      width: wp(165),
      height: hp(34),
      resizeMode: 'contain',
    },
  });

  return (
    <TouchableOpacity
      style={styles.main}
      onLongPress={onLongPress}
      onPress={onPress}
      disabled={disabled}>
      <View style={styles.top}>
        {!completed && (
          <Ionicons
            name={'radio-button-off'}
            color={colors?.secondary}
            size={wp(20)}
          />
        )}
        {completed && (
          <MaterialCommunityIcons
            name="check"
            size={wp(26)}
            color={colors?.primary}
          />
        )}
        <View style={styles.textContainer}>
          <CustomText.BodyLarge
            fontFamily={'Poppins-Regular'}
            customStyles={[
              titleStyle,
              completed && {textDecorationLine: 'line-through'},
            ]}
            color={colors?.white}>
            {title!}
          </CustomText.BodyLarge>
          {description && (
            <CustomText.BodySmall
              customStyles={titleStyle}
              marginTop={hp(4)}
              color={colors?.secondary}>
              {description!}
            </CustomText.BodySmall>
          )}
        </View>
        {/* <Ionicons name={'star-outline'} color={colors?.secondary} size={wp(20)} /> */}
        <MaterialIcons
          name={stared ? 'star' : 'star-border'}
          size={wp(24)}
          color={stared ? colors.primary : colors?.secondary}
        />
      </View>
      {date && (
        <View style={styles.datePill}>
          <CustomText.Caption
            color={colors?.primary}
            fontFamily={'Poppins-Medium'}>
            {dateFromNow(date)}
          </CustomText.Caption>
        </View>
      )}
    </TouchableOpacity>
  );
};
export default TaskCard;

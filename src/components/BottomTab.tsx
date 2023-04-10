import React from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '@theme/colors';
import {hp, wp} from '@utils/responsive-dimension';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface BottomTabT {
  onPressMenu?: (event: GestureResponderEvent) => void;
  onPressAdd?: (event: GestureResponderEvent) => void;
  onPressDot?: (event: GestureResponderEvent) => void;
}

const BottomTab: React.FC<BottomTabT> = ({
  onPressMenu,
  onPressDot,
  onPressAdd,
}) => {
  const inserts = useSafeAreaInsets();
  const bottom = inserts.bottom;

  let platformNumber = Platform.OS === 'android' ? 0 : 30;

  let left = Dimensions.get('window').width / 2 - platformNumber;

  const styles = StyleSheet.create({
    main: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#2F3033',
      // marginVertical: hp(8),
    },
    tabItem: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingBottom: hp(bottom + 24),
      paddingTop: hp(16),
      paddingHorizontal: wp(16),
    },
    actionBtn: {
      position: 'absolute',
      top: -hp(30),
      left: wp(left),
      // width: wp(66),
      // height: hp(66),
      padding: wp(4),
      borderRadius: hp(66),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors?.mainBg,
    },
    actionBtnInner: {
      // width: wp(66),
      // height: hp(66),
      padding: wp(16),
      borderRadius: hp(66),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2F3033',
    },
    addIcon: {
      width: wp(24),
      height: wp(24),
      resizeMode: 'contain',
    },
  });

  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles?.tabItem} onPress={onPressMenu}>
        <MaterialCommunityIcons
          name="menu"
          size={wp(24)}
          color={colors?.secondary}
        />
      </TouchableOpacity>
      {/* <View style={styles.titleContainer}>
        
      </View> */}
      <TouchableOpacity
        style={[styles?.tabItem, {alignItems: 'flex-end'}]}
        onPress={onPressDot}>
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={wp(24)}
          color={colors?.secondary}
        />
      </TouchableOpacity>
      <TouchableOpacity style={[styles?.actionBtn]} onPress={onPressAdd}>
        <View style={[styles?.actionBtnInner]}>
          <Image
            source={require('@assets/images/addIcon.png')}
            style={styles.addIcon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default BottomTab;

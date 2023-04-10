import React, {useCallback, useEffect, useRef, useState} from 'react';
import {colors} from '@theme/colors';
import {hp, wp} from '@utils/responsive-dimension';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {TabView} from 'react-native-tab-view';

import CustomText from './CustomText';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

type tabRoute = {
  key: string;
  title: string;
};

type componentObj = {
  key: string;
  component: any;
  func: any;
};

interface ITabs {
  tabRoutes: tabRoute[];
  tabComponents: componentObj[];
  getIndex: (index: number) => void;
  style?: ViewStyle;
  sceneContainerStyle?: ViewStyle;
  currentIndex: number;
}

const TopTabs = ({
  tabRoutes,
  tabComponents,
  getIndex,
  style,
  sceneContainerStyle,
  currentIndex,
}: ITabs) => {
  // const initialLayout = {width: SCREEN_WIDTH};

  // const [index, setIndex] = useState(0);
  // console.log(tabRoutes);
  // console.log(tabComponents);
  const [routes, setRoutes] = useState(tabRoutes);
  const scrollRef = useRef<ScrollView>(null);

  const navigation = useNavigation();

  useEffect(() => {
    setRoutes(tabRoutes);
  }, [tabRoutes]);

  const renderScene = useCallback(
    ({route}: any) => {
      switch (route.key) {
        case route.key:
          const FoundComponent = tabComponents.find(
            component => component.key === route.key,
          );
          return FoundComponent?.component;
        default:
          return null;
      }
    },
    [tabComponents],
  );

  const renderTabBar = (props: any) => {
    return (
      <ScrollView
        style={styles.main}
        ref={scrollRef}
        contentContainerStyle={styles.mainInner}
        horizontal
        showsHorizontalScrollIndicator={false}>
        <View style={styles.topBarContainer}>
          {props.navigationState.routes.map((route: any, i: number) => (
            <View key={i} style={[styles.tabbarItem]}>
              <TouchableOpacity
                style={styles.tabbarItemInner}
                onPress={() => {
                  getIndex(i);
                  scrollRef?.current?.scrollTo({x: 0, y: i, animated: true});
                }}>
                <CustomText.BodySmall
                  fontFamily={'Poppins-Medium'}
                  color={
                    currentIndex === i ? colors.primary : colors?.secondary
                  }>
                  {route.title === 'Stared' ? (
                    <Ionicons name={'star'} size={wp(20)} />
                  ) : (
                    route.title
                  )}
                </CustomText.BodySmall>
              </TouchableOpacity>
              {/* {currentIndex === i && <View style={styles.activeIndicator} />} */}
              <View
                style={[
                  styles.activeIndicator,
                  {
                    backgroundColor:
                      currentIndex === i ? colors.primary : 'transparent',
                  },
                ]}
              />
            </View>
          ))}
          <TouchableOpacity
            style={[styles.tabbarItemInner]}
            onPress={() => navigation.navigate('NewList')}>
            <CustomText.BodySmall
              fontFamily={'Poppins-Medium'}
              color={colors?.secondary}>
              + New list
            </CustomText.BodySmall>
            <View style={[styles.activeIndicator]} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <TabView
      navigationState={{index: currentIndex, routes}}
      renderScene={renderScene}
      onIndexChange={getIndex}
      renderTabBar={renderTabBar}
      style={{flex: 1, ...style}}
      sceneContainerStyle={sceneContainerStyle}
    />
  );
};

const styles = StyleSheet.create({
  main: {
    flexGrow: 0,
    minWidth: '100%',
    borderBottomWidth: wp(1),
    borderColor: '#3D4043',
  },
  mainInner: {
    minWidth: '100%',
    justifyContent: 'center',
  },
  topBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    // marginHorizontal: wp(20),
    // paddingHorizontal: wp(20),
  },
  tabbarItem: {
    // flex: 1,
    marginHorizontal: wp(20),
    // marginVertical: hp(16),
  },
  tabbarItemInner: {
    // flex: 1,
    // marginHorizontal: wp(16),
    marginBottom: hp(16),
  },
  activeIndicator: {
    height: hp(3),
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    backgroundColor: 'transparent',
  },
});

export default TopTabs;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '@screens/home/Home';
import NewList from '@screens/newList/NewList';
import {colors} from '@theme/colors';

const Stack = createStackNavigator();

const BaseApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: colors.mainBg},
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NewList" component={NewList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default BaseApp;

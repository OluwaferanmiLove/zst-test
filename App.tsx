import React, {useCallback, useEffect} from 'react';
import {Platform, UIManager} from 'react-native';
import {persistor, store} from '@redux/store';
import {Provider} from 'react-redux';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {customFonts} from '@constant/staticData';
import BaseApp from '@navigation/AppNavigation';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BaseApp />
      </PersistGate>
    </Provider>
  );
}

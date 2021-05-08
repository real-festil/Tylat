import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import firebase from 'firebase';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import store from './store/store';
import { firebaseConfig } from './api';

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  firebase.auth().onAuthStateChanged(
    (user) => {
      if (user) {
        console.log(`user`, user);
      }
      setIsLoading(false);
    },
    (error) => console.log(error),
  );

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light }}>
          {!isLoading && (
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
          )}
        </ApplicationProvider>
        {/* </PersistGate> */}
      </Provider>
    </>
  );
}

import { Button } from '@ui-kitten/components/ui';
import firebase from 'firebase';
import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AuthModal from '../components/AuthModal';

import { Text, View } from '../components/Themed';

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const [isUser, setIsUser] = React.useState(false);
  const isFocused = useIsFocused();
  const user = firebase.auth().currentUser;

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 500,
    }).start();
  }, [fadeAnim]);

  firebase.auth().onAuthStateChanged(
    (stateUser) => {
      if (stateUser) {
        if (stateUser.displayName) {
          setIsUser(true);
        }
      }
    },
    (error) => console.log(error),
  );

  const onSignOut = () => {
    firebase.auth().signOut();
    setIsUser(false);
    navigation.navigate(`TileScreen`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>There will be profile</Text>
      {isUser ? (
        <>
          <Text>Welcome {user!.displayName}</Text>
          <Button onPress={onSignOut}>Sign out</Button>
        </>
      ) : (
        isFocused && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <AuthModal
              onSignedIn={() => {
                setIsUser(true);
              }}
            />
          </Animated.View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
  },
  title: {
    fontSize: 20,
    fontWeight: `bold`,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: `80%`,
  },
});

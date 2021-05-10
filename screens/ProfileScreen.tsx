import { Button } from '@ui-kitten/components/ui';
import firebase from 'firebase';
import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
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
      {isUser ? (
        <View style={styles.userContainer}>
          <View>
            <Ionicons size={90} name="person" />
            <Text style={styles.userText}>{user!.displayName}</Text>
          </View>
          <Ionicons onPress={onSignOut} size={40} name="log-out-outline" />
        </View>
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
      <Text style={styles.title}>There will be profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
    padding: 20,
  },
  userContainer: {
    justifyContent: `space-between`,
    alignItems: `flex-start`,
    flexDirection: `row`,
    width: `100%`,
    height: `100%`,
    paddingTop: 100,
  },
  userText: {
    fontSize: 20,
    fontWeight: `600`,
    paddingLeft: 8,
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
  button: {
    backgroundColor: `black`,
    marginTop: 25,
    borderColor: `black`,
    height: 10,
  },
});

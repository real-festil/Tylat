import { Modal } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import Auth from '../../screens/Auth';

const AuthModal = ({ onSignedIn }: { onSignedIn: () => void }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const leftAnim = React.useRef(new Animated.Value(-1000)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 200,
    }).start();
  }, [fadeAnim]);

  React.useEffect(() => {
    Animated.timing(leftAnim, {
      useNativeDriver: true,
      toValue: 0,
      duration: 300,
    }).start();
  }, [leftAnim]);

  return (
    <Modal visible backdropStyle={styles.backdrop} style={styles.modal}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateX: leftAnim,
            },
          ],
        }}
      >
        <Auth onSignedIn={onSignedIn} />
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: `90%`,
    borderWidth: 5,
    borderColor: `black`,
  },
  backdrop: {
    backgroundColor: `rgba(0, 0, 0, 0.8)`,
  },
});

export default AuthModal;

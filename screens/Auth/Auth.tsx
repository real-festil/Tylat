/* eslint-disable no-nested-ternary */
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import React, { useState, useRef, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';
import { actions } from '../../store/store';
import { firebaseConfig, phoneNumberVerify, signIn } from '../../api';

const Auth = ({ onSignedIn }: { onSignedIn: () => void }) => {
  const [signInView, setSignInView] = useState(true);
  const [usernameView, setUsernameView] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const [phoneError, setPhoneError] = useState(null as any);
  const [codeError, setCodeError] = useState(null as any);
  const [user, setUser] = useState(null as any);

  const capthaRef = useRef(null as any);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      if (!user.displayName) {
        setUsernameView(true);
      } else {
        onSignedIn();
      }
    }
  }, [user]);

  const onSignIn = async ({ phone }: { phone: string }) => {
    setPhoneError(null);
    const res = await phoneNumberVerify(phone, capthaRef);
    if (res.message) {
      setPhoneError(res.message);
      return;
    }
    setVerificationId(res.verificationId);
    setSignInView(false);
  };

  const verifyCode = async ({ code }: { code: string }) => {
    setCodeError(null);
    const res = await signIn(verificationId!, code);
    if (res.message) {
      setCodeError(`Invalid code`);
      return;
    }
    await dispatch(actions.auth.setUser(res.user));
    const firebaseUser = await firebase.auth().currentUser;
    setUser(firebaseUser);
  };

  const setUsername = async ({ username }: { username: string }) => {
    await firebase.auth().currentUser?.updateProfile({ displayName: username });
    const updatedUser = await firebase.auth().currentUser;
    setUser(updatedUser);
    onSignedIn();
  };

  return (
    <Layout style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={capthaRef}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification
      />
      {signInView ? (
        <Form
          onSubmit={onSignIn}
          render={({ handleSubmit }) => (
            <Layout>
              <Text style={styles.title}>Sign In</Text>
              <Field name="phone">
                {({ input }) => (
                  <View style={styles.inputContainer}>
                    <Input
                      label="Phone"
                      placeholder="Enter your phone number"
                      status={phoneError ? `warning` : `basic`}
                      value={input.value}
                      onChange={input.onChange}
                      autoCompleteType="tel"
                      keyboardType="phone-pad"
                    />
                    {phoneError && (
                      <Text style={styles.errorText}>{phoneError!}</Text>
                    )}
                  </View>
                )}
              </Field>

              <Button style={styles.button} onPress={handleSubmit}>
                Sign in with phone number
              </Button>
            </Layout>
          )}
        />
      ) : usernameView ? (
        <Form
          onSubmit={setUsername}
          render={({ handleSubmit }) => (
            <Layout>
              <Text style={styles.title}>Set your name</Text>
              <Field name="username">
                {({ input }) => (
                  <View style={styles.inputContainer}>
                    <Input
                      label="Username"
                      placeholder="Enter your username"
                      value={input.value}
                      onChange={input.onChange}
                    />
                  </View>
                )}
              </Field>

              <Button style={styles.button} onPress={handleSubmit}>
                Set username
              </Button>
            </Layout>
          )}
        />
      ) : (
        <Form
          onSubmit={verifyCode}
          render={({ handleSubmit }) => (
            <Layout>
              <Field name="code">
                {({ input }) => (
                  <View style={styles.inputContainer}>
                    <Input
                      label="Verification code"
                      placeholder="Enter your verification code"
                      status={codeError ? `warning` : `basic`}
                      value={input.value}
                      onChange={input.onChange}
                      keyboardType="number-pad"
                    />
                    {codeError && (
                      <Text style={styles.errorText}>{codeError!}</Text>
                    )}
                  </View>
                )}
              </Field>
              <Button onPress={handleSubmit} style={styles.button}>
                Continue
              </Button>
              <Button
                style={{ ...styles.button, marginTop: 10 }}
                onPress={() => {
                  setCodeError(null);
                  setSignInView(true);
                }}
              >
                Back
              </Button>
            </Layout>
          )}
        />
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    flex: 1,
    justifyContent: `center`,
    alignItems: `center`,
  },
  button: {
    backgroundColor: `black`,
    marginTop: 25,
    borderColor: `black`,
    height: 10,
  },
  title: {
    textAlign: `center`,
    fontSize: 20,
  },
  errorText: {
    position: `absolute`,
    color: `red`,
    bottom: -16,
    fontSize: 12,
  },
  inputContainer: {
    position: `relative`,
  },
});

export default Auth;

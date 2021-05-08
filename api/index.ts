import firebase from 'firebase/app';

// Optionally import the services that you want to use
// import "firebase/auth";
// import "firebase/database";
// import "firebase/firestore";
// import "firebase/functions";
// import "firebase/storage";

// Initialize Firebase
export const firebaseConfig = {
  apiKey: `AIzaSyCxgmPceo0SmNT3IfS39W3lcJoEhAZMBi4`,
  authDomain: `tylat-eb835.firebaseapp.com`,
  databaseURL: `https://tylat-eb835.firebaseio.com`,
  projectId: `tylat-eb835`,
  storageBucket: `tylat-eb835.appspot.com`,
};

export const phoneNumberVerify = async (
  phoneNumber: string,
  appVerifier: any,
) => {
  try {
    const res = await firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier.current);
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
};

export const signIn = async (
  verificationId: string,
  verificationCode: string,
) => {
  const credential = firebase.auth.PhoneAuthProvider.credential(
    verificationId,
    verificationCode,
  );
  try {
    const res = await firebase.auth().signInWithCredential(credential);
    return res;
  } catch (error) {
    return error;
  }
};

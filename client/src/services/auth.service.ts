import {
  signInWithPopup,
  GoogleAuthProvider,
  linkWithCredential,
  FacebookAuthProvider,
} from 'firebase/auth';

import auth from '../configs/firebase';
import StoreRetrievePendingCred from '../utils/StoreRetrieveCred';

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

googleProvider.setCustomParameters({login_hint: 'user@example.com'});
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const pendingCred = StoreRetrievePendingCred.retrieve();

    const user = result.user;
    const accessToken = await result.user.getIdToken();

    if (pendingCred !== null) {
      await linkWithCredential(result.user, pendingCred).then(() => {
        StoreRetrievePendingCred.clear();
      });
    }

    return {accessToken, user};
  } catch (error) {
    const errorCode = error.code;
    const credential = GoogleAuthProvider.credentialFromError(error);

    if (errorCode === 'auth/account-exists-with-different-credential') {
      if (credential !== null) StoreRetrievePendingCred.store(credential);
    }

    return {errorCode};
  }
}

export async function signInWithFacebook() {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const pendingCred = StoreRetrievePendingCred.retrieve();

    const user = result.user;
    const accessToken = await result.user.getIdToken();

    if (pendingCred !== null) {
      await linkWithCredential(result.user, pendingCred).then(() => {
        StoreRetrievePendingCred.clear();
      });
    }

    return {accessToken, user};
  } catch (error) {
    const errorCode = error.code;
    const credential = FacebookAuthProvider.credentialFromError(error);

    if (errorCode === 'auth/account-exists-with-different-credential') {
      if (credential !== null) StoreRetrievePendingCred.store(credential);
    }

    return {errorCode};
  }
}

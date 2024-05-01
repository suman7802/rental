import {
  signInWithPopup,
  GoogleAuthProvider,
  linkWithCredential,
  FacebookAuthProvider,
} from 'firebase/auth';

import auth from '../configs/firebase';
import storeRetrievePendingCred from '../utils/storeRetrieveCred';

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

googleProvider.setCustomParameters({login_hint: 'user@example.com'});
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const pendingCred = storeRetrievePendingCred.retrieve();

    const user = result.user;
    const userIdToken = await result.user.getIdToken();

    console.log(user, userIdToken);

    if (pendingCred !== null) {
      await linkWithCredential(result.user, pendingCred).then(() => {
        storeRetrievePendingCred.clear();
      });
    }
  } catch (error) {
    const errorCode = error.code;
    const credential = GoogleAuthProvider.credentialFromError(error);

    if (errorCode === 'auth/account-exists-with-different-credential') {
      if (credential !== null) storeRetrievePendingCred.store(credential);
    }
  }
}

export async function signInWithFacebook() {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const pendingCred = storeRetrievePendingCred.retrieve();

    const user = result.user;
    const userIdToken = await result.user.getIdToken();


    console.log(user, userIdToken);

    if (pendingCred !== null) {
      await linkWithCredential(result.user, pendingCred).then(() => {
        storeRetrievePendingCred.clear();
      });
    }
  } catch (error) {
    const errorCode = error.code;
    const credential = FacebookAuthProvider.credentialFromError(error);

    if (errorCode === 'auth/account-exists-with-different-credential') {
      if (credential !== null) storeRetrievePendingCred.store(credential);
    }
  }
}

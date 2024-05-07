import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  linkWithCredential,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import auth from '../configs/firebase';
import StoreRetrievePendingCredential from '../utils/StoreRetrievePendingCredential';

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

googleProvider.setCustomParameters({login_hint: 'user@example.com'});
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const authentication = {
  signUp: async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential.user;
      })
      .catch((error) => {
        throw error;
      });
  },

  signIn: async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const pendingCred = StoreRetrievePendingCredential.retrieve();

        if (pendingCred)
          await linkWithCredential(userCredential.user, pendingCred);
        StoreRetrievePendingCredential.clear();

        return userCredential.user;
      })
      .catch((error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          const credential = GoogleAuthProvider.credentialFromError(error);
          StoreRetrievePendingCredential.store(credential);
        }

        if (error.code === 'auth/provider-already-linked')
          StoreRetrievePendingCredential.clear();

        throw error;
      });
  },

  resetPassword: async (email) => {
    return await sendPasswordResetEmail(auth, email)
      .then(() => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },

  signInWithGoogle: async () => {
    return await signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const pendingCred = StoreRetrievePendingCredential.retrieve();

        if (pendingCred) await linkWithCredential(result.user, pendingCred);
        StoreRetrievePendingCredential.clear();

        return {user: result.user};
      })
      .catch((error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          const credential = GoogleAuthProvider.credentialFromError(error);
          StoreRetrievePendingCredential.store(credential);
        }

        if (error.code === 'auth/provider-already-linked')
          StoreRetrievePendingCredential.clear();

        throw error;
      });
  },

  signInWithFacebook: async () => {
    await signInWithPopup(auth, facebookProvider)
      .then(async (result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);

        const pendingCred = StoreRetrievePendingCredential.retrieve();

        if (pendingCred) await linkWithCredential(result.user, pendingCred);
        StoreRetrievePendingCredential.clear();

        return {accessToken: credential.accessToken, user: result.user};
      })
      .catch((error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          const credential = FacebookAuthProvider.credentialFromError(error);
          StoreRetrievePendingCredential.store(credential);
        }

        if (error.code === 'auth/provider-already-linked')
          StoreRetrievePendingCredential.clear();

        throw error;
      });
  },

  signOut: async () => {
    await signOut(auth)
      .then(() => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },
};

export default authentication;

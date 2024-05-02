import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  linkWithCredential,
  FacebookAuthProvider,
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
      .then((userCredential) => {
        return userCredential.user;
      })
      .catch((error) => {
        throw error;
      });
  },

  signInWithGoogle: async () => {
    return await signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        const pendingCred = StoreRetrievePendingCredential.retrieve();
        if (pendingCred !== null) {
          await linkWithCredential(result.user, pendingCred).then(() => {
            StoreRetrievePendingCredential.clear();
            console.log('Link successful and pending credential cleared');
          });
        }

        return {credential, user: result.user};
      })
      .catch((error) => {
        throw error;
      });
  },

  signInWithFacebook: async () => {
    await signInWithPopup(auth, facebookProvider)
      .then(async (result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);

        const pendingCred = StoreRetrievePendingCredential.retrieve();
        if (pendingCred !== null) {
          await linkWithCredential(result.user, pendingCred).then(() => {
            StoreRetrievePendingCredential.clear();
            console.log('Link successful and pending credential cleared');
          });
        }

        return {accessToken: credential.accessToken, user: result.user};
      })
      .catch((error) => {
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

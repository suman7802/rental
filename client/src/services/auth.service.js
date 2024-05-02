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
// const facebookProvider = new FacebookAuthProvider();

googleProvider.setCustomParameters({login_hint: 'user@example.com'});
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const authentication = {
  signUp: async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential.user;
      })
      .catch((error) => {
        return error;
      });
  },

  signIn: async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential.user;
      })
      .catch((error) => {
        return error;
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
          });
        }

        return {credential, user: result.user};
      })
      .catch((error) => {
        return error;
      });
  },

  signInWithFacebook: async () => {
    return await signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);

        const pendingCred = StoreRetrievePendingCredential.retrieve();
        if (pendingCred !== null) {
          await linkWithCredential(result.user, pendingCred).then(() => {
            StoreRetrievePendingCredential.clear();
          });
        }

        return {accessToken: credential.accessToken, user: result.user};
      })
      .catch((error) => {
        return error;
      });
  },

  signOut: async () => {
    return await signOut(auth)
      .then(() => {
        return true;
      })
      .catch((error) => {
        return error;
      });
  },
};

export default authentication;

import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import auth from '../configs/firebase';

const provider = new GoogleAuthProvider();

provider.setCustomParameters({login_hint: 'user@example.com'});
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const authentication = {
  signup: async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential.user;
      })
      .catch((error) => {
        return error;
      });
  },

  signIn: async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential;
      })
      .catch((error) => {
        return error;
      });
  },

  signInWithGoogle: async () => {
    return await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        return {accessToken: credential?.accessToken, user: result.user};
      })
      .catch((error) => {
        return error;
      });
  },
};

export default authentication;

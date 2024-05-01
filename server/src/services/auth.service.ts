import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import {auth} from '../configs/firebase';

const provider = new GoogleAuthProvider();

provider.setCustomParameters({login_hint: 'user@example.com'});
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const authentication = {
  signup: async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  },

  signIn: async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  },

  signInWithGoogle: async () => {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    return {token: credential?.accessToken, user: result.user};
  },
};

export default authentication;

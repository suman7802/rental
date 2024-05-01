import {AuthCredential, GoogleAuthProvider} from 'firebase/auth';

const storeRetrievePendingCred = {
  store: (pendingCred: AuthCredential) => {
    localStorage.setItem('pendingCred', JSON.stringify(pendingCred));
  },

  retrieve: () => {
    return GoogleAuthProvider.credential(
      JSON.parse(localStorage.getItem('pendingCred') as string)
    );
  },

  clear: () => {
    localStorage.removeItem('pendingCred');
  },
};

export default storeRetrievePendingCred;

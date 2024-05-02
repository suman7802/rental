import {GoogleAuthProvider} from 'firebase/auth';

const StoreRetrievePendingCredential = {
  store: (pendingCred) => {
    localStorage.setItem('pendingCred', JSON.stringify(pendingCred));
  },

  retrieve: () => {
    return GoogleAuthProvider.credential(
      JSON.parse(localStorage.getItem('pendingCred'))
    );
  },

  clear: () => {
    localStorage.removeItem('pendingCred');
  },
};

export default StoreRetrievePendingCredential;

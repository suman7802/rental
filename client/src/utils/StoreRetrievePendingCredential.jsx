import {GoogleAuthProvider} from 'firebase/auth';

const StoreRetrievePendingCredential = {
  store: (pendingCred) => {
    localStorage.setItem('pendingCredential', JSON.stringify(pendingCred));
  },

  retrieve: () => {
    return GoogleAuthProvider.credential(
      JSON.parse(localStorage.getItem('pendingCredential'))
    );
  },

  clear: () => {
    localStorage.removeItem('pendingCredential');
  },
};

export default StoreRetrievePendingCredential;

import {GoogleAuthProvider} from 'firebase/auth';

const StoreRetrievePendingCredential = {
  store: (pendingCred) => {
    localStorage.setItem('pendingCredential', JSON.stringify(pendingCred));
  },

  retrieve: () => {
    const storedCred = JSON.parse(localStorage.getItem('pendingCredential'));

    if (!storedCred) return null;

    return GoogleAuthProvider.credential(
      storedCred.idToken,
      storedCred.accessToken
    );
  },

  clear: () => {
    localStorage.removeItem('pendingCredential');
  },
};

export default StoreRetrievePendingCredential;

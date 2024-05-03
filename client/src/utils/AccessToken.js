const AccessTokenName = 'RentalAccessToken';

const AccessToken = {
  store: (AccessToken) => {
    localStorage.setItem(AccessTokenName, JSON.stringify(AccessToken));
  },

  retrieve: () => {
    return JSON.parse(localStorage.getItem(AccessTokenName));
  },

  clear: () => {
    localStorage.removeItem(AccessTokenName);
  },
};

export default AccessToken;

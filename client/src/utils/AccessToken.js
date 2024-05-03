const AccessTokenName = 'RentalAccessToken';

const AccessToken = {
  store: (AccessToken) => {
    localStorage.setItem(AccessTokenName, JSON.stringify(AccessToken));
  },

  retrieve: () => {
    const AccessToken = localStorage.getItem(AccessTokenName);
    if (!AccessToken) return null;
    return JSON.parse(AccessToken);
  },

  clear: () => {
    localStorage.removeItem(AccessTokenName);
  },
};

export default AccessToken;

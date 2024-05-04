const TokenName = 'Rental';

const Token = {
  store: (idToken, refreshToken) => {
    if(idToken)
    localStorage.setItem(`${TokenName}IdToken`, JSON.stringify(idToken));
    if(refreshToken)
    document.cookie = `${TokenName}RefreshToken=${JSON.stringify(refreshToken)}; path=/`;
  },
  
  retrieveIdToken: () => {
    const idToken = localStorage.getItem(`${TokenName}IdToken`);
    return idToken ? JSON.parse(idToken) : null;
  },

  retrieveRefreshToken: () => {
    const cookies = document.cookie.split('; ');
    const refreshTokenCookie = cookies.find((cookie) =>
      cookie.startsWith(`${TokenName}RefreshToken`)
    );
    return refreshTokenCookie ? JSON.parse(refreshTokenCookie.split('=')[1]) : null;
  },

  clear: () => {
    localStorage.removeItem(`${TokenName}IdToken`);
    document.cookie = `${TokenName}RefreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  },
};

export default Token;
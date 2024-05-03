const refreshTokenName = 'RentalRefreshToken';

const RefreshToken = {
  store: (refreshToken) => {
    document.cookie = `${refreshTokenName}=${JSON.stringify(refreshToken)}; path=/`;
  },
  retrieve: () => {
    const cookies = document.cookie.split('; ');
    const refreshTokenCookie = cookies.find(cookie => cookie.startsWith(refreshTokenName));
    return refreshTokenCookie ? JSON.parse(refreshTokenCookie.split('=')[1]) : null;
  },
  clear: () => {
    document.cookie = `${refreshTokenName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  },
};

export default RefreshToken;
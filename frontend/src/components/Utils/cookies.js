// utils/cookies.js

// Function to set a cookie
export const setCookie = (name, value, options = {}) => {
    const {
      maxAge = 365 * 24 * 60 * 60, // Default to 1 year
      path = '/',
      domain = window.location.hostname,
      secure = window.location.protocol === 'https:',
    } = options;
  
    const expires = new Date(Date.now() + maxAge * 1000).toUTCString();
  
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=${path}; domain=${domain}; secure=${secure}`;
  };
  
  // Function to get a cookie by name
  export const getCookie = (name) => {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  };
  
  // Function to remove a cookie by name
  export const removeCookie = (name) => {
    setCookie(name, '', { maxAge: -1 });
  };
  
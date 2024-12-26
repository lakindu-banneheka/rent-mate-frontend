export const auth0Config = {
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    routes: {
      callback: '/api/auth/callback',
      login: '/api/auth/login',
      logout: '/api/auth/logout'
    }
};
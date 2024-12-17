// utils/auth-config.ts
export const getAuthConfig = () => ({
    secret: process.env.AUTH0_SECRET,
    baseURL: 
      process.env.NODE_ENV === 'production'
        ? process.env.AUTH0_BASE_URL
        : 'http://localhost:3000',
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
});
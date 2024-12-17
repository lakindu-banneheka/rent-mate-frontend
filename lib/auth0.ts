// lib/auth0.ts

export const authOptions = {
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  session: {
    // Ensure cookies work across different domains
    cookie: {
      domain: process.env.NODE_ENV === 'production' 
        ? '.vercel.app' // or your custom domain
        : 'localhost',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production', // Only use secure in production
      httpOnly: true,
    }
  },
};
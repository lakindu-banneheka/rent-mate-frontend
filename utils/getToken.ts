'use server'
import { getSession } from '@auth0/nextjs-auth0';

let cachedToken: string | null = null;

export const getToken = async (): Promise<string | null> => {
  if (cachedToken) return cachedToken;

  try {
    const session = await getSession();
    console.log('Session:', session);
    if (session?.accessToken) {
      cachedToken = session.accessToken; // Cache the token for reuse
      return cachedToken;
    }
  } catch (error) {
    console.error('Error retrieving session token:', error);
    return null;
  }
  return null;
};
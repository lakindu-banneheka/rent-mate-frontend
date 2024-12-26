import axios, { AxiosResponse } from 'axios';

interface Auth0TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

const getAuth0Token = async (): Promise<Auth0TokenResponse> => {
  const YOUR_TENANT = process.env.AUTH0_ISSUER_BASE_URL!; // Replace with your Auth0 tenant
  const YOUR_CLIENT_ID = process.env.AUTH0_CLIENT_ID!; // Replace with your Client ID
  const YOUR_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET!; // Replace with your Client Secret
  const YOUR_API_IDENTIFIER = process.env.AUTH0_AUDIENCE!; // Replace with your API Identifier

  console.log(YOUR_TENANT, YOUR_CLIENT_ID, YOUR_CLIENT_SECRET, YOUR_API_IDENTIFIER);
  const url = `${YOUR_TENANT}/oauth/token`;
  const data = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: YOUR_CLIENT_ID,
    client_secret: YOUR_CLIENT_SECRET,
    audience: YOUR_API_IDENTIFIER,
  });

  try {
    const response: AxiosResponse<Auth0TokenResponse> = await axios.post(url, data.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log('Auth0 token:', response.data);
    return response.data; // Contains access_token, token_type, and expires_in
  } catch (error) {
    console.error('Error fetching Auth0 token:', error);
    throw error;
  }
};

export default getAuth0Token;

First, make the .env.local and add
``` 
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL=
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
```

Then, you can get a view like this,
![image](https://github.com/user-attachments/assets/54993303-d32b-4cbb-8250-b333458779f9)

After clicking the login button you can get the auth0 login page and after logging in,
![image](https://github.com/user-attachments/assets/687b8e8e-732e-43ad-badb-a1901039d56f)

If you try to access an unauthorized page it will redirect to,
![image](https://github.com/user-attachments/assets/e7d7fe3f-ceea-4100-a7ce-09c0c90dd16f)

Logged in page
![image](https://github.com/user-attachments/assets/106acb07-176c-4eec-b391-40ad5abd389c)

If user has admin access,
![image](https://github.com/user-attachments/assets/f5c9b16b-546c-42ac-8f9c-c524376b660f)

If user has Lender access,
![image](https://github.com/user-attachments/assets/31d7971b-c950-44f7-8a1b-d642f2868e61)

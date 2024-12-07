# Authentication with Auth0  

This project demonstrates a seamless authentication flow using **Auth0**, including role-based access control for users such as **Admin** and **Lender**. Follow the steps below to configure and run the application successfully.  

---

## 🔧 **Setup**  

### 1. Configure `.env.local`  
Create a `.env.local` file in the root directory of your project and add the following environment variables:  

```bash  
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32-byte value'  
AUTH0_BASE_URL='http://localhost:3000' # Replace with your application's base URL  
AUTH0_ISSUER_BASE_URL='https://<your-auth0-domain>.auth0.com'  
AUTH0_CLIENT_ID='<your-auth0-client-id>'  
AUTH0_CLIENT_SECRET='<your-auth0-client-secret>'  
```  

### 2. Install Dependencies  
Install the required dependencies:  

```bash  
npm install  
```  

### 3. Start the Development Server  
Run the application:  

```bash  
npm run dev  
```  

---

## 🌟 **Features Overview**  

### **Login Page**  
Click the **Login** button to be redirected to the Auth0 login page.  

![Login Page](https://github.com/user-attachments/assets/54993303-d32b-4cbb-8250-b333458779f9)  

### **Auth0 Login Page**  
Log in using your Auth0 credentials.  

![Auth0 Login Page](https://github.com/user-attachments/assets/687b8e8e-732e-43ad-badb-a1901039d56f)  

### **Unauthorized Access**  
If you attempt to access a page without proper authorization, you will be redirected to the following page:  

![Unauthorized Page](https://github.com/user-attachments/assets/e7d7fe3f-ceea-4100-a7ce-09c0c90dd16f)  

### **Logged-In Page**  
After successful login, you'll land on the **Logged-In Page**, where user-specific information will be displayed.  

![Logged-In Page](https://github.com/user-attachments/assets/106acb07-176c-4eec-b391-40ad5abd389c)  

---

## 🔒 **Role-Based Access Control**  

### **Admin Access**  
Users with **Admin** roles will see:  

![Admin View](https://github.com/user-attachments/assets/f5c9b16b-546c-42ac-8f9c-c524376b660f)  

### **Lender Access**  
Users with **Lender** roles will see:  

![Lender View](https://github.com/user-attachments/assets/31d7971b-c950-44f7-8a1b-d642f2868e61)  

---

## 📚 **Tech Stack**  

- **Frontend**: React, Next.js  
- **Authentication**: Auth0  
- **Environment Variables**: `.env.local` for secure configuration  

--- 

## ✨ **Acknowledgments**  

Special thanks to the **Auth0** team for their robust authentication solutions.  

---  

Let me know if you’d like additional sections or improvements! 🚀

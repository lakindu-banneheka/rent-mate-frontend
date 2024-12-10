# Project Development Progress - Init Branch

## Tech Stack
- **Authentication**: Auth0
- **UI Components**: Shadcn/UI
- **Styling**: Tailwind CSS

## Authentication System
### Role-Based Authentication with Auth0
- Implemented Auth0 for secure, scalable authentication
- Developed role-based access control
- Resolved initial authentication-related challenges

## Navigation Components

### Sidebar Implementation
#### Admin Sidebar
![Admin Sidebar](https://github.com/user-attachments/assets/f0c9c079-25a8-4138-9a0e-5acdd0548a9a)
![Sidebar_User_Dropdown_Menu](https://github.com/user-attachments/assets/4939bb58-d677-4b77-b360-d96dc6c27986)

#### Lender Sidebar
![Lender_Sidebar](https://github.com/user-attachments/assets/d6699220-af66-4bfb-8dc2-c5f1dbc39f31)

### Dynamic Navigation Features
- Navigation driven by external variables
- Role-based sidebar content rendering
- Modular and configurable navigation structure

#### Navigation Code Structure
![Authentication Code Snippet](https://github.com/user-attachments/assets/656d3d9a-0052-4796-b446-5280017d96b3)

#### Navigation Code Snippet (for dynamic rendering)
![Navigation Component](https://github.com/user-attachments/assets/de7747f5-40d9-45cc-980a-ed41c46989d3)

## Component Architecture
- Modular component design
- Improved code readability
- Flexible data-passing mechanism

## Footer Component
### Footer Design Evolution
| Initial Design | Final Design |
|---------------|--------------|
| ![Initial Footer](https://github.com/user-attachments/assets/7a03c063-17c3-47c8-92ab-b712e0bf5213) | ![Final Footer](https://github.com/user-attachments/assets/9d9e39b3-2a9c-40aa-93c3-d3f274aec3d3) |

#### Footer Code Structure
![Footer Component](https://github.com/user-attachments/assets/60ca8cb1-d7f7-491a-b54e-d523dc753814)

## User Header (Client Interface)
### Initial Header Implementation
| Header Design 1 | Header Design 2 | Header Design 3 |
|----------------|----------------|----------------|
| ![Header 1](https://github.com/user-attachments/assets/f9360b21-61a7-4227-b24a-c110295d2762) | ![Header 2](https://github.com/user-attachments/assets/ef9ec639-01ee-41d0-9944-711addcaadc3) | ![Header 3](https://github.com/user-attachments/assets/b577d546-6148-456a-b699-2665cbac004f) |

---
# Routing and Layouts

This documentation provides an overview of routing and layout management in a Next.js 14 project, focusing on implementing distinct layouts for guest, protected, admin, and lender routes.  

## Overview  

Next.js 14 introduces powerful routing features, allowing developers to easily define layouts for different sections of their application. This project uses layouts to manage route-specific structures, such as:  

- **Guest Layout**: For unauthenticated users (e.g., login, signup).  
- **Protected Layout**: For authenticated users, with session validation and redirection logic.  
- **Admin Layout**: For admin-specific functionalities.  
- **Lender Layout**: For lender-specific pages.  

## Directory Structure  

Below is the routing structure used in the project:  

```  
app/  
├── gest/                 # Guest-specific routes  
│   ├── layout.tsx        # Gest_layout (e.g., login, signup)  
│   └── page.tsx          # Guest pages  
├── protected/            # Protected routes  
│   ├── layout.tsx        # Protected_layout  
│   └── page.tsx          # Authenticated user pages  
├── admin/                # Admin routes  
│   ├── layout.tsx        # Admin_layout  
│   └── page.tsx          # Admin-specific pages  
├── lender/               # Lender routes  
│   ├── layout.tsx        # Lender_layout  
│   └── page.tsx          # Lender-specific pages  
└── ...  
```
## Layout Code Snippets
### Guest Layout (gest/layout.tsx)
Defines the base layout for guest routes, such as login and signup pages.
```
import React from "react";  

export default function GestLayout({ children }: { children: React.ReactNode }) {  
  return (  
    <div className="guest-container">  
      <header>Welcome to the App</header>  
      <main>{children}</main>  
      <footer>© 2024 AppName</footer>  
    </div>  
  );  
}  
```
### Protected Layout (protected/layout.tsx)
Checks the session and redirects users if authentication is not valid.
```
import { useSession } from "next-auth/react";  
import { useRouter } from "next/router";  
import React, { useEffect } from "react";  

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {  
  const { data: session, status } = useSession();  
  const router = useRouter();  

  useEffect(() => {  
    if (status === "unauthenticated") {  
      router.push("/gest/login");  
    }  
  }, [status, router]);  

  if (status === "loading") {  
    return <div>Loading...</div>;  
  }  

  return (  
    <div className="protected-container">  
      <nav>Protected Navigation</nav>  
      <main>{children}</main>  
    </div>  
  );  
}  
```
## Key Features
### Guest Routes (gest/)
Contains routes for unauthenticated users (e.g., /gest/login, /gest/register).
Uses Gest_layout to define consistent UI.

### Protected Routes (protected/)
Ensures only authenticated users can access routes (e.g., /protected/dashboard).
Redirects unauthenticated users to the login page.

### Admin Routes (admin/)
Reserved for admin-specific functionalities (e.g., /admin/settings).

### Lender Routes (lender/)
Tailored for lender-specific use cases (e.g., /lender/overview).

---
## Key Technical Decisions

### Authentication
- Utilized Auth0 for secure authentication
- Implemented role-based access control
- Flexible user management

### UI Components
- Leveraged Shadcn/UI for pre-built, customizable components
- Ensured consistent design language
- Rapid UI development

### Styling
- Used Tailwind CSS for utility-first styling
- Enabled quick and consistent design implementation
- Responsive and mobile-friendly approach

## Future Improvements
- Refine user header design
- Enhance authentication flows
- Optimize navigation components
- Implement more granular role-based access control

## Development Approach
- Modular and component-based architecture
- Dynamic data rendering
- Focus on code readability and maintainability
- Scalable and flexible design

## Routes and Layout Approach
- This implementation separates concerns by leveraging layouts to manage UI and authentication flow across different route categories.
- Use guest layouts for public-facing routes.
- Use protected layouts to enforce session validation and access control.
- Define layouts for admin and lender routes to ensure modular and maintainable code.

---

**Note:** This documentation reflects the current state of the project in the init branch and will be updated as development progresses.

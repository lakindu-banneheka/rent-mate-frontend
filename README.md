# Test CRUD - Next.js + Redux Toolkit + Axios + Spring Boot

This project demonstrates a simple CRUD (Create, Read, Update, Delete) functionality using Next.js 14, Redux Toolkit for state management, Axios for data fetching, and a Spring Boot backend. The project aims to showcase how to integrate front-end and back-end systems efficiently and handle common issues like CORS during development.

**Key Technologies Used:**
- **Next.js 14**: React-based framework for building server-side rendered (SSR) applications.
- **Redux Toolkit**: State management for the front-end.
- **Axios**: HTTP client for making requests to the Spring Boot backend.
- **Spring Boot**: Back-end framework for REST API and data handling.


## Features

- **Create**: Add new data entries to the database.
- **Read**: Fetch and display data from the backend.
- **Update**: Modify existing data entries.
- **Delete**: Remove data entries from the backend.
- **Cross-Origin Resource Sharing (CORS)**: Handled between Next.js frontend and Spring Boot backend to ensure seamless data exchange.


###  CORS Issue & Solution

Explain the problem you faced with CORS and how you solved it.

```markdown
## CORS Issue & Solution

During development, we faced a CORS (Cross-Origin Resource Sharing) issue when trying to fetch data from the Spring Boot backend in the Next.js frontend. The frontend (running on `localhost:3000`) was unable to make requests to the backend (running on `localhost:8080`) due to security restrictions enforced by the browser.

### Solution

To resolve this issue, we modified the Spring Boot backend to allow cross-origin requests. This was done by adding a `@CrossOrigin` annotation in the Spring Boot controller, as shown below:

```java
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class YourController {
    // CRUD methods
}
```

This allows the frontend to make requests to the backend without CORS restrictions.

Alternatively, for a global CORS configuration, you can define it in the WebConfig class:
```
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**").allowedOrigins("http://localhost:3000");
    }
}
```


### Data Fetching with Axios

Describe how Axios is used to fetch data from the backend in your project. Mention how Redux Toolkit is used to manage the fetched data in the store.

```markdown
## Data Fetching with Axios

We use Axios to fetch data from the Spring Boot backend. The following code demonstrates how we create an Axios instance and send a GET request to fetch data.

```ts
export const itemService = {
  // Create Item
  async createItem(item: Omit<Item, 'id'>): Promise<Item> {
    try {
      const response = await axios.post(BASE_PATH, item);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  // Fetch Items with Pagination and Search
  async fetchItems(
    page = 0, 
    size = 10, 
    sortBy = 'name',
    searchTerm = ''
  ): Promise<{
    content: Item[];
    totalPages: number;
    totalElements: number;
  }> {
    try {
      const response = await axios.get(BASE_PATH, {
        params: {
          page,
          size,
          sort: sortBy,
          search: searchTerm
        }
      });
      console.log(response.data, 'get all');
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },
}
```

And for error handling,

```ts
import axios from "axios";

export function handleError(error: any): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response.data.message || 
             error.response.data.error || 
             'An error occurred while processing your request';
    } else if (error.request) {
      return 'No response received from server';
    } else {
      return 'Error setting up the request';
    }
  }
  return 'An unexpected error occurred';
}
```

```ts
// redux/features/dataSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await axiosInstance.get('/data');
  return response.data;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
```

This Redux slice handles the data fetching state and stores the fetched data. (above code is just a sample)



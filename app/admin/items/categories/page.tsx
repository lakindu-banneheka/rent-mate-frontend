'use client'
import { fetchCategories } from '@/lib/features/categorySlice';

import { RootState, AppDispatch } from '@/lib/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const CategoryPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.category.categories);
    const isCategoryLoading = useSelector((state: RootState) => state.category.loading);
    const error = useSelector((state: RootState) => state.category.error);

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);


    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
      const fetchToken = async () => {
        try {
          const response = await fetch('/api/auth0-token');
          const data = await response.json();
          setToken(data.access_token);
        } catch (error) {
          console.error('Error fetching token:', error);
        }
      };
  
      fetchToken();
    }, []);

    return (
        <div>
            <h1>Categories</h1>
            {categories.map((category) => (
                <div key={category.id}>
                    <h2>{category.name}</h2>
                    <p>{category.description}</p>
                </div>
            ))    
            }
        </div>
    );
};

export default CategoryPage;
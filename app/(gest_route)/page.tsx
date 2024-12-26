'use client'
import ProfileClient from "@/components/auth/ProfileClient";
import { createCategory, fetchCategories, fetchCategoryById, updateCategory } from "@/lib/features/categorySlice";
import { AppDispatch, RootState } from "@/lib/store";
import { authLinks } from "@/utils/auth";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const session = useUser();

  //  ------------------- Category -------------------
  // const dispatch: AppDispatch = useDispatch();
  // const categories = useSelector((state: RootState) => state.category.categories);
  // const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory);
  // const isCategoryLoading = useSelector((state: RootState) => state.category.loading);
  // const error = useSelector((state: RootState) => state.category.error);

  // useEffect(() => {
  //   dispatch(fetchCategories());
  // }, []);

  // console.log(categories);
  // console.log(selectedCategory);
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Auth0 Role Based User Management Demo App
          </h1>
          <nav className="flex flex-wrap gap-4 mb-8">
            {!session.user ? (
              <Link 
                href={authLinks.login}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Login
              </Link>
            ) : (
              <Link 
                href={authLinks.logout}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Logout
              </Link>
            )}
            <Link
              href="/admin"
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Admin Page (Only admins can access this)
            </Link>
            <Link
              href="/lender"
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Lender Page (Only lenders can access this)
            </Link>
            <Link
              href="/logged-in"
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Logged In Page
            </Link>
          </nav>

          {session ? (
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Profile Information
              </h2>
              <ProfileClient />
            </div>
          ) : (
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Please login to see your profile information
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

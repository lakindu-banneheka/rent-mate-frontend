'use client'

import { redirect } from "next/navigation";
import { useEffect } from "react";


function LenderPage() {

  useEffect(() => {
    redirect("/lender/items");
  },[]);

  return (
    // <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    //   <div className="max-w-4xl mx-auto">
    //     <div className="bg-white shadow rounded-lg p-6">
    //       <h1 className="text-3xl font-bold text-gray-900 mb-6">
    //         Lender Dashboard
    //       </h1>
    //       <p className="text-gray-600 mb-4">
    //         Welcome to the lender area. This page is only accessible to
    //         administrators.
    //       </p>
    //       <div className="border-t border-gray-200 pt-4">
    //         <h2 className="text-xl font-semibold text-gray-800 mb-3">
    //           Lender Controls
    //         </h2>
    //         <p className="text-gray-600">
    //           Lender functionality will be added here.
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <></>
  );
}

export default LenderPage;

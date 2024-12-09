'use client'
import { isUserAdmin } from "@/actions/isUserAdmin";
import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/footer";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { redirect } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import Loading from "../loading";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import { UserRoles } from "@/types/userTypes";


interface Props {
    children: ReactNode;
}

export default function AdminLayout ({ children }: Props) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // Track admin status

  useEffect(() => {
    const checkAdminStatus = async () => {
      const adminStatus = await isUserAdmin(); // Check if user is admin
      setIsAdmin(adminStatus); // Update the state with the result
    };

    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (isAdmin === false) {
      // Redirect only after the admin status has been determined
      redirect("/unauthorized");
    }
  }, [isAdmin]); // Run the effect when isAdmin state changes

  if (isAdmin === null) {
    return <Loading />
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar 
          userRole={UserRoles.Admin}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4 fixed bg-sidebar w-full py-5"> {/* fixed - change the header fixed option */}
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4 bg-sidebar" />
              <DynamicBreadcrumb />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-0 p-0 pt-0">
            {children}
            <>
              <Footer />
            </>
          </div>
        </SidebarInset>
      </SidebarProvider>       
    </>
  );
} 
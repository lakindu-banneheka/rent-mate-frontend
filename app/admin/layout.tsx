'use client'
import { isUserAdmin } from "@/actions/isUserAdmin";
import { AppSidebar } from "@/components/side-bar/app-sidebar";
import Footer from "@/components/footer/footer";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import Loading from "../loading";
import { UserRoles } from "@/types/userTypes";
import SideBarHeader from "@/components/side-bar/side-bar-header";

interface Props {
    children: ReactNode;
}

export default function AdminLayout ({ children }: Props) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // Track admin status

  useEffect(() => {
    const checkAdminStatus = async () => {
      const adminStatus = await isUserAdmin(); 
      setIsAdmin(adminStatus); 
    };

    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (isAdmin === false) {
      redirect("/unauthorized");
    }
  }, [isAdmin]);

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
          <SideBarHeader />
          <div className="flex flex-1 flex-col gap-0 p-0">
            <div className="pb-20 bg-background" >
              {children}
            </div>
            <>
              <Footer />
            </>
          </div>
        </SidebarInset>
      </SidebarProvider>       
    </>
  );
} 
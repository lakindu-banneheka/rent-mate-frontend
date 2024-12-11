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
import { ThemeToggle } from "@/components/theme/theme-toggle";


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
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-background border-b">
      <div className="flex items-center justify-between gap-2 px-4 w-full py-5">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <DynamicBreadcrumb />
        </div>
        <ThemeToggle />
      </div>
    </header>
          <div className="flex flex-1 flex-col gap-0 p-0">
            <div className="pb-20 mx-5 bg-background" >
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
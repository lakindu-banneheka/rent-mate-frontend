'use client'
import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/footer";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { redirect } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import Loading from "../loading";
import { isUserLender } from "@/actions/isUserLender";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import { UserRoles } from "@/types/userTypes";


interface Props {
    children: ReactNode;
}

export default function LenderLayout ({ children }: Props) {
  const [isLender, setIsLender] = useState<boolean | null>(null); 

  useEffect(() => {
    const checkLenderStatus = async () => {
      const lenderStatus = await isUserLender(); 
      setIsLender(lenderStatus); 
    };

    checkLenderStatus();
  }, []);

  useEffect(() => {
    if (isLender === false) {
      redirect("/unauthorized");
    }
  }, [isLender]); 

  if (isLender === null) {
    return <Loading />
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar 
          userRole={UserRoles.Lender}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4 fixed bg-sidebar w-full py-5">
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
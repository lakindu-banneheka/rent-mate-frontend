'use client'
import { AppSidebar } from "@/components/side-bar/app-sidebar";
import Footer from "@/components/footer/footer";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { redirect } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import Loading from "../loading";
import { isUserLender } from "@/actions/isUserLender";
import DynamicBreadcrumb from "@/components/side-bar/dynamic-breadcrumb";
import { UserRoles } from "@/types/userTypes";
import SideBarHeader from "@/components/side-bar/side-bar-header";


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
          <SideBarHeader />
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
import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/footer";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import React, { ReactNode } from "react";


interface Props {
    children: ReactNode;
}

export default async function AdminLayout ({ children }: Props) {
    
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4 fixed bg-sidebar w-full py-5">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4 bg-sidebar" />
              {/* <DynamicBreadcrumb /> */}
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-0 pt-0">
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
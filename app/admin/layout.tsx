import { isUserAdmin } from "@/actions/isUserAdmin";
import { AppSidebar } from "@/components/app-sidebar";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import Footer from "@/components/footer";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";


interface Props {
    children: ReactNode;
}

export default async function AdminLayout ({ children }: Props) {
  const isAdmin = await isUserAdmin();

  if (!isAdmin) {
    return redirect("/api/auth/login");
  }
    
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4 fixed bg-sidebar w-full py-5">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4 bg-sidebar" />
              <DynamicBreadcrumb />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-0 pt-0">
            {children}
            {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
            <Footer />
          </div>
        </SidebarInset>
      </SidebarProvider>       
    </>
  );
} 
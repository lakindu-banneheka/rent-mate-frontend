import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import DynamicBreadcrumb from "./dynamic-breadcrumb";
import { ThemeToggle } from "../theme/theme-toggle";

const SideBarHeader = () =>{

    return(
        <>
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
        </>
    );
}

export default SideBarHeader;
"use client"
import logo from '@/images/logo.png';
import * as React from "react"
import { NavMain } from "@/components/side-bar/nav-main"
import { NavUser } from "@/components/side-bar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useUser } from "@auth0/nextjs-auth0/client"
import { adminNav, lenderNav, user } from "@/data/navigation"
import { UserRoles } from "@/types/userTypes"
import Image from "next/image"

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  userRole: UserRoles; 
};

export function AppSidebar({ userRole, ...props }: AppSidebarProps) {

  const session = useUser();

  Object.assign(user, {
    name: session.user?.name ?? "",
    email: session.user?.email ?? "",
    avatar: session.user?.picture ?? "",
  });

  const mainNav = (userRole === UserRoles.Admin)?adminNav:(userRole === UserRoles.Lender?lenderNav:[]);
  const pannelName = (userRole === UserRoles.Admin)?'Admin Panel':(userRole === UserRoles.Lender?'Lender Panel':'');

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          // onClick={() => redirect('/admin')}
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Image
            src={logo}
            alt="Logo"
            // width={10} 
            // height={10} 
            className='w-full h-full rounded-lg'
          />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {`Rent Mate`}
            </span>
            <span className="truncate text-xs">{pannelName}</span>
          </div>
          {/* <ChevronsUpDown className="ml-auto" /> */}
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNav} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

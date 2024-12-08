import { isUserAdmin } from "@/actions/isUserAdmin";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import { ReactNode } from "react";


interface Props {
    children: ReactNode;
}

export default async function GestLayout ({ children }: Props) {
    const session = getSession();
    const isAdmin = await isUserAdmin();

    if (!isAdmin) {
        return redirect("/api/auth/login");
      }


    return (
      <>
        <div className="flex h-screen w-full min-w-[480px]">
          <div className="hidden md:block h-full">

          </div>
          <div className="w-full px-10 py-5" >
            {children}
          </div>
        </div>
      </>
    );
} 
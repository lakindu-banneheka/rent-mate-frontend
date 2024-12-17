'use client'
import Footer from "@/components/footer/footer";
import Header from "@/components/Header/header"
import { useUser } from "@auth0/nextjs-auth0/client";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

interface Props {
    children: ReactNode;
}


const ProtectedLayout = ({ children }: Props) => {
    const session = useUser();
  
    if (!session.user) {
      redirect("/unauthorized");
    }

    return (
        <>
            <Header />
            <>
                {children}
            </>
            <Footer />
        </>
    )
}

export default ProtectedLayout;
"use client";
import Footer from "@/components/footer/footer";
import Header from "@/components/Header/header";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ReactNode, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { getDBUser } from "@/utils/user";

interface Props {
  children: ReactNode;
}

const ProtectedLayout = ({ children }: Props) => {
  const session = useUser();

  if (!session.user) {
    redirect("/unauthorized");
  }

  useEffect(() => {
    const fetchDBUser = async () => {
      if (session.user) {
        try {
          const dbUser = await getDBUser({
            email: session.user.email,
            firstName: session.user.name?.split(" ")[0],
          });
          // Save user ID and user in local storage
          localStorage.setItem("userId", dbUser.id);
          localStorage.setItem("user", JSON.stringify(dbUser));
        } catch (error) {
          console.error("Error fetching DB user:", error);
        }
      }
    };

    fetchDBUser();
  }, [session]);

  useEffect(() => {
    if (!session) {
      localStorage.removeItem("userId");
      localStorage.removeItem("user");
    }
  }, [session]);

  return (
    <>
      <Header />
      <>{children}</>
      <Footer />
    </>
  );
};

export default ProtectedLayout;

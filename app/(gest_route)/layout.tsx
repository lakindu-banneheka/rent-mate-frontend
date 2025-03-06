"use client";
import DialogflowChatbot from "@/components/chatbot/DialogflowChatbot";
import Footer from "@/components/footer/footer";
import Header from "@/components/Header/header";
import { getDBUser } from "@/utils/user";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

const GestLayout = ({ children }: Props) => {
  const session = useUser();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchDBUser = async () => {
      if (session.user) {
        try {
          const dbUser = await getDBUser({
            email: session.user.email,
            firstName: session.user.name?.split(" ")[0],
          });
          setUser(dbUser);
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
      <DialogflowChatbot />
      <Footer />
    </>
  );
};

export default GestLayout;

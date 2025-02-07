'use client'
import DialogflowChatbot from "@/components/chatbot/DialogflowChatbot";
import Footer from "@/components/footer/footer";
import Header from "@/components/Header/header"
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}


const GestLayout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <>
                {children}
            </>
            <DialogflowChatbot />
            <Footer />
        </>
    )
}

export default GestLayout;
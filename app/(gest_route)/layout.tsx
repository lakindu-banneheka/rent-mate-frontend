'use client'
import Footer from "@/components/footer";
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
            <Footer />
        </>
    )
}

export default GestLayout;
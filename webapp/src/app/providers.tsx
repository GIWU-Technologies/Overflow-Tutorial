'use client';

import { ThemeProvider } from "next-themes";
import {ToastProvider} from "@heroui/react";
import {useTagStore} from "@/lib/useTagStore";
import {useEffect} from "react";
import {getTags} from "@/lib/actions/tag-actions";


export function Providers({children}: {children: React.ReactNode}) {
    const setTags = useTagStore(state => state.setTags);
    
    useEffect(() => {
        const loadTags = async () => {
            const {data: tags} = await getTags();
            if (tags) setTags(tags);
        }
        void loadTags();
    },[setTags]);
    
    return (
        <>
            <ToastProvider />
            <ThemeProvider attribute="class" defaultTheme="light">
                {children}
            </ThemeProvider>
        </>
    );
}
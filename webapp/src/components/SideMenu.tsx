'use client';
import React, {useEffect, useState} from "react";
import {HomeIcon, TagIcon, UserIcon, QuestionMarkCircleIcon} from "@heroicons/react/24/solid";
import {ListBox, ListBoxItem} from "@heroui/react";
import {usePathname, useRouter} from "next/navigation";



export default function SideMenu() {
    const router = useRouter();
    const pathname = usePathname();
    
    const [activeLink, setActiveLink] = useState('/');
    //let linkColor = 'text-black';
    
    // useEffect(() => {
    //     setActiveLink(pathname);
    // }, [pathname]);
    
    
    const navLinks = [
        { key: 'home', icon: HomeIcon, text: 'Home', href: '/'},
        { key: 'questions', icon: QuestionMarkCircleIcon, text: 'Questions', href: '/questions' },
        { key: 'tags', icon: TagIcon, text: 'Tags', href: '/tags' },
        { key: 'session', icon: UserIcon, text: 'User Session', href: '/session' }
    ];
    
    
    const handleRouting = (href: string) => {
        setActiveLink(href);
        router.push(href);
    }
    
    const textColor = {
        default: 'text-black',
        active: 'text-sky-700'
    }
    
    return (
        <ListBox aria-label='nav links' 
                 variant='default' 
                 items={navLinks} 
                 className='sticky top-20 ml-6' 
                 selectionMode="single">
            {({key, href, icon: Icon, text}) => (
                <ListBox.Item id={key} 
                              textValue={text} 
                              onAction={() => handleRouting(href)} key={key} 
                              aria-label={text}
                              // className={pathname === href ? 'font-bold text-sky-700' : ''}>
                              className={`${activeLink === href ? 'font-bold text-sky-700' : ''}`}>
                    <Icon className='h-6' />
                    {text}
                </ListBox.Item>
            )}
        </ListBox>
    );
}
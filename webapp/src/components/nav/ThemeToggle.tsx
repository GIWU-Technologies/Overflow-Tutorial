'use client';

import {Button, useTheme} from "@heroui/react";
import {MoonIcon, SunIcon} from "@heroicons/react/24/solid";
import {useEffect, useState} from "react";

export default function ThemeToggle() {
    const {theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
       setMounted(true); 
    },[]);
    
    if (!mounted) return null;
    
    return (
        <div>
            <Button variant='primary' className='bg-purple-800 dark:bg-purple-900' isIconOnly={true} aria-label='Toggle Theme' onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                {theme === 'light' ? (
                    <MoonIcon className='h-8'/>
                ) : (
                    <SunIcon className='h-8 text-yellow-300' />
                )}
            </Button>
        </div>
    );
}
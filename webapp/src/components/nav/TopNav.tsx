import Link from "next/link";
import {AcademicCapIcon, MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import {Button, InputGroup} from "@heroui/react";
import ThemeToggle from "@/components/nav/ThemeToggle";

export default function TopNav() {
    return (
        <div>
            <header className='p-2 w-full fixed top-0 z-50 border-b bg-white dark:bg-black'>
                <div className='flex px-10 mx-auto'>
                    <div className='flex items-center gap-6'>
                        <Link href='/' className='flex items-center gap-3 max-h-16'>
                            <AcademicCapIcon className='size-10 text-purple-800 dark:text-purple-400' />
                            <h3 className='text-xl font-semibold uppercase text-black dark:text-white'>Overflow</h3>
                        </Link>
                        <nav className='flex gap-3 my-2 text-md text-neutral-500 dark:text-neutral-100'>
                            <Link href='/'>About</Link>
                            <Link href='/'>Products</Link>
                            <Link href='/'>Contacts</Link>
                        </nav>
                    </div>
                    
                    <InputGroup className='ml-6 w-full'>
                        <InputGroup.Prefix>
                            <MagnifyingGlassIcon className='size-6' />
                        </InputGroup.Prefix>
                        <InputGroup.Input className='ml-2' placeholder='Search' type='search' />
                    </InputGroup>
                    
                    <div className='flex basis-1/4 shrink-0 justify-end gap-3'>
                        <ThemeToggle />
                        <Button variant='outline' className='rounded-lg border-purple-800 border-2 text-purple-300 dark:text-purple-400 dark:border-purple-400'>Login</Button>
                        <Button className='rounded-lg bg-purple-800 text-white'>Register</Button>
                    </div>
                    
                </div>
            </header>
        </div>
    );
}
'use client';

import {User} from 'next-auth';
import {Avatar, Button, Dropdown} from "@heroui/react";
import {signOut} from "next-auth/react";

type Props = {
    user: User | null;
}

export default function UserMenu({user}: Props) {
    return (
        <Dropdown>
            <Button className='bg-black'>
                <div className='flex items-center gap-2 cursor-pointer'>
                    <Avatar color='accent' size='sm'>
                        <Avatar.Fallback>
                            {user?.name?.charAt(0)}
                        </Avatar.Fallback>
                    </Avatar>
                    {user?.name}
                </div>
                
            </Button>
            <Dropdown.Popover>
                <Dropdown.Menu>
                    <Dropdown.Item key='edit'>Edit Profile</Dropdown.Item>
                    <Dropdown.Item key='logout' className='text-danger' onClick={() => signOut({redirectTo: '/'})}>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
            
        </Dropdown>
    );
}


'use client';
import {Button} from "@heroui/react";
import {signIn} from "next-auth/react";

export default function LoginButton() {
    return (
        <Button variant='outline' 
                className='rounded-lg border-purple-800 border-2 text-purple-300 dark:text-purple-400 dark:border-purple-400' type='button' 
                onPress={() => signIn('keycloak',  
                    {redirectTo: '/questions'}, {prompt: 'login'})}>
             Login
        </Button>
    );
}
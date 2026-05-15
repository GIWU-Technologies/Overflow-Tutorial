'use client';

import {Button} from "@heroui/react";
import {testAuth} from "@/lib/actions/auth-actions";
import {handleError, successToast} from "@/lib/util";


export default function AuthTestButton() {
    const onClick = async () => {
        const {data, error} = await testAuth();
        if (error) handleError(error);
        if (data) successToast(data);
    }
    
    return (
        <Button className='text-white hover:text-sky-600' onPress={onClick}>
            Test Auth
        </Button>
    );
}

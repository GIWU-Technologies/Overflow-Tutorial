'use client';

import {Button, toast} from "@heroui/react";
import {triggerError} from "@/lib/actions/error-actions";
import {useState, useTransition} from "react";
import {handleError} from "@/lib/util";


export default function ErrorButtons() {
    const [pending, startTransition] = useTransition();
    const [target, setTarget] = useState(0);
    
    const onClick = (code: number) => {
        setTarget(code);
        //console.log('Testing code: ', code);
        startTransition(async () => {
            //console.log('Starting transition for code: ', code);
            const { error } = await triggerError(code);
            if (error) handleError(error);
            setTarget(0);
        })
    }
    
    return (
        <div className='flex gap-3'>
            {[400,401,403,404,500].map(code => (
                <Button onPress= {() =>  onClick(code)} 
                        key={code} 
                        type='button' 
                        variant='primary' isPending={pending && target === code}>
                    Test {code}
                </Button>
            ))}
        </div>
    );
}
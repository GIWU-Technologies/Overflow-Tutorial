'use server';

import {fetchClient} from "@/lib/fetchClient";

export async function triggerError(code: number) {
    //console.log('Triggering error for code: ', code);
    return await fetchClient(`/test/errors?code=${code}`, 'GET');
}
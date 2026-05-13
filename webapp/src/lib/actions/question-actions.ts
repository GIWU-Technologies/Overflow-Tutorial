'use server';

import {Question} from "@/lib/types";
import {fetchClient} from "@/lib/fetchClient";

export async function getQuestions(tag?: string) {
    let url = '/questions';
    if (tag) {
        url += '?tag=' + tag;
    }
    return fetchClient<Question[]>(url, 'GET');
    // const response = await fetch(url);
    // if (!response.ok) throw new Error('Failed to get data');
    // return response.json();
}

export async function getQuestionById(id: string) {
     return fetchClient<Question>(`/questions/${id}`, 'GET');
    //return fetchClient<Question>(`/questions/fake`, 'GET');
    //const url = `http://localhost:7001/questions/${id}`;
    // const response = await fetch(url);
    // if (!response.ok) throw new Error('Failed to get data');
    // return response.json();
}

export async function searchQuestions(query: string) {
    return fetchClient<Question[]>(`/search?query=${query}`, 'GET');
}
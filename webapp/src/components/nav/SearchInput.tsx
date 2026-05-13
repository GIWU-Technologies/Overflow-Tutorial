'use client';
import ThemeToggle from "@/components/nav/ThemeToggle";
import {Button, InputGroup, ListBox, ListBoxItem} from "@heroui/react";
import {MagnifyingGlassIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {useEffect, useRef, useState} from "react";
import {Question} from "@/lib/types";
import {searchQuestions} from "@/lib/actions/question-actions";

export default function SearchInput() {
    
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<Question[] | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    // document.querySelector('input')?.addEventListener('search', function(e) {
    //    console.log('clearing search');
    // });
    
    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        if (!query) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setResults(null);
            setShowDropdown(false);
            return;
        }
        
        timeoutRef.current = setTimeout(async () => {
            setLoading(true);
            console.log('searching...');
            const {data: questions} = await searchQuestions(query);
            setResults(questions);
            setLoading(false);
            setShowDropdown(true);
        }, 300);
    },[query]);
    
    const onAction = () => {
        setQuery('');
        setResults(null);
    }
    
    return (
        <div className='flex flex-col w-full'>
            <InputGroup className='ml-6 w-full'>
                <InputGroup.Prefix>
                    <MagnifyingGlassIcon className='size-6' />
                </InputGroup.Prefix>
                <InputGroup.Input className='ml-2' placeholder='Search' type='search' value={query} onChange={(e) =>  setQuery(e.target.value)} />
                {/*<InputGroup.Suffix>*/}
                {/*    <span>X</span>*/}
                {/*</InputGroup.Suffix>*/}
            </InputGroup>
        {showDropdown && results && (
            <div className='absolute top-full z-50 bg-white dark:bg-slate-900 shadow-lg border-2 border-default-500 w-[50%]'>
                <ListBox onAction={onAction} items={results} className='flex flex-col overflow-y-auto'>
                    {question => (
                        <ListBox.Item href={`/questions/${question.id}`} key={question.id}>
                            <div className='flex flex-col h-14 min-w-14 justify-center items-center border border-success rounded-md'>
                                <span>{question.answerCount}</span>
                                <span className='text-xs'>answers</span>
                            </div>
                            <div>
                                <div className='font-semibold'>{question.title}</div>
                                <div className='text-xs opacity-60 line-clamp-2'>{question.content}</div>
                            </div>
                        </ListBox.Item>
                    )}
                </ListBox>
                {/*{!loading && results.length === 0 && <span>No results</span>}*/}
                {/*{!loading && results.map(question => (*/}
                {/*    <li key={question.id}>{question.title}</li>*/}
                {/*))}*/}
            </div>
        )}
        </div>
       
    );
}
'use client'

import {MagnifyingGlassIcon} from '@heroicons/react/24/solid'
import {Input, InputGroup} from "@heroui/react";
import {Tab, Tabs} from "@heroui/react";

export default function TagHeader() {
    const tabs = [
        {key: 'popular', label: 'Popular'},
        {key: 'name', label: 'Name'}
    ]

    return (
        <div className='flex flex-col w-full gap-4 pb-4'>
            <div className='flex flex-col items-start gap-3'>
                <div className='text-3xl font-semibold'>Tags</div>
                <p>A tag is a keyword or label that categorizes your question with other,
                    similar questions. Using the right tags makes it easier for others to find
                    and answer your question.</p>
            </div>
            <div className='flex items-center justify-between'>
                {/*<Input*/}
                {/*    type="search"*/}
                {/*    className='w-fit'*/}
                {/*    required*/}
                {/*    placeholder="Search">*/}
                {/*    <MagnifyingGlassIcon className='h-6 text-neutral-500'/>*/}
                {/*</Input>*/}
                <InputGroup className='ml-6 w-auto'>
                    <InputGroup.Prefix>
                        <MagnifyingGlassIcon className='size-6' />
                    </InputGroup.Prefix>
                    <InputGroup.Input className='ml-2' placeholder='Search' type='search' />
                </InputGroup>


                <Tabs className='w-[33%]'>
                    <Tabs.ListContainer>
                        <Tabs.List>
                            {tabs.map(item => (
                                <Tabs.Tab id={item.key} key={item.key}>
                                    {item.label}
                                </Tabs.Tab>
                            ))}
                        </Tabs.List>
                    </Tabs.ListContainer>
                </Tabs>

            </div>
        </div>
    )
}
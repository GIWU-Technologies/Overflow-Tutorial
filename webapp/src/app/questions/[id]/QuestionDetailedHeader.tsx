import {Question} from "@/lib/types";
import {Button} from "@heroui/react";
import Link from "next/link";

type Props = {
    question: Question
}

export default function QuestionDetailedHeader({question}: Props) {
    return (
        <div className='flex flex-col w-full border-b gap-4 pb-4 px-6'>
            <div className='flex justify-between gap-4'>
                <div className='text-3xl font-semibold first-letter:uppercase'>
                    {question.title}
                </div>
                <Button variant='secondary' className='bg-purple-800 text-white w-[20%] rounded-lg'>
                    <Link href='/questions/ask'>
                        Ask Question
                    </Link>
                </Button>
            </div>
            <div className='flex items-center gap-6'>
                <div className='flex items-center gap-3'>
                    <span className='text-foreground-500'>Asked</span>
                    <span>{question.createdAt}</span>
                </div>
                {question.updatedAt && (
                    <div className='flex items-center gap-3'>
                        <span className='text-foreground-500'>Modified</span>
                        <span>{question.updatedAt}</span>
                    </div>
                )}
                <div className='flex items-center gap-3'>
                    <span className='text-foreground-500'>Views</span>
                    <span>{question.viewCount + 1} times</span>
                </div>
            </div>
        </div>
    );
}


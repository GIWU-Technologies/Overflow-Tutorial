import {Answer} from "@/lib/types";
import {Avatar} from "@heroui/react";
import {timeAgo} from "@/lib/util";

type Props = {
    answer: Answer;
}

export default function AnswerFooter({answer}: Props) {
    return (
        <div className='flex justify-end mt-4'>
            <div className='flex flex-col basis-2/5 bg-slate-500/10 dark:bg-slate-100/20 px-3 py-2 gap-2 rounded-md text-primary'>
                <span className='text-sm font-extralight'>answered {timeAgo(answer.createdAt)}</span>
                <div className='flex items-center gap-3'>
                    <Avatar className='h-6 w-6' color='default'>
                        {answer.userDisplayName.charAt(0)}
                    </Avatar>
                    <div className='flex flex-col items-center'>
                        <span>{answer.userDisplayName}</span>
                        <span className='self-start text-sm font-semibold'>42</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
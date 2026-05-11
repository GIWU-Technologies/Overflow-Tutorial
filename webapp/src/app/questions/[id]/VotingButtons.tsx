
import {Button} from "@heroui/react";
import {ArrowDownCircleIcon, ArrowUpCircleIcon, CheckIcon} from "@heroicons/react/24/outline";

type Props = {
    accepted?: boolean;
}

export default function VotingButtons({accepted}: Props) {
    return (
        <div className='flex shrink-0 flex-col gap-3 items-center justify-start mt-4'>
            <Button isIconOnly={true}  variant='outline'>
                <ArrowUpCircleIcon className='w-12 h-12' />
            </Button>
            <span className='text-xl font-semibold'>0</span>
            <Button isIconOnly={true}  variant='outline'>
                <ArrowDownCircleIcon className='w-12 h-12' />
            </Button>
            {accepted && (
                <Button isIconOnly variant='outline'>
                    <CheckIcon className='size-12 text-success' strokeWidth={4} />
                </Button>
            )}
        </div>
    );
}
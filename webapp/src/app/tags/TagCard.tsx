
import {Card, Chip} from "@heroui/react";
import Link from "next/link";
import {Tag} from "@/lib/types";

type Props = {
    tag: Tag;
}

export default function TagCard({tag}: Props) {
    return (
        <Card className='hover:bg-gray-100 dark:hover:bg-gray-700'>
            <Link href={`/questions?tag=${tag.slug}`}>
                <Card.Header>
                    <Chip variant='primary' className='w-[50%]'>
                        {tag.slug}
                    </Chip>
                </Card.Header>
                <Card.Content className='mt-3'>
                    <p className='line-clamp-3'>{tag.description}</p>
                </Card.Content>
                <Card.Footer className='mt-3'>
                    42 Questions
                </Card.Footer>
            </Link>
        </Card>
    );
}
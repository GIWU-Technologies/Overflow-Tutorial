import { toast } from "@heroui/react";
import {
    differenceInCalendarDays,
    differenceInCalendarMonths,
    differenceInCalendarWeeks,
    isToday,
    isYesterday
} from "date-fns";
import {formatDistanceToNow} from "date-fns/formatDistanceToNow";

export function errorToast(error: {message: string, status?: number}) {
    return toast.danger(error.status || 'Error!', {
        description: error.message || 'Something went wrong'
    });
}

export function handleError(error: {message: string, status?: number}) {
    if (error.status === 500) {
        throw error;
    } else {
        return errorToast(error);
    }
}

export function fuzzyTimeAgo(date: string | Date) {
    const now = new Date();
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    
    const days = differenceInCalendarDays(now, date);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;

    const weeks = differenceInCalendarWeeks(now, date);
    if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;

    const months = differenceInCalendarMonths(now, date);
    return `${months} month${months > 1 ? 's' : ''} ago`;
}

export function timeAgo(date: string | Date) {
    return formatDistanceToNow(date, { addSuffix: true});
}
"use client";
import BackLineIcon from '@iconify-react/mingcute/back-line';

import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="cursor-pointer mb-3  flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors "
        >
            <BackLineIcon className='h-6 w-6  -mt-1'/>
        </button>
    );
}


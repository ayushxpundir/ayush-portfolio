'use client'

import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';

const Navbar = () => {
    const pathname = usePathname();

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/projects', label: 'Projects' },
        { href: '/experiences', label: 'Experiences' },
    ];

    return (
        <div className='sticky top-0 z-50 flex justify-between w-full p-5 bg-zinc-50 dark:bg-neutral-900 text-zinc-600 dark:text-zinc-400
        font-pixel'>
            <div className='flex gap-5 text-base'>
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={
                                isActive
                                    ? 'text-zinc-800 dark:text-zinc-200'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors'
                            }
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
            <div className='flex gap-5 text-base'>
                <ThemeToggle/>
            </div>
        </div> 
    )
}

export default Navbar
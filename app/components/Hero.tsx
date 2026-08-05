import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import pfpImg from '@/public/Hero/pf-photo.png';
import banner from '@/public/Hero/banner.gif'
import { SOCIAL_LINKS } from '@/app/data/links';

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="opacity-60 group-hover:opacity-100 transition-opacity"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const Hero = () => {
  return (
    <div className='p-5 pt-0 flex flex-col gap-5 sm:text-lg text-zinc-900 dark:text-zinc-100'>
      {/* Banner Container: Standardized Tailwind aspect-ratio syntax */}
      <div className='relative w-full aspect-16/5 sm:aspect-16/3 min-h-120px overflow-hidden rounded-lg border border-dashed border-zinc-400 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-800'>
        <Image
          src={banner}
          alt="Ayush Pundir Banner Preview"
          fill
          priority
          unoptimized
          sizes="(max-width: 768px) 100vw, 1200px"
          className='object-cover object-center'
        />
      </div>
      
      {/* Profile Row */}
      <div className='flex items-center gap-2.5'>
        <div className='bg-zinc-100 dark:bg-zinc-950 relative h-18 w-18 shrink-0 overflow-hidden border border-dashed border-zinc-400 dark:border-zinc-600 rounded-lg'>
          <Image
            src={pfpImg}
            alt="Ayush Pundir Avatar"
            fill
            sizes="72px"
            priority
            className='object-cover object-center'
          />
        </div>
        <div>
          <h1 className='sm:text-3xl text-[25px] tracking-tighter font-semibold text-zinc-900 dark:text-zinc-100'>
            Ayush Pundir
          </h1>
          <div className='flex gap-1.75 font-normal text-zinc-700 dark:text-zinc-300'>
            <h2>Developer</h2>
            <span className='text-zinc-600 dark:text-zinc-400'>|</span>
            <h2>Delhi, India</h2>
          </div>
        </div>
      </div>
      
      {/* Bio Section */}
      <div className='flex flex-col gap-2.5'>
        <h3>
          Focused on building scalable, AI-integrated web products.
        </h3>
        
        {/* Corrected width utility from w-8/10 to w-4/5 */}
        <div className='flex flex-wrap gap-2.5'>
          {SOCIAL_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target='_blank'
              rel="noopener noreferrer"
              className='group flex items-center gap-1 text-zinc-700 dark:text-zinc-300 w-fit hover:underline decoration-2 underline-offset-3'
            >
              {link.name}
              <ExternalLinkIcon />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
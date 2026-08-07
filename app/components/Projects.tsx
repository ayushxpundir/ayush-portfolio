'use client';

import React, { useMemo, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { projectsData } from '@/app/data/projectsData';




type Project = typeof projectsData[number];

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = memo(({ project }) => (
  <div className='flex break-inside-avoid flex-col gap-3 h-fit rounded-lg overflow-hidden border border-dashed bg-zinc-100 dark:bg-zinc-900 border-zinc-400 dark:border-zinc-600'>
    <Image
      src={project.image}
      alt={`${project.title} Project Preview`}
      className='h-auto w-full border-b border-dashed border-zinc-400 dark:border-zinc-600'
      sizes="(max-width: 640px) 100vw, 50vw"
    />
    <div className='p-2.5 pt-0 flex flex-col gap-1'>
      <div className='flex gap-1.75 items-center justify-between w-full'>
        <div className='flex items-center gap-1.75 text-md'>
          <Image
            src={project.icon}
            alt={`${project.title} Project Icon`}
            className='h-6 w-auto'
          />
          <h2 className='text-zinc-900 dark:text-zinc-100 font-medium'>
            {project.title}
          </h2>
        </div>
        <div className='flex gap-1.75 w-fit text-sm font-medium'>
          {project.siteUrl && (
            <div className='bg-neutral-50 py-1 px-1.25 rounded-lg dark:bg-neutral-950 border border-dashed border-zinc-400 dark:border-zinc-600'>
              <Link href={project.siteUrl} target="_blank" rel="noopener noreferrer" className='flex gap-1 items-center'>
                <Globe className='h-5' />
                <span>Site</span>
              </Link>
            </div>
          )}
          {project.githubUrl && (
            <div className='bg-neutral-50 rounded-lg p-1 border border-dashed border-zinc-400 dark:border-zinc-600 dark:bg-neutral-950'>
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className='flex gap-1 items-center'>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className='h-5 w-5'
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 8l-4 4 4 4" />
                  <path d="M17 8l4 4-4 4" />
                  <path d="M14 5l-4 14" />
                </svg>
                <span>Code</span>
              </Link>
            </div>
          )}
        </div>
      </div>
      <h3 className='text-sm mt-1'>
        {project.description}
      </h3>
    </div>
  </div>
));

ProjectCard.displayName = 'ProjectCard';

interface ProjectsProps {
  limit?: number;
  title?: React.ReactNode | null;
  paddingTop?: boolean;
  paddingBottom?: boolean;
}

const Projects = ({
  limit,
  title,
  paddingTop = true,
  paddingBottom = true,
}: ProjectsProps) => {
  const { leftColumn, rightColumn } = useMemo(() => {
    const reversed = [...projectsData].reverse();
    const displayed = limit ? reversed.slice(0, limit) : reversed;
    return {
      leftColumn: displayed.filter((_, i) => i % 2 === 0),
      rightColumn: displayed.filter((_, i) => i % 2 === 1),
    };
  }, [limit]);

  const headerTitle = useMemo(() => {
    if (title === null) return null;
    if (title !== undefined) return title;
    return limit ? ' Latest Projects' : 'All Projects';
  }, [title, limit]);

  return (
    <div
      className={`flex px-5 flex-col gap-5 text-lg text-zinc-800 dark:text-zinc-300 ${
        paddingTop ? 'pt-5' : 'pt-0'
      } ${paddingBottom ? 'pb-5' : 'pb-0'}`}
    >
      {headerTitle !== null && (
        <div className='flex items-center justify-between w-full'>
          <h1 className='font-pixel text-base text-zinc-600 dark:text-zinc-400'>
            {headerTitle}
          </h1>
        </div>
      )}

      <div className='flex flex-col sm:flex-row gap-5'>
        <div className='flex flex-col gap-5 w-full'>
          {leftColumn.map((project) => (
            <ProjectCard key={project.title + project.siteUrl} project={project} />
          ))}
        </div>
        <div className='flex flex-col gap-5 w-full'>
          {rightColumn.map((project) => (
            <ProjectCard key={project.title + project.siteUrl} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
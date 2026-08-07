'use client'
import React, { useState, useCallback, useMemo, memo } from 'react'
import { experiencesData } from '@/app/data/experienceData'

interface ExperienceItemData {
  role: string
  company: string
  location: string
  type: string
  period: string
  description?: string[]
  tools?: string[]
}

interface ExperienceItemProps {
  item: ExperienceItemData
  index: number
  isFirst: boolean
  isLast: boolean
}

// Lightweight inline chevron — no icon library needed
const Chevron = memo(({ open }: { open: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`shrink-0 transition-transform duration-200 ease-in-out will-change-transform ${
      open ? 'rotate-180' : 'rotate-0'
    }`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
))
Chevron.displayName = 'Chevron'

const ExperienceItem: React.FC<ExperienceItemProps> = memo(
  ({ item, index, isFirst, isLast }) => {
    const contentId = `experience-content-${index}`

    return (
      <div
        className={`flex flex-col ${!isFirst ? 'pt-5' : ''} ${
          !isLast ? 'pb-7 border-b border-dashed border-zinc-400 dark:border-zinc-600' : ''
        }`}
      >
        <div className="w-full text-left group focus:outline-none cursor-default">
          <div className="font-semibold w-full flex justify-between items-start">
            <h3 className="md:text-2xl text-lg text-zinc-900 dark:text-zinc-100">{item.role}</h3>
            <span className="md:text-2xl text-lg font-medium text-zinc-900 dark:text-zinc-100">
              {item.company}
            </span>
          </div>
          <div className="flex justify-between md:text-base text-sm font-normal text-zinc-600 dark:text-zinc-400 mt-1">
            <div className="flex gap-1.5">
              <span>{item.location}</span>
              <span>|</span>
              <span>{item.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{item.period}</span>
            </div>
          </div>
        </div>

        <div id={contentId} className="pt-3">
          <div className="text-zinc-800 font-light dark:text-zinc-200 md:text-base text-sm gap-3 flex flex-col">
            {item.description && item.description.length > 0 && (
              <div className="flex flex-col gap-1">
                {item.description.map((point, i) => (
                  <div key={i} className="flex gap-2">
                    <span>&gt;</span>
                    <p>{point}</p>
                  </div>
                ))}
              </div>
            )}
            {item.tools && item.tools.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {item.tools.map((tool, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-zinc-100 dark:bg-zinc-900 w-fit px-2 py-1 font-mono text-xs border border-dashed border-zinc-400 dark:border-zinc-600"
                  >
                    <span>{tool}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
)
ExperienceItem.displayName = 'ExperienceItem'

interface ExperienceProps {
  limit?: number
  title?: React.ReactNode | null | boolean
}

const Experience = ({ limit, title }: ExperienceProps) => {
  const displayedExperiences = useMemo(() => {
    const reversed = [...experiencesData].reverse()
    return limit ? reversed.slice(0, limit) : reversed
  }, [limit])

  const headerTitle = useMemo(() => {
    if (title === null || title === false) return null
    if (title) return title
    return 'Current Experience'
  }, [title])

  return (
    <div className="flex p-5 gap-5 flex-col text-lg">
      {headerTitle !== null && (
        <div className="flex items-center justify-between w-full">
          <h1 className="font-pixel text-base text-zinc-600 dark:text-zinc-400">{headerTitle}</h1>
        </div>
      )}
      <div className="flex flex-col">
        {displayedExperiences.map((item, index) => (
          <ExperienceItem
            key={item.company + item.period}
            item={item}
            index={index}
            isFirst={index === 0}
            isLast={index === displayedExperiences.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

export default Experience
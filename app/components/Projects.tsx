'use client'

import React, { useState, useCallback, useMemo, memo, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { experiencesData } from '@/app/data/experienceData'

interface ExperienceItemProps {
  item: {
    role: string
    company: string
    location: string
    type: string
    period: string
    description?: string[]
    tools?: string[]
  }
  isOpen: boolean
  onToggle: (index: number) => void
  index: number
  isFirst: boolean
  isLast: boolean
  showChevron: boolean
}

const ExperienceItem: React.FC<ExperienceItemProps> = memo(
  ({ item, isOpen, onToggle, index, isFirst, isLast, showChevron }) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!showChevron) return
      if (e.repeat) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onToggle(index)
      }
    }

    const handleClick = () => {
      if (!showChevron) return
      onToggle(index)
    }

    return (
      <div
        className={`flex flex-col ${!isFirst ? 'pt-5' : ''} ${
          !isLast ? 'pb-7 border-b border-dashed border-zinc-400 dark:border-zinc-600' : ''
        }`}
      >
        <button
          type="button"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          aria-expanded={showChevron ? isOpen : undefined}
          tabIndex={showChevron ? 0 : -1}
          className={`w-full text-left group focus:outline-none ${
            showChevron
              ? 'cursor-pointer focus-visible:ring-2 focus-visible:ring-zinc-400'
              : 'cursor-default'
          }`}
        >
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
              {showChevron && (
                <ChevronDown
                  size={18}
                  className={`text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-transform duration-200 ease-out ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              )}
            </div>
          </div>
        </button>

        {/* CSS-Grid driven animation (Hardware accelerated, zero layout reflow lag) */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="text-zinc-800 font-light dark:text-zinc-200 md:text-base text-sm gap-3 flex flex-col pt-3">
              {item.description && item.description.length > 0 && (
                <div className="flex flex-col gap-1">
                  {item.description.map((point) => (
                    <div key={point} className="flex gap-2">
                      <span>&gt;</span>
                      <p>{point}</p>
                    </div>
                  ))}
                </div>
              )}

              {item.tools && item.tools.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.tools.map((tool) => (
                    <div
                      key={tool}
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
      </div>
    )
  }
)

ExperienceItem.displayName = 'ExperienceItem'

interface ExperienceProps {
  limit?: number
  openChevron?: boolean
  showChevron?: boolean
  title?: React.ReactNode | null | boolean
}

const Experience = ({ limit, openChevron, showChevron = true, title }: ExperienceProps) => {
  const displayedExperiences = useMemo(() => {
    const reversed = [...experiencesData].reverse()
    return limit ? reversed.slice(0, limit) : reversed
  }, [limit])

  const [openIndices, setOpenIndices] = useState<Set<number>>(() =>
    openChevron ? new Set(displayedExperiences.map((_, i) => i)) : new Set()
  )

  const handleToggle = useCallback((index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }, [])

  useEffect(() => {
    setOpenIndices(openChevron ? new Set(displayedExperiences.map((_, i) => i)) : new Set())
  }, [openChevron, displayedExperiences])

  const headerTitle = useMemo(() => {
    if (title === null || title === false) return null
    if (title) return title
    return 'Current Experience'
  }, [title])

  return (
    <div className="flex p-5 gap-5 flex-col text-lg">
      {headerTitle !== null && (
        <div className="flex items-center justify-between w-full">
          <h1 className="font-pixel text-base text-zinc-600 dark:text-zinc-400">
            {headerTitle}
          </h1>
        </div>
      )}
      <div className="flex flex-col">
        {displayedExperiences?.map((item, index) => (
          <ExperienceItem
            key={item.company + item.period}
            item={item}
            index={index}
            isOpen={openIndices.has(index)}
            onToggle={handleToggle}
            isFirst={index === 0}
            isLast={index === displayedExperiences.length - 1}
            showChevron={showChevron}
          />
        ))}
      </div>
    </div>
  )
}

export default Experience
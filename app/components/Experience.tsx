'use client'

import React, { useState, useCallback, useMemo, memo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  onToggle: () => void
  isFirst: boolean
  isLast: boolean
  showChevron: boolean
}

const ExperienceItem: React.FC<ExperienceItemProps> = memo(
  ({ item, isOpen, onToggle, isFirst, isLast, showChevron }) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!showChevron) return
      if (e.repeat) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onToggle()
      }
    }

    const handleClick = () => {
      if (!showChevron) return
      onToggle()
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
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="will-change-transform text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors"
                >
                  <ChevronDown size={18} />
                </motion.div>
              )}
            </div>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden will-change-[height,opacity]"
            >
              <div className=" text-zinc-800 font-light dark:text-zinc-200 md:text-base text-sm gap-3 flex flex-col pt-3">
                {item.description && item.description.length > 0 && (
                  <div className="flex flex-col gap-1">
                    {item.description.map((point, index) => (
                      <div key={index} className="flex gap-2">
                        <span>&gt;</span>
                        <p>{point}</p>
                      </div>
                    ))}
                  </div>
                )}

                {item.tools && item.tools.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.tools.map((tool, index) => (
                      <div
                        key={index}
                        className="rounded-lg bg-zinc-100 dark:bg-zinc-900 w-fit px-2 py-1 font-mono text-xs border border-dashed border-zinc-400 dark:border-zinc-600"
                      >
                        <span>{tool}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

ExperienceItem.displayName = 'ExperienceItem'

interface ExperienceProps {
  limit?: number
  openChevron?: boolean // pass `true` to force all items open by default
  showChevron?: boolean // pass `false` to hide the chevron AND disable open/close toggling, defaults to true
  title?: React.ReactNode | null | boolean // pass `null` or `false` to hide title, or pass custom text
}

const Experience = ({ limit, openChevron, showChevron = true, title }: ExperienceProps) => {
  const displayedExperiences = useMemo(() => {
    const reversed = [...experiencesData].reverse()
    return limit ? reversed.slice(0, limit) : reversed
  }, [limit])

  const [openIndices, setOpenIndices] = useState<number[]>(() =>
    openChevron ? displayedExperiences.map((_, i) => i) : []
  )

  const handleToggle = useCallback((index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }, [])

  useEffect(() => {
    setOpenIndices(openChevron ? displayedExperiences.map((_, i) => i) : [])
  }, [openChevron, displayedExperiences])

  // Resolve the title: if null or false, don't render. If undefined, fallback to default.
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
            isOpen={openIndices.includes(index)}
            onToggle={() => handleToggle(index)}
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
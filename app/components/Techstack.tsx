"use client";

import React, { useState, useMemo, useEffect } from "react";
import { techStackData, Category } from "@/app/data/techstackdata"; 

const categories: Category[] = ["All", "Frontend", "Backend", "Tools"];

const Techstack = () => {
  const [activeTab, setActiveTab] = useState<Category>("All");
  const [isMounted, setIsMounted] = useState(false);

  // Prevents SSR mismatch for randomized Iconify SVG IDs
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Memoize filtered data to prevent unnecessary recalculations on re-renders
  const filteredData = useMemo(() => {
    if (activeTab === "All") return techStackData;
    return techStackData.filter((item) => item.category === activeTab);
  }, [activeTab]);

  return (
    <div className="flex flex-col gap-5 p-5 font-mono md:text-base">
      <div className="flex flex-col gap-5">
        <h1 className="text-base text-zinc-600 font-pixel dark:text-zinc-400">
          Tech Stack
        </h1>

        {/* Filter Bar */}
        <div className="flex  flex-wrap gap-2 text-sm" role="group" aria-label="Filter technologies">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveTab(category)}
              aria-pressed={activeTab === category}
              className={`cursor-pointer rounded-lg px-2 py-1 transition-all duration-200 border border-dashed ${
                activeTab === category
                  ? "bg-zinc-100 text-zinc-800 border-zinc-400 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-600"
                  : "bg-zinc-200 text-zinc-600 border-zinc-400 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-600 dark:hover:bg-zinc-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tech Grid */}
      <div className="flex flex-wrap gap-1.75">
        {filteredData.map(({ name, IconComponent, className }) => (
          <div
            key={name}
            className="flex rounded-lg items-center size-fit gap-1.75 md:px-2.5 md:py-1.75 py-1 px-2 border border-dashed bg-zinc-100 text-zinc-700 border-zinc-400 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-600"
          >
            {isMounted ? (
              <IconComponent 
                className={`shrink-0  h-4 md:h-5 ${className || ""}`} 
              />
            ) : (
              <div className="shrink-0 w-6 h-4 md:h-6" />
            )}
            
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Techstack;
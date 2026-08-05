'use client'

import React, { useState, useEffect } from 'react'

const Footer = () => {
    const [time, setTime] = useState<string>('')
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)

        const updateDateTime = () => {
            const now = new Date()
            setYear(now.getFullYear())

            // Format time into "07:23 PM IST" (without seconds)
            const formattedTime = now.toLocaleTimeString('en-US', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            })

            setTime(`${formattedTime} IST`)
        }

        updateDateTime()
        const timer = setInterval(updateDateTime, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className='p-5 pb-10 flex flex-col text-zinc-500 dark:text-zinc-500'>
            <div className='flex justify-center items-center gap-1.5 text-xs'>
                <span>{year}</span>
                <span>&copy;</span>
                <span>AYUSH PUNDIR</span>
                <span>|</span>
                <span>{mounted ? time : '--:-- -- IST'}</span>
            </div>
        </div>
    )
}

export default Footer
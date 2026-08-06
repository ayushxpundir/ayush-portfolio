'use client'
import React, { useState, useEffect, useSyncExternalStore } from 'react'

// Returns false on the server and on the very first client render, then true
// after hydration — without calling setState synchronously inside an effect
// (which is what triggered the "cascading renders" warning). The subscribe
// function is a no-op since this value never changes after mount.
const emptySubscribe = () => () => {}
function useMounted() {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    )
}

const Footer = () => {
    const [time, setTime] = useState<string>('')
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const mounted = useMounted()

    // Subscribes to an external ticking clock and keeps time/year in sync.
    // This is a legitimate effect (syncing with an external system, the
    // system clock) rather than a synchronous setState-on-mount.
    useEffect(() => {
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
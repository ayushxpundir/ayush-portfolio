import Experience from "@/app/components/Experience";
import Footer from "@/app/components/Footer";
import GitHubcontri from "@/app/components/GitHubcontri";
import Hero from "@/app/components/Hero";
import Navbar from "@/app/components/Navbar";
import Projects from "@/app/components/Projects";
import Techstack from "@/app/components/Techstack";
import BackButton from "@/components/BackButton"; // 1. Import the button
import { Metadata } from 'next';

// Export metadata here (Runs on Server)
export const metadata: Metadata = {
  title: {
    absolute: '/experiences',
  },
};

export default function Home() {
    return (
        <div className="bg-zinc-50 dark:bg-neutral-900 min-h-screen flex justify-center">
            {/* 1. Added `flex flex-col` and changed `h-500` to `min-h-screen` */}
            <div className="md:w-175.5 w-full min-h-full flex flex-col font-sans">
                <Navbar />
                {/* 2. `flex-1` now correctly expands to push the Footer to the bottom */}
                <main className="flex flex-col flex-1">
                    <div className="flex flex-col gap-1 p-5 pb-0 pt-0 text-zinc-900 dark:text-zinc-100">
                        <div>
                            <BackButton />
                        </div>
                        <div className="text-3xl font-medium tracking-tighter ">
                            <h1>Experiences</h1>
                        </div>
                        <div className=" text-base font-pixel text-zinc-600 dark:text-zinc-400 font-medium">
                            <h2>A summary of my work experience.</h2>
                        </div>
                    </div>
                    <Experience title={null} />
                </main>
                <Footer />
            </div >
        </div >
    );
}
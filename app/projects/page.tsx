import { Metadata } from 'next';
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import Projects from "@/app/components/Projects";
import BackButton from "@/components/BackButton";

// Export metadata here (Runs on Server)
export const metadata: Metadata = {
  title: {
    absolute: '/projects',
  },
};

export default function Home() {
  return (
    <div className="bg-zinc-50 dark:bg-neutral-900 min-h-screen flex justify-center text-zinc-900 dark:text-zinc-100">
      <div className="md:w-175.5 w-full min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex flex-col flex-1">
          <div className="flex flex-col gap-1 p-5 pb-0 pt-0">
            <div>
              <BackButton />
            </div>

            <div className="text-3xl font-medium tracking-tighter">
              <h1>Projects</h1>
            </div>
            <div className="text-base font-pixel text-zinc-600 dark:text-zinc-400 font-medium">
              <h2>A collection of work I&apos;ve made.</h2>
            </div>
          </div>
          <Projects title={null} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
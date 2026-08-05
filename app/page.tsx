import Experience from "./components/Experience";
import Footer from "./components/Footer";
import GitHubcontri from "./components/GitHubcontri";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Techstack from "./components/Techstack";

export default function Home() {
  return (
    <div className="bg-zinc-50 dark:bg-neutral-900 min-h-screen flex justify-center">
      {/* 1. Added `flex flex-col` and changed `h-500` to `min-h-screen` */}
      <div className="md:w-175.5 w-full min-h-full flex flex-col font-sans">
        <Navbar />
        {/* 2. `flex-1` now correctly expands to push the Footer to the bottom */}
        <main className="flex flex-col flex-1">
          <Hero />
          <Projects limit={2} />
          <Techstack />
          <Experience  limit={1} />
          {/* openChevron showChevron={false}  */}
          <GitHubcontri months={8} />
        </main>

        <Footer />
      </div>
    </div>
  );
}
import React from "react";
import JavascriptIcon from "@iconify-react/logos/javascript";
import TypescriptIcon from "@iconify-react/devicon/typescript";
import ReactIcon from "@iconify-react/logos/react";
import NextjsIcon from "@iconify-react/logos/nextjs-icon";
import TailwindcssIcon from "@iconify-react/devicon/tailwindcss";
import BunIcon from "@iconify-react/logos/bun";
import GitIconIcon from "@iconify-react/logos/git-icon";
import GithubIconIcon from "@iconify-react/logos/github-icon";
import FileTypeLightShadcnIcon from "@iconify-react/vscode-icons/file-type-light-shadcn";
import PostgresqlIcon from "@iconify-react/logos/postgresql";
import ExpressIcon from "@iconify-react/devicon/express";
import FigmaIcon from "@iconify-react/logos/figma";
import FramerIcon from "@iconify-react/logos/framer";
import NodejsIconIcon from "@iconify-react/logos/nodejs-icon";
import MongodbIconIcon from "@iconify-react/logos/mongodb-icon";
import VisualStudioCodeIcon from "@iconify-react/selfhst/visual-studio-code";
import CursorIcon from "@iconify-react/devicon/cursor";

export type Category = "All" | "Frontend" | "Backend" | "Tools";

export interface TechItem {
  name: string;
  IconComponent: React.ComponentType<{ className?: string }>;
  className?: string;
  category: Category;
}

export const techStackData: TechItem[] = [
  {
    name: "JavaScript",
    IconComponent: JavascriptIcon,
    category: "Frontend",
  },
  {
    name: "TypeScript",
    IconComponent: TypescriptIcon,
    category: "Frontend",
  },
  {
    name: "React",
    IconComponent: ReactIcon,
    className: "invert dark:invert-0",
    category: "Frontend",
  },
  {
    name: "Next.js",
    IconComponent: NextjsIcon,
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    IconComponent: TailwindcssIcon,
    category: "Frontend",
  },
  {
    name: "Shadcn/ui",
    IconComponent: FileTypeLightShadcnIcon,
    className: "dark:invert",
    category: "Frontend",
  },
  {
    name: "PostgreSQL",
    IconComponent: PostgresqlIcon,
    category: "Backend",
  },
  {
    name: "Express.js",
    IconComponent: ExpressIcon,
    className: "dark:invert",
    category: "Backend",
  },
  {
    name: "Node.js",
    IconComponent: NodejsIconIcon,
    category: "Backend",
  },
  {
    name: "MongoDB",
    IconComponent: MongodbIconIcon,
    category: "Backend",
  },
  {
    name: "Git",
    IconComponent: GitIconIcon,
    category: "Tools",
  },
  {
    name: "GitHub",
    IconComponent: GithubIconIcon,
    className: "dark:invert",
    category: "Tools",
  },
  {
    name: "Bun",
    IconComponent: BunIcon,
    category: "Tools",
  },
  {
    name: "Figma",
    IconComponent: FigmaIcon,
    category: "Tools",
  },
  {
    name: "Framer",
    IconComponent: FramerIcon,
    className: "dark:invert",
    category: "Tools",
  },
  {
    name: "Visual Studio Code",
    IconComponent: VisualStudioCodeIcon,
    category: "Tools",
  },
  {
    name: "Cursor",
    IconComponent: CursorIcon,
    className: "dark:invert",
    category: "Tools",
  },
];
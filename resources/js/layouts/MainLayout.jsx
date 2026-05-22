import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Compass, Menu, X, ArrowUp, Mail, Moon, Sun } from 'lucide-react';
import CinematicLoader from '../components/CinematicLoader';

const GithubIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

const LinkedinIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

export default function MainLayout({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [theme, setTheme] = useState('dark');

    // Scroll Lock during cinematic intro sequence
    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isLoading]);

    useEffect(() => {
        const storedTheme = window.localStorage.getItem('portfolio-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = storedTheme === 'light' || storedTheme === 'dark'
            ? storedTheme
            : (systemPrefersDark ? 'dark' : 'light');

        setTheme(initialTheme);
    }, []);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        window.localStorage.setItem('portfolio-theme', theme);
    }, [theme]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [hovered, setHovered] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(0);

    const sections = ['HOME', 'PHILOSOPHY', 'CREATIONS', 'MASTERY', 'CONNECTION'];

    // Smooth physics configuration for cursor and spotlight
    const cursorX = useSpring(mouseX, { stiffness: 450, damping: 25 });
    const cursorY = useSpring(mouseY, { stiffness: 450, damping: 25 });

    const spotlightX = useSpring(mouseX, { stiffness: 80, damping: 20 });
    const spotlightY = useSpring(mouseY, { stiffness: 80, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Automatically detect hover states over clickable items
    useEffect(() => {
        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer') ||
                target.closest('.cursor-pointer')
            ) {
                setHovered(true);
            } else {
                setHovered(false);
            }
        };
        window.addEventListener('mouseover', handleMouseOver);
        return () => window.removeEventListener('mouseover', handleMouseOver);
    }, []);

    // Detect current scroll section (1 section = 100vh)
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            const sectionHeight = window.innerHeight;
            const current = Math.floor(scrollPosition / sectionHeight);
            setActiveSection(Math.min(Math.max(current, 0), sections.length - 1));
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections.length]);

    // Handle smooth jumping to a section index
    const scrollToSection = (index) => {
        setMenuOpen(false);
        window.scrollTo({
            top: index * window.innerHeight,
            behavior: 'smooth',
        });
    };

    // Spotlight gradient following the mouse
    const spotlightBg = useTransform(
        [spotlightX, spotlightY],
        ([x, y]) => theme === 'dark'
            ? `radial-gradient(800px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.12), rgba(168, 85, 247, 0.05), transparent 70%)`
            : `radial-gradient(800px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.12), rgba(244, 114, 182, 0.06), transparent 72%)`
    );

    const toggleTheme = () => {
        setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="relative min-h-screen overflow-x-hidden font-sans bg-[var(--theme-bg)] text-[var(--theme-text)] selection:bg-[var(--theme-selection-bg)] selection:text-[var(--theme-selection-text)]">
            {/* Cinematic Intro Loader */}
            <AnimatePresence mode="wait">
                {isLoading && (
                    <CinematicLoader theme={theme} onComplete={() => setIsLoading(false)} />
                )}
            </AnimatePresence>

            {/* Immersive SVG Grain Overlay */}
            <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] noise-bg bg-repeat" />

            {/* Dynamic Spotlight Canvas */}
            <motion.div
                className="pointer-events-none fixed inset-0 z-0"
                style={{ background: spotlightBg }}
            />

            {/* Custom Premium Custom Cursor */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-50 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--theme-border)] md:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                    width: hovered ? 80 : 32,
                    height: hovered ? 80 : 32,
                    backgroundColor: hovered
                        ? (theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.06)')
                        : 'transparent',
                    transition: 'width 0.25s cubic-bezier(0.23, 1, 0.32, 1), height 0.25s cubic-bezier(0.23, 1, 0.32, 1), background-color 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
                }}
            />
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-50 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--theme-text)] md:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            />

            {/* Header Header Navigation */}
            <header className="fixed left-0 top-0 z-40 flex w-full items-center justify-between px-6 py-6 md:px-12 md:py-8">
                <div className="flex w-full items-center justify-between gap-4 rounded-full border border-[color:var(--theme-border-soft)] bg-[var(--theme-header)] px-4 py-3 shadow-[var(--theme-shadow)] backdrop-blur-xl md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center gap-2 cursor-pointer font-bold tracking-widest text-lg md:text-xl group"
                        onClick={() => scrollToSection(0)}
                    >
                        <Compass className="w-5 h-5 text-indigo-400 transition-transform duration-700 group-hover:rotate-180" />
                        <span>DIMAS.ID</span>
                    </motion.div>

                    {/* Desktop menu items */}
                    <nav className="hidden items-center gap-8 text-sm font-medium tracking-[0.2em] text-[var(--theme-text-muted)] md:flex">
                        {sections.map((sec, idx) => (
                            <button
                                key={sec}
                                onClick={() => scrollToSection(idx)}
                                className={`relative py-1 text-xs transition-colors duration-300 hover:text-[var(--theme-text)] ${activeSection === idx ? 'text-[var(--theme-text)]' : ''}`}
                            >
                                {sec}
                                {activeSection === idx && (
                                    <motion.span
                                        layoutId="navUnderline"
                                        className="absolute bottom-0 left-0 h-[1px] w-full bg-[var(--theme-text)]"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--theme-border)] bg-[var(--theme-bg-panel)] px-3 py-2 text-xs font-semibold tracking-[0.2em] text-[var(--theme-text-soft)] uppercase transition-colors duration-300 hover:bg-[var(--theme-bg-panel-strong)] hover:text-[var(--theme-text)]"
                            aria-label={`Aktifkan ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-500" />}
                            <span className="hidden sm:inline">{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
                        </button>

                        {/* Hamburger menu trigger */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="z-50 -mr-2 p-2 text-[var(--theme-text)] transition-colors hover:text-[var(--theme-text-muted)] focus:outline-none md:hidden"
                        >
                            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Left Floating Active Section Tracker */}
            <div className="fixed left-6 md:left-12 bottom-12 z-30 hidden md:flex flex-col gap-6 items-center">
                <div className="text-[10px] font-medium tracking-[0.3em] text-[var(--theme-text-faint)] [writing-mode:vertical-lr] select-none rotate-180">
                    <span className="font-bold text-[var(--theme-text)]">0{activeSection + 1}</span> / 0{sections.length}
                </div>
                <div className="relative h-20 w-[1px] bg-[color:var(--theme-border)]">
                    <motion.div
                        className="absolute top-0 left-0 w-full bg-[var(--theme-text)]"
                        style={{
                            height: `${((activeSection + 1) / sections.length) * 100}%`,
                        }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                </div>
                <div className="text-[9px] tracking-[0.2em] text-[var(--theme-text-faint)] [writing-mode:vertical-lr] select-none">
                    {sections[activeSection]}
                </div>
            </div>

            {/* Right Floating Socials */}
            <div className="fixed right-6 md:right-12 bottom-12 z-30 hidden md:flex flex-col gap-6 items-center text-[var(--theme-text-faint)]">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-[var(--theme-text)]">
                    <GithubIcon className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-[var(--theme-text)]">
                    <LinkedinIcon className="w-4 h-4" />
                </a>
                <a href="mailto:contact@dimas.dev" className="transition-colors duration-300 hover:text-[var(--theme-text)]">
                    <Mail className="w-4 h-4" />
                </a>
                <div className="h-12 w-[1px] bg-[color:var(--theme-border)]" />
                <span className="text-[10px] tracking-[0.3em] font-medium [writing-mode:vertical-lr] select-none">SOCIALS</span>
            </div>

            {/* Mobile Drawer Menu overlay */}
            <motion.div
                initial={false}
                animate={menuOpen ? "open" : "closed"}
                variants={{
                    open: { x: 0, opacity: 1 },
                    closed: { x: '100%', opacity: 0 }
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-40 flex flex-col justify-center px-12 backdrop-blur-xl md:hidden"
                style={{ backgroundColor: 'var(--theme-overlay)' }}
            >
                <div className="flex flex-col gap-8 text-left">
                    {sections.map((sec, idx) => (
                        <button
                            key={sec}
                            onClick={() => scrollToSection(idx)}
                            className="text-4xl font-extrabold tracking-wide text-left relative overflow-hidden group py-2"
                        >
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={menuOpen ? { y: 0 } : { y: "100%" }}
                                transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="block"
                            >
                                <span className="mr-4 text-2xl font-light text-[var(--theme-text-faint)]">0{idx + 1}.</span>
                                <span className={activeSection === idx ? "text-indigo-400" : "text-[var(--theme-text)]"}>{sec}</span>
                            </motion.span>
                        </button>
                    ))}
                </div>

                <div className="absolute bottom-12 left-12 right-12 flex items-center justify-between border-t border-[color:var(--theme-border)] pt-8 text-sm text-[var(--theme-text-muted)]">
                    <span>© 2026 Dimas.</span>
                    <div className="flex gap-4">
                        <a href="https://github.com" className="hover:text-[var(--theme-text)]"><GithubIcon className="w-5 h-5" /></a>
                        <a href="https://linkedin.com" className="hover:text-[var(--theme-text)]"><LinkedinIcon className="w-5 h-5" /></a>
                    </div>
                </div>
            </motion.div>

            {/* Back to top smooth floating button on final section */}
            {activeSection === sections.length - 1 && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => scrollToSection(0)}
                    className="fixed bottom-6 right-6 z-30 rounded-full bg-[var(--theme-text)] p-4 text-[var(--theme-bg)] shadow-2xl transition-transform duration-300 hover:scale-110 focus:outline-none cursor-pointer md:bottom-12 md:right-12"
                >
                    <ArrowUp className="w-5 h-5" />
                </motion.button>
            )}

            {/* Main scrollable layout frame */}
            <main className="relative z-10 w-full">
                {children}
            </main>
        </div>
    );
}

import React from 'react';
import { motion } from 'framer-motion';
import ParallaxSection from '../components/ParallaxSection';
import { Sparkles, ArrowDown } from 'lucide-react';

export default function HeroSection() {
    const title = "AGUS DIMAS";
    const subtitle = "WEB DEVELOPER / INTERACTIVE EXPERIENCE DESIGNER ";

    // Text stagger reveal configurations
    const titleVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            }
        }
    };

    const letterVariants = {
        hidden: { y: 120, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <ParallaxSection id="home">
            {({ yBg, yText, opacityVal }) => (
                <div className="w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between py-24 relative z-10 select-none">

                    {/* Layered Floating Orb Blur (Parallax layer) */}
                    <motion.div
                        style={{ y: yBg, opacity: opacityVal }}
                        className="absolute top-1/4 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-tr from-indigo-500/10 to-purple-500/5 blur-[120px] pointer-events-none"
                    />
                    {/* Hero Content */}
                    <div className="my-auto grid grid-cols-1 items-center gap-12 md:grid-cols-2">

                        {/* LEFT CONTENT */}
                        <div>
                            <motion.h1
                                variants={titleVariants}
                                initial="hidden"
                                animate="visible"
                                style={{ y: yText }}
                                className="text-[14vw] md:text-[6vw] font-black tracking-tight leading-none flex overflow-hidden py-4"
                            >
                                {title.split("").map((letter, i) => (
                                    <motion.span
                                        key={i}
                                        variants={letterVariants}
                                        className="inline-block hover:text-indigo-400 transition-colors duration-300"
                                    >
                                        {letter === " " ? "\u00A0" : letter}
                                    </motion.span>
                                ))}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="mt-4 max-w-md text-[10px] md:text-xs font-medium uppercase leading-relaxed tracking-[0.3em] text-[var(--theme-text-muted)]"
                            >
                                {subtitle}
                            </motion.p>
                        </div>

                        {/* RIGHT SPLINE atau image
                        */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, delay: 0.5 }}
                            className="relative flex h-[320px] w-full items-center justify-center md:h-[500px]"
                        >
                            {/* <div className="h-full w-full overflow-hidden rounded-3xl">
                                <iframe
                                    src="https://my.spline.design/holoblobs-ycjs4ahNS8TYhVVYdznCwAXQ/"
                                    width="100%"
                                    height="100%"
                                    className="scale-110"
                                />
                            </div> */}
                        </motion.div>
                    </div>

                    {/* Bottom layout metadata */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 1.2 }}
                        className="flex items-end justify-between border-t border-[color:var(--theme-border)] pt-8"
                    >
                        <div className="hidden text-[10px] font-medium tracking-[0.2em] text-[var(--theme-text-faint)] md:block">
                            SCROLL DOWN UNTUK SELENGKAPNYA
                        </div>

                        <div className="ml-auto flex cursor-pointer items-center gap-4 text-xs font-semibold tracking-widest text-[var(--theme-text-faint)] transition-colors duration-300 hover:text-[var(--theme-text)] md:ml-0">
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            >
                                <ArrowDown className="w-4 h-4 text-indigo-400" />
                            </motion.div>
                            <span>EXPLORE EXPERIENCE</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </ParallaxSection>
    );
}

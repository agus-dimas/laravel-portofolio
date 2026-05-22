import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ["SELAMAT DATANG", "DI WEBSITE", "PERSONAL PORTFOLIO", "AGUS DIMAS"];

export default function CinematicLoader({ onComplete, theme = 'dark' }) {
    const [index, setIndex] = useState(0);

    // Sequence timer to cycle through each word, ending with the name
    useEffect(() => {
        if (index === words.length - 1) {
            const timer = setTimeout(() => {
                onComplete();
            }, 1100);
            return () => clearTimeout(timer);
        }

        const timer = setTimeout(() => {
            setIndex((prev) => prev + 1);
        }, index === 0 ? 900 : 250); // Hold the first concept longer, then accelerate transition

        return () => clearTimeout(timer);
    }, [index, onComplete]);

    // Opacity animation variants for text stagger transitions
    const textVariants = {
        initial: { opacity: 0, y: 30 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }
        },
        exit: {
            opacity: 0,
            y: -30,
            transition: { duration: 0.3, ease: "easeIn" }
        }
    };

    return (
        <motion.div
            initial={{ y: 0 }}
            exit={{
                y: "-100%",
                transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none"
            style={{
                backgroundColor: theme === 'dark' ? '#050505' : '#f5f7fb',
                color: theme === 'dark' ? '#f8fafc' : '#111827',
            }}
        >
            <div className="relative flex flex-col items-center justify-center p-6 text-center">

                {/* Futuristic ambient dashed rotating compass border */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="w-16 h-16 border border-dashed border-indigo-500/30 rounded-full mb-8 flex items-center justify-center"
                >
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping" />
                </motion.div>

                {/* Staggered text mask animation */}
                <div className="h-16 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={index}
                            variants={textVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="text-3xl md:text-5xl font-black tracking-[0.25em] leading-none uppercase"
                        >
                            {words[index]}
                        </motion.h1>
                    </AnimatePresence>
                </div>

                {/* Sleek coordinate index */}
                <div className="absolute bottom-12 text-[10px] tracking-[0.4em] font-mono font-semibold uppercase text-[color:var(--theme-text-faint)]">
                    biography website
                </div>
            </div>
        </motion.div>
    );
}

import React from 'react';
import { motion, useTransform } from 'framer-motion';
import ParallaxSection from '../components/ParallaxSection';
import { ShieldCheck } from 'lucide-react';

// Subcomponent to handle scroll-linked opacity hook per word
function RevealWord({ word, progress, index, total }) {
    // Map this word's reveal to a specific segment of the section's scroll range
    const start = 0.2 + (index / total) * 0.45;
    const end = start + 0.05;
    const opacity = useTransform(progress, [start, end], [0.12, 1]);

    return (
        <motion.span
            style={{ opacity }}
            className="mr-3 mb-1 inline-block transition-colors duration-300 hover:text-indigo-400 cursor-default"
        >
            {word}
        </motion.span>
    );
}

export default function AboutSection() {
    const text = `Saya fokus pada membangun antarmuka yang bersih, responsif, dan memiliki pengalaman pengguna yang solid. Setiap detail pada front-end saya rancang dengan mempertimbangkan keseimbangan antara estetika, performa, dan kemudahan penggunaan.
Saya terbiasa bekerja dengan pendekatan yang terstruktur, mengutamakan komponen yang reusable, serta memastikan setiap elemen UI berjalan konsisten di berbagai perangkat.`;
    const words = text.split(" ");

    return (
        <ParallaxSection id="about" className="bg-[var(--theme-bg-muted)]">
            {({ scrollYProgress, yBg, yText, opacityVal }) => (
                <div className="w-full h-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-16">

                    {/* Left Columns - Philosophy Statement */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="flex items-center gap-2 text-indigo-400 font-semibold tracking-[0.3em] text-xs uppercase mb-6"
                        >
                            <ShieldCheck className="w-4 h-4" />
                            <span>OUR PHILOSOPHY</span>
                        </motion.div>

                        <h2 className="text-xl font-extrabold tracking-tight leading-relaxed text-[var(--theme-text)] md:text-3xl">
                            {words.map((word, i) => (
                                <RevealWord
                                    key={i}
                                    word={word}
                                    progress={scrollYProgress}
                                    index={i}
                                    total={words.length}
                                />
                            ))}
                        </h2>
                    </div>

                    {/* Right Columns - Depth floating card (Parallax layer) */}
                    <motion.div
                        style={{ y: yBg }}
                        className="lg:col-span-5 hidden lg:flex justify-center items-center relative"
                    >
                        {/* Background glowing circle */}
                        <div className="absolute w-72 h-72 bg-purple-600/10 rounded-full blur-[80px]" />

                        {/* Interactive cinematic geometry glass card */}
                        <motion.div
                            whileHover={{ rotateY: 10, rotateX: -10, scale: 1.02 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative flex h-96 w-80 select-none flex-col justify-between overflow-hidden rounded-2xl border border-[color:var(--theme-border)] bg-[var(--theme-bg-panel)] p-8 backdrop-blur-md"
                            style={{ perspective: 1000, boxShadow: 'var(--theme-shadow)' }}
                        >
                            {/* Inner rotating gradient strip */}
                            <div className="absolute -top-1/2 -left-1/2 w-200% h-200% bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_60%)] animate-spin-slow pointer-events-none" />

                            <div className="flex justify-between items-start">
                                <div className="text-xs font-mono tracking-widest text-[var(--theme-text-faint)]">02 / CORE VALUES</div>
                                <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-ping" />
                            </div>

                            <div className="flex flex-col gap-4">
                                <h3 className="text-2xl font-bold tracking-tight text-[var(--theme-text-soft)]">
                                    Frontend <span className="text-indigo-400">developer</span>
                                </h3>
                                <p className="text-xs leading-relaxed text-[var(--theme-text-muted)]">
                                    Leveraging modern rendering frameworks, GPU-bound transitions, and micro-interactions, we turn boring layouts into unforgettable cinematic web statements.
                                </p>
                            </div>

                            <div className="flex items-center justify-between text-[10px] font-semibold tracking-widest text-[var(--theme-text-faint)]">
                                <span>AWARDS & RECOGNITION</span>
                                <span>2026 EDITION</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </ParallaxSection>
    );
}

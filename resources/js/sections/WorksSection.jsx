import React, { useRef, useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import ParallaxSection from '../components/ParallaxSection';
import { Briefcase, ArrowUpRight } from 'lucide-react';

// Subcomponent to handle local 3D card tilt based on mouse hover coordinates
function ProjectCard({ project, index, scrollYProgress }) {
    const cardRef = useRef(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;

        // Map mouse offsets to degrees of tilt
        const rX = -(mouseY / height) * 15; // Max 15 degrees
        const rY = (mouseX / width) * 15;

        setRotateX(rX);
        setRotateY(rY);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    // Apply different parallax scrolling rates for each card for layered speed effects
    const ySpeed = [ -60, 40, -10 ];
    const yVal = useTransform(scrollYProgress, [0, 1], [ySpeed[index], -ySpeed[index]]);

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                y: yVal,
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: 'preserve-3d',
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="group relative flex w-full max-w-[340px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-[color:var(--theme-border)] bg-[var(--theme-bg-panel)] p-6 backdrop-blur-sm md:h-[460px]"
            whileHover={{ scale: 1.01 }}
        >
            {/* Project Image Overlay Reveal */}
            <div
                className="absolute inset-0 z-0 opacity-80 transition-opacity duration-500 group-hover:opacity-60"
                style={{
                    background: 'linear-gradient(to top, var(--theme-bg), color-mix(in oklab, var(--theme-bg) 78%, transparent), transparent)',
                }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_100%)] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Mock abstract geometric graphics inside card representing the project */}
            <div className="absolute -top-1/4 -right-1/4 w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            <div className="relative z-10 flex justify-between items-start">
                <div className="text-indigo-400 text-xs font-semibold tracking-wider font-mono">0{index + 1} / FEATURED</div>
                <div className="flex gap-2">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[var(--theme-card)] p-2 text-[var(--theme-text-muted)] transition-colors duration-300 hover:bg-[var(--theme-card-hover)] hover:text-[var(--theme-text)]">
                        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Giant abstract canvas representing core tech */}
            <div className="relative z-10 my-8 flex items-center justify-center h-32 select-none pointer-events-none">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-[color:var(--theme-border-soft)] transition-all duration-700 group-hover:rotate-45 group-hover:border-indigo-500/40">
                    <div className={`absolute w-12 h-12 rounded-full bg-gradient-to-tr ${project.color} opacity-40 group-hover:scale-125 transition-transform duration-500`} />
                </div>
            </div>

            <div className="relative z-10 flex flex-col gap-3">
                <div className="flex justify-between items-end">
                    <h3 className="text-2xl font-bold tracking-tight text-[var(--theme-text)] transition-colors duration-300 group-hover:text-indigo-300">
                        {project.title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 text-[var(--theme-text-faint)] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--theme-text)]" />
                </div>
                <p className="text-xs font-light leading-relaxed text-[var(--theme-text-muted)]">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((t) => (
                        <span key={t} className="rounded-full border border-[color:var(--theme-border-soft)] bg-[var(--theme-card)] px-2.5 py-1 text-[9px] font-mono tracking-widest text-[var(--theme-text-soft)] uppercase">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function WorksSection() {
    const projects = [
        {
            title: "Nexus OS",
            description: "A spatial browser engine and custom dynamic layout sandbox utilizing WebGL shaders and state synchronization.",
            tags: ["React", "Three.js", "Vite", "Framer Motion"],
            color: "from-indigo-600 to-indigo-400",
        },
        {
            title: "Kinetix API",
            description: "A high-performance event broker and caching system that handles micro-millisecond request flows with Laravel Sanctum.",
            tags: ["Laravel", "Redis", "Sanctum", "API Engine"],
            color: "from-purple-600 to-purple-400",
        },
        {
            title: "Ethereal Art",
            description: "A rich WebGL 3D virtual exhibition experience displaying structural geometric architectures and fluid audio engines.",
            tags: ["React JSX", "GLSL", "Node.js", "Web Audio"],
            color: "from-pink-600 to-indigo-500",
        }
    ];

    return (
        <ParallaxSection id="works" className="bg-[var(--theme-bg)]">
            {({ scrollYProgress }) => (
                <div className="w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between py-20 relative z-10">
                    
                    {/* Top subheader */}
                    <div className="flex items-center justify-between border-b border-[color:var(--theme-border)] pb-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="flex items-center gap-2 text-indigo-400 font-semibold tracking-[0.3em] text-xs uppercase"
                        >
                            <Briefcase className="w-4 h-4" />
                            <span>SELECTED CREATIONS</span>
                        </motion.div>
                        <div className="hidden text-xs font-mono tracking-wider text-[var(--theme-text-faint)] md:block">
                            03 / 05 SCREEN
                        </div>
                    </div>

                    {/* Three Columns - Project stack with depth scrolling rates */}
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-6 justify-between items-center my-auto w-full pt-10 lg:pt-0">
                        {projects.map((project, idx) => (
                            <ProjectCard
                                key={project.title}
                                project={project}
                                index={idx}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                    </div>

                    {/* Bottom layout metadata */}
                    <div className="pt-6 text-center text-[10px] font-medium tracking-[0.2em] text-[var(--theme-text-faint)] md:text-left">
                        INTERACT WITH ITEMS TO SHIFT 3D PERSPECTIVE
                    </div>
                </div>
            )}
        </ParallaxSection>
    );
}

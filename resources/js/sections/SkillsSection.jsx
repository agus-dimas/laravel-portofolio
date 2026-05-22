import React from 'react';
import { motion } from 'framer-motion';
import ParallaxSection from '../components/ParallaxSection';
import { Cpu, Layout, Server, Database, Activity } from 'lucide-react';

export default function SkillsSection() {
    const skillCategories = [
        {
            title: "Frontend",
            icon: Layout,
            subtitle: "Interactive UI",
            items: ["React JSX", "Framer Motion", "TailwindCSS v4", "Vite Bundler"],
            color: "group-hover:border-blue-500/30",
            glow: "from-blue-500/5 to-transparent",
        },
        {
            title: "Backend",
            icon: Server,
            subtitle: "Robust Logic",
            items: ["Laravel Framework", "RESTful & JSON APIs", "Sanctum Security", "MVC / Clean Arch"],
            color: "group-hover:border-purple-500/30",
            glow: "from-purple-500/5 to-transparent",
        },
        {
            title: "Database",
            icon: Database,
            subtitle: "Structured Data",
            items: ["PostgreSQL / MySQL", "Redis Caching", "Eloquent ORM", "Query Tuning"],
            color: "group-hover:border-emerald-500/30",
            glow: "from-emerald-500/5 to-transparent",
        },
        {
            title: "Performance",
            icon: Activity,
            subtitle: "Cinematic Speed",
            items: ["Hardware Accel", "Lazy Loading", "Dynamic Bundles", "FPS Optimization"],
            color: "group-hover:border-rose-500/30",
            glow: "from-rose-500/5 to-transparent",
        }
    ];

    // Grid container animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <ParallaxSection id="skills" className="bg-[var(--theme-bg-muted)]">
            {({ yBg, opacityVal }) => (
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
                            <Cpu className="w-4 h-4" />
                            <span>ENGINEERING MASTERY</span>
                        </motion.div>
                        <div className="hidden text-xs font-mono tracking-wider text-[var(--theme-text-faint)] md:block">
                            04 / 05 SCREEN
                        </div>
                    </div>

                    {/* Staggered Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-auto pt-8 lg:pt-0"
                    >
                        {skillCategories.map((cat) => {
                            const Icon = cat.icon;
                            return (
                                <motion.div
                                    key={cat.title}
                                    variants={cardVariants}
                                    className={`group relative flex h-[280px] flex-col justify-between overflow-hidden rounded-2xl border border-[color:var(--theme-border-soft)] bg-[var(--theme-bg-panel)] p-6 transition-all duration-500 hover:bg-[var(--theme-bg-panel-strong)] ${cat.color}`}
                                >
                                    {/* Subtle Ambient Radial Glow */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                                    <div className="flex justify-between items-start relative z-10">
                                        <div className="rounded-xl border border-[color:var(--theme-border-soft)] bg-[var(--theme-card)] p-3 text-[var(--theme-text-muted)] transition-all duration-500 group-hover:border-indigo-500/20 group-hover:bg-indigo-500/10 group-hover:text-[var(--theme-text)]">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-[9px] font-mono tracking-widest text-[var(--theme-text-faint)] transition-colors duration-300 group-hover:text-indigo-400/80">
                                            {cat.subtitle.toUpperCase()}
                                        </span>
                                    </div>

                                    <div className="relative z-10 flex flex-col gap-4">
                                        <h3 className="text-xl font-bold tracking-tight text-[var(--theme-text-soft)]">
                                            {cat.title}
                                        </h3>
                                        <div className="flex flex-col gap-2">
                                            {cat.items.map((item) => (
                                                <div key={item} className="flex items-center gap-2 text-xs font-light text-[var(--theme-text-muted)]">
                                                    <span className="w-1 h-1 rounded-full bg-indigo-500/60" />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Bottom layout metadata */}
                    <div className="pt-6 text-center text-[10px] font-medium tracking-[0.2em] text-[var(--theme-text-faint)] md:text-left">
                        SCALING SYSTEM THREADS: LAZY RENDER CYCLES ENABLED
                    </div>
                </div>
            )}
        </ParallaxSection>
    );
}

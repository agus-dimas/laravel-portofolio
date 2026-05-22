import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Reusable full-screen 100vh parallax section wrapper
 * Exposes scroll motion values via render-prop pattern
 */
export default function ParallaxSection({ children, className = '', id = '' }) {
    const containerRef = useRef(null);

    // Track scroll progress of the section relative to viewport
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Default parallax transformations (slow background, medium text, ambient opacity)
    const yBg = useTransform(scrollYProgress, [0, 1], [-150, 150]);
    const yText = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    const opacityVal = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            ref={containerRef}
            id={id}
            className={`relative w-screen h-screen flex items-center justify-center overflow-hidden border-b border-[color:var(--theme-border-soft)] snap-start ${className}`}
        >
            {/* Expose scroll metrics via render prop function or standard React nodes */}
            <div className="w-full h-full relative flex items-center justify-center">
                {typeof children === 'function'
                    ? children({ scrollYProgress, yBg, yText, opacityVal })
                    : children
                }
            </div>
        </section>
    );
}

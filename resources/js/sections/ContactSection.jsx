import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ParallaxSection from '../components/ParallaxSection';
import { Send, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactSection() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (response.ok) {
                setStatus('success');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus('error');
        }
    };

    return (
        <ParallaxSection id="contact" className="bg-[var(--theme-bg)]">
            {({ yBg, opacityVal }) => (
                <div className="w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between py-24 relative z-10">

                    {/* Top subheader */}
                    <div className="flex items-center justify-between border-b border-[color:var(--theme-border)] pb-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="flex items-center gap-2 text-indigo-400 font-semibold tracking-[0.3em] text-xs uppercase"
                        >
                            <Send className="w-4 h-4" />
                            <span>CONNECTION PORTAL</span>
                        </motion.div>
                        <div className="hidden text-xs font-mono tracking-wider text-[var(--theme-text-faint)] md:block">
                            05 / 05 SCREEN
                        </div>
                    </div>

                    {/* Main Split Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-auto items-center pt-8 lg:pt-0">

                        {/* Left Column - Kinetic Text Call-to-action */}
                        <div className="lg:col-span-6 flex flex-col gap-6">
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-[6vw] font-black uppercase leading-none tracking-tighter text-[var(--theme-text)] lg:text-[4vw]"
                            >
                                Terbuka untuk <br />
                                <span className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 cursor-default">kolaborasi</span> <br />
                                profesional.
                            </motion.h2>

                            <p className="max-w-md text-sm font-light leading-relaxed text-[var(--theme-text-muted)]">
                                Have an exciting project, a high-throughput backend architecture need, or a premium design aesthetic idea? Drop a message below, and let's collaborate.
                            </p>

                            <div className="flex flex-col gap-3 text-xs tracking-[0.15em] font-semibold text-indigo-400 mt-2 font-mono">
                                <a href="mailto:contact@dimas.dev" className="group flex w-fit items-center gap-2 transition-colors duration-300 hover:text-[var(--theme-text)]">
                                    <span>CONTACT@DIMAS.DEV</span>
                                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                                <span className="font-light text-[var(--theme-text-faint)]">JAKARTA, ID / UTC+7</span>
                            </div>
                        </div>

                        {/* Right Column - Interactive Form Panel */}
                        <div className="lg:col-span-6">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                                className="relative overflow-hidden rounded-2xl border border-[color:var(--theme-border)] bg-[var(--theme-bg-panel)] p-8 shadow-2xl backdrop-blur-sm"
                            >
                                {/* Form Radial Light Background */}
                                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-indigo-500/5 blur-[80px] pointer-events-none" />

                                {status === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center text-center py-12 gap-4"
                                    >
                                        <CheckCircle2 className="w-12 h-12 text-indigo-400" />
                                        <h3 className="text-xl font-bold tracking-tight">Transmission Received</h3>
                                        <p className="max-w-xs text-xs leading-relaxed text-[var(--theme-text-muted)]">
                                            Your message has successfully flown through our endpoints. I will review and follow up shortly.
                                        </p>
                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="mt-4 rounded-full border border-[color:var(--theme-border)] px-6 py-2 text-xs font-semibold tracking-widest transition-colors duration-300 hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)]"
                                        >
                                            SEND ANOTHER MESSAGE
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--theme-text-faint)] font-mono">YOUR NAME</label>
                                            <input
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="John Doe"
                                                disabled={status === 'sending'}
                                                className="w-full rounded-xl border border-[color:var(--theme-border-soft)] bg-[var(--theme-card)] px-4 py-3 text-sm text-[var(--theme-text)] placeholder-[var(--theme-text-faint)] transition-all duration-300 focus:border-indigo-500/50 focus:bg-[var(--theme-bg-panel-strong)] focus:outline-none"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--theme-text-faint)] font-mono">EMAIL ADDRESS</label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="john@example.com"
                                                disabled={status === 'sending'}
                                                className="w-full rounded-xl border border-[color:var(--theme-border-soft)] bg-[var(--theme-card)] px-4 py-3 text-sm text-[var(--theme-text)] placeholder-[var(--theme-text-faint)] transition-all duration-300 focus:border-indigo-500/50 focus:bg-[var(--theme-bg-panel-strong)] focus:outline-none"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--theme-text-faint)] font-mono">MESSAGE</label>
                                            <textarea
                                                required
                                                rows={4}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder="Describe your vision..."
                                                disabled={status === 'sending'}
                                                className="w-full resize-none rounded-xl border border-[color:var(--theme-border-soft)] bg-[var(--theme-card)] px-4 py-3 text-sm text-[var(--theme-text)] placeholder-[var(--theme-text-faint)] transition-all duration-300 focus:border-indigo-500/50 focus:bg-[var(--theme-bg-panel-strong)] focus:outline-none"
                                            />
                                        </div>

                                        {status === 'error' && (
                                            <div className="flex items-center gap-2 text-rose-400 text-xs font-medium">
                                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                                <span>Endpoint failure. Please email me directly instead.</span>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === 'sending'}
                                            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--theme-text)] py-4 text-xs font-semibold tracking-[0.2em] text-[var(--theme-bg)] uppercase shadow-lg transition-all duration-500 hover:bg-indigo-400 hover:text-white active:scale-[0.98]"
                                        >
                                            <span>{status === 'sending' ? 'TRANSMITTING...' : 'SEND MESSAGE'}</span>
                                            {status !== 'sending' && <Send className="w-3.5 h-3.5" />}
                                        </button>
                                    </form>
                                )}
                            </motion.div>
                        </div>
                    </div>

                    {/* Bottom sleek footer */}
                    <div className="flex flex-col items-center justify-between gap-4 border-t border-[color:var(--theme-border)] pt-8 text-[10px] font-medium tracking-[0.2em] text-[var(--theme-text-faint)] md:flex-row">
                        <span>© 2026 DIMAS. ALL RIGHTS RESERVED.</span>
                        <div className="flex gap-6">
                            <span>MADE WITH LARAVEL + REACT</span>
                            <span className="hidden md:inline">•</span>
                            <span>TAILWIND CSS</span>
                        </div>
                    </div>
                </div>
            )}
        </ParallaxSection>
    );
}

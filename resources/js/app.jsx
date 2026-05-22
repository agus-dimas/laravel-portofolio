import React from 'react';
import { createRoot } from 'react-dom/client';
import MainLayout from './layouts/MainLayout';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import WorksSection from './sections/WorksSection';
import SkillsSection from './sections/SkillsSection';
import ContactSection from './sections/ContactSection';

function App() {
    return (
        <MainLayout>
            <HeroSection />
            <AboutSection />
            <WorksSection />
            <SkillsSection />
            <ContactSection />
        </MainLayout>
    );
}

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

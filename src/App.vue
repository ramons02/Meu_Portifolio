<script setup lang="ts">
import Navbar from './components/layout/Navbar.vue';
import HeroSection from './components/sections/HeroSection.vue';
import AboutSection from './components/sections/AboutSection.vue';
import EducationSection from './components/sections/EducationSection.vue';
import SkillsSection from './components/sections/SkillsSection.vue';
import Projects from './components/sections/Projects.vue';
import Contact from './components/sections/Contact.vue';
import Footer from './components/layout/Footer.vue';
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-indigo-500/30">
    <Navbar />

    <main>
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <SkillsSection />
      <Projects />
      <Contact />
    </main>

    <Footer />
  </div>
</template>

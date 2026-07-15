<script setup lang="ts">
import Navbar from './components/layout/Navbar.vue';
import HeroSection from './components/sections/HeroSection.vue';
import AboutSkills from './components/sections/AboutSkills.vue';
import Projects from './components/sections/Projects.vue';
import Contact from './components/sections/Contact.vue';
import Footer from './components/layout/Footer.vue';
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-indigo-500/30">
    <Navbar />
    
    <main>
      <HeroSection />
      <AboutSkills />
      <Projects />
      <Contact />
    </main>

    <Footer />
  </div>
</template>

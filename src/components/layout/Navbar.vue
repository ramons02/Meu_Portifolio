<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const navLinks = [
  { name: 'Início', href: '#hero' },
  { name: 'Sobre', href: '#about' },
  { name: 'Formação', href: '#education' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Contato', href: '#contact' }
];

const checkScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<template>
  <nav 
    :class="[
      'fixed w-full top-0 z-50 transition-all duration-300 border-b',
      isScrolled ? 'bg-slate-900/80 backdrop-blur-md border-white/10 py-3 shadow-lg' : 'bg-transparent border-transparent py-5'
    ]"
  >
    <div class="container mx-auto px-6 max-w-6xl">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <a href="#hero" class="text-xl font-bold tracking-tighter text-white z-50">
          Dev<span class="text-indigo-500">Portfolio</span>
        </a>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <a 
            v-for="link in navLinks" 
            :key="link.name" 
            :href="link.href"
            class="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
          >
            {{ link.name }}
          </a>
        </div>

        <!-- Mobile Menu Toggle -->
        <button 
          @click="toggleMobileMenu" 
          class="md:hidden text-slate-300 hover:text-white focus:outline-none z-50"
          aria-label="Toggle menu"
        >
          <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div 
      v-if="isMobileMenuOpen" 
      class="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-40 md:hidden pt-24 px-6"
    >
      <div class="flex flex-col space-y-6">
        <a 
          v-for="link in navLinks" 
          :key="link.name" 
          :href="link.href"
          @click="closeMobileMenu"
          class="text-xl font-medium text-slate-300 hover:text-white border-b border-white/5 pb-4 transition-colors duration-200"
        >
          {{ link.name }}
        </a>
      </div>
    </div>
  </nav>
</template>

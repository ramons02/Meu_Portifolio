<script setup lang="ts">
import { ref } from 'vue';

const resumePreviewUrl = `${import.meta.env.BASE_URL}curriculo-online.html`;
const profileImageFailed = ref(false);
</script>

<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
    <!-- Efeitos de Fundo (Blur/Glow) -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="container mx-auto px-6 max-w-6xl relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-16">
        
        <!-- Text Content -->
        <div class="w-full lg:w-3/5 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Disponível para novos projetos
          </div>
          
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            Discente de <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">
              Análise e Desenvolvimento de Sistemas
            </span>
          </h1>

          <div class="flex justify-center lg:justify-start mb-10">
            <div class="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              <div class="absolute inset-0 border-2 border-slate-800 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div class="absolute inset-4 border-2 border-indigo-500/30 rounded-full border-t-indigo-500 animate-[spin_15s_linear_infinite_reverse]"></div>
              <div class="absolute inset-8 rounded-full bg-slate-800 overflow-hidden border border-white/10 flex items-center justify-center">
                <img
                  v-if="!profileImageFailed"
                  src="/profile.jpg"
                  alt="Ramon Silva"
                  class="w-full h-full object-cover"
                  @error="profileImageFailed = true"
                />
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
            </div>
          </div>
          
          <p class="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl font-light leading-relaxed">
            Discente do 4º período de Análise e Desenvolvimento de Sistemas (ADS). Com 2 anos de experiência como Network Infrastructure & Support Analyst, agora focado em construir a carreira como Desenvolvedor Full-Stack.
          </p>
          
          <div class="flex flex-col sm:flex-row flex-wrap items-center gap-4 justify-center lg:justify-start">
            <a 
              href="#projects" 
              class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-200 transition-all duration-300 hover:scale-105 text-center"
            >
              Ver Projetos
            </a>
            <a 
              href="#contact" 
              class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 border border-slate-700 transition-all duration-300 hover:scale-105 text-center"
            >
              Contato
            </a>
            <a 
              :href="resumePreviewUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 border border-indigo-500 transition-all duration-300 hover:scale-105 text-center"
              title="Baixar CV"
            >
              Baixar CV
            </a>
          </div>
        </div>


      </div>
    </div>
  </section>
</template>

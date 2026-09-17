<script setup lang="ts">
import { ref } from 'vue';
import TiltCard from '../common/TiltCard.vue';

const education = ref({
  course: 'Análise e Desenvolvimento de Sistemas (ADS)',
  institution: 'Faculdade SENAI FATESG',
  status: 'Cursando — 4º período',
  period: '02/2025 — 12/2027'
});
</script>

<template>
  <section id="education" class="py-24">
    <div class="container mx-auto px-6 max-w-4xl">
      <h2 v-reveal3d class="text-3xl md:text-4xl font-bold text-white mb-10 tracking-tight">Formação</h2>

      <!-- Entrada 3D no wrapper, tilt de hover no TiltCard interno: cada um
           controla seu próprio transform, sem disputar o mesmo elemento. -->
      <div v-reveal3d="{ delay: 0.1 }">
        <TiltCard as="div" :intensity="6" class="bg-slate-800/50 border border-white/5 rounded-2xl p-8 transition-colors duration-300 hover:border-indigo-500/30">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <h3 class="text-xl font-medium text-white">{{ education.course }}</h3>
            <span class="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 self-start sm:self-auto">
              {{ education.status }}
            </span>
          </div>
          <p class="text-slate-400 font-light">{{ education.institution }}</p>
          <p class="text-slate-500 text-sm mt-1">{{ education.period }}</p>
        </TiltCard>
      </div>
    </div>
  </section>
</template>

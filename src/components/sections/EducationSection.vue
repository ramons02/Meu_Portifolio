<script setup lang="ts">
import { ref } from 'vue';

const education = ref({
  course: 'Análise e Desenvolvimento de Sistemas (ADS)',
  status: 'Cursando — 4º período',
  period: '02/2025 — 12/2027'
});
</script>

<template>
  <section id="education" class="py-24">
    <div class="container mx-auto px-6 max-w-4xl">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-10 tracking-tight">Formação</h2>

      <div class="bg-slate-800/50 border border-white/5 rounded-2xl p-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <h3 class="text-xl font-medium text-white">{{ education.course }}</h3>
          <span class="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 self-start sm:self-auto">
            {{ education.status }}
          </span>
        </div>
        <p class="text-slate-400 font-light">{{ education.period }}</p>
      </div>
    </div>
  </section>
</template>

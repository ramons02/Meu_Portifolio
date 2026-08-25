<script setup lang="ts">
import { ref } from 'vue';

// TODO: preencher com o nome real da instituição e a previsão de conclusão.
const education = ref({
  institution: '[Nome da instituição]',
  course: 'Análise e Desenvolvimento de Sistemas (ADS)',
  status: 'Cursando — 4º período',
  expectedCompletion: '[Previsão de conclusão]'
});

// TODO: substituir pela lista real de cursos/plataformas usados (documentação oficial, YouTube, Alura, etc).
const complementaryStudies = ref<string[]>([
  '[Curso/plataforma — ex: Documentação oficial]',
  '[Curso/plataforma — ex: YouTube]',
  '[Curso/plataforma — ex: Alura]'
]);
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
        <p class="text-slate-400 font-light">{{ education.institution }}</p>
        <p class="text-slate-500 text-sm mt-1">Previsão de conclusão: {{ education.expectedCompletion }}</p>

        <!-- Estudos complementares -->
        <div class="mt-8 pt-8 border-t border-white/5">
          <h4 class="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Estudos complementares</h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="study in complementaryStudies"
              :key="study"
              class="text-sm font-medium px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700"
            >
              {{ study }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

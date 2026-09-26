<script setup lang="ts">
import { ref } from 'vue';
import TiltCard from '../common/TiltCard.vue';

const education = ref({
  course: 'Análise e Desenvolvimento de Sistemas (ADS)',
  institution: 'Faculdade SENAI FATESG',
  status: 'Cursando — 4º período',
  period: '02/2025 — 12/2027'
});

const certifications = ref([
  {
    course: 'Manutenção de Computadores e Redes',
    institution: 'Elite Cursos e Treinamentos',
    hours: '60 horas-aula',
    period: '06/11/2024 — 17/01/2025',
    image: '/certificates/manutencao-computadores-redes.jpg',
    verifyUrl: 'https://www.elitecursos.com.br'
  }
]);
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

      <h3 v-reveal3d="{ delay: 0.15 }" class="text-xl font-medium text-white mt-14 mb-6">Certificações</h3>

      <div
        v-for="(cert, index) in certifications"
        :key="cert.course"
        v-reveal3d="{ delay: 0.2 + index * 0.05 }"
      >
        <TiltCard
          as="a"
          :href="cert.image"
          target="_blank"
          rel="noopener noreferrer"
          :intensity="6"
          class="flex flex-col sm:flex-row gap-5 bg-slate-800/50 border border-white/5 rounded-2xl p-6 transition-colors duration-300 hover:border-indigo-500/30"
        >
          <img
            :src="cert.image"
            :alt="`Certificado de ${cert.course}`"
            class="w-full sm:w-40 h-28 object-cover rounded-lg border border-white/10 shrink-0"
            loading="lazy"
          />
          <div class="min-w-0">
            <h4 class="text-lg font-medium text-white">{{ cert.course }}</h4>
            <p class="text-slate-400 font-light">{{ cert.institution }}</p>
            <p class="text-slate-500 text-sm mt-1">{{ cert.period }} · {{ cert.hours }}</p>
          </div>
        </TiltCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { SkillCategory } from '../../types';

const skillCategories = ref<SkillCategory[]>([
  {
    title: 'Backend',
    skills: [
      { name: 'Java', level: 'Intermediário' },
      { name: 'Spring Boot', level: 'Iniciante' },
      { name: 'Node.js', level: 'Iniciante' },
      { name: 'REST APIs', level: 'Iniciante' },
      { name: 'PostgreSQL', level: 'Iniciante' }
    ]
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'Angular', level: 'Iniciante' },
      { name: 'React', level: 'Iniciante' }
    ]
  },
  {
    title: 'Ferramentas & IA',
    skills: [
      { name: 'Git & GitHub', level: 'Iniciante' },
      { name: 'Docker', level: 'Iniciante' },
      { name: 'Claude Code', level: 'Iniciante' },
      { name: 'IA & Prompting (LLMs, Tasks)', level: 'Iniciante' }
    ]
  }
]);
</script>

<template>
  <section id="about" class="py-24 bg-slate-900/50">
    <div class="container mx-auto px-6 max-w-6xl">
      <div class="flex flex-col lg:flex-row gap-16">
        
        <!-- About Text -->
        <div class="w-full lg:w-1/2">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">Sobre</h2>
          <div class="space-y-4 text-slate-400 leading-relaxed font-light text-lg mb-8">
            <p>
              Sou discente do 4º período de Análise e Desenvolvimento de Sistemas (ADS), com foco no desenvolvimento de software e no aprimoramento contínuo das minhas habilidades técnicas.
            </p>
            <p>
              Apaixonado por tecnologia, busco desenvolver soluções escaláveis, eficientes e de alta qualidade, aplicando boas práticas de engenharia de software, como SOLID, Clean Code e Clean Architecture. Também utilizo ferramentas modernas, incluindo Inteligência Artificial Generativa, para aumentar a produtividade e criar soluções mais inovadoras.
            </p>
            <p>
              Meu objetivo é evoluir constantemente como desenvolvedor, contribuindo para projetos que gerem impacto real por meio de código limpo, arquitetura bem estruturada e aprendizado contínuo.
            </p>
          </div>

          <!-- Timeline / Experiência -->
          <div class="mt-10 border-l-2 border-indigo-500/30 pl-6 relative">
            <div class="absolute w-3 h-3 bg-indigo-500 rounded-full -left-[7px] top-1.5"></div>
            <h3 class="text-xl font-medium text-white mb-1">Network Infrastructure & Support Analyst</h3>
            <span class="text-indigo-400 text-sm font-semibold block mb-3">Experiência Corporativa Atual (2 anos)</span>
            <p class="text-slate-400 font-light leading-relaxed text-base">
              Atuação direta na interface estratégica entre Infraestrutura e Desenvolvimento de Sistemas. Experiência robusta com diagnóstico técnico, troubleshooting avançado e otimização de fluxos operacionais — habilidades cruciais que levo para o desenvolvimento de software.
            </p>
          </div>
        </div>

        <!-- Skills Grid -->
        <div class="w-full lg:w-1/2">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">Stack Principal</h2>
          
          <div class="space-y-8">
            <div v-for="category in skillCategories" :key="category.title">
              <h3 class="text-xl font-medium text-slate-200 mb-4 border-b border-white/10 pb-2">{{ category.title }}</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div 
                  v-for="skill in category.skills" 
                  :key="skill.name"
                  class="bg-slate-800/50 border border-white/5 rounded-lg p-3 hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center text-center group"
                >
                  <span class="text-slate-300 font-medium group-hover:text-white transition-colors">{{ skill.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

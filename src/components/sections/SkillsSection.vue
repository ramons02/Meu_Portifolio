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
  <section id="skills" class="py-24 bg-slate-900/50">
    <div class="container mx-auto px-6 max-w-4xl">
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
  </section>
</template>

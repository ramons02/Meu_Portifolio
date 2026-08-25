<script setup lang="ts">
import { ref } from 'vue';
import type { Project } from '../../types';
import ProjectCard from '../common/ProjectCard.vue';

const projects = ref<Project[]>([
  {
    id: 1,
    title: 'FisioClinic',
    description: 'Sistema full-stack de gestão para clínica de fisioterapia. Autenticação com controle de acesso, cadastro e acompanhamento de pacientes, gestão de sessões e agenda. API REST robusta com Spring Boot e interface reativa em Angular.',
    imageUrl: '/fisioclinic.png',
    technologies: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL'],
    githubUrl: 'https://github.com/ramons02/Clinica_fisio.back',
    demoUrl: 'https://fisioapp-nu.vercel.app/'
  }
]);
</script>

<template>
  <section id="projects" class="py-24">
    <div class="container mx-auto px-6 max-w-6xl">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Projetos em Destaque</h2>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto font-light">
          Uma seleção de projetos recentes que demonstram minhas habilidades técnicas e foco em experiência do usuário.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard 
          v-for="project in projects" 
          :key="project.id" 
          :project="project" 
        />
      </div>
    </div>
  </section>
</template>

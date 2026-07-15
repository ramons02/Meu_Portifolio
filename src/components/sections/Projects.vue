<script setup lang="ts">
import { ref } from 'vue';
import type { Project } from '../../types';
import ProjectCard from '../common/ProjectCard.vue';

const projects = ref<Project[]>([
  {
    id: 1,
    title: 'Avcar',
    description: 'Sistema de gestão de frota automotiva focado em performance. Implementação de arquitetura baseada em microsserviços simulados, injeção de dependências robusta com Spring Boot e interfaces interativas e reativas com Angular.',
    technologies: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL'],
    githubUrl: 'https://github.com/ramons02/av_car'
  },
  {
    id: 2,
    title: 'Hupsteste',
    description: 'Plataforma para execução e monitoramento de rotinas de testes. Aplicação de princípios SOLID e Clean Code para assegurar resiliência das rotas, com backend robusto integrado e controle de concorrência no banco de dados.',
    technologies: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL'],
    githubUrl: 'https://github.com/ramons02/hupsteste_back'
  },
  {
    id: 3,
    title: 'Joelho Time',
    description: 'Aplicativo para gerenciamento de tempo de reabilitação e exercícios de fisioterapia para joelhos. Desenvolvimento full-stack com foco em UX, controle de sessões, histórico de treinos e integração com relatórios técnicos.',
    technologies: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL'],
    githubUrl: 'https://github.com/ramons02/JoelhoTimer'
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

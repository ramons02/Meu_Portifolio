<script setup lang="ts">
import { ref } from 'vue';
import type { Project } from '../../types';
import ProjectCard from '../common/ProjectCard.vue';

const projects = ref<Project[]>([
  {
    id: 1,
    title: 'FisioClinic',
    description: 'Sistema completo de gestão para clínicas de fisioterapia e pilates: cadastro de pacientes e profissionais, planos mensais, agenda de sessões, evolução clínica, faturamento e dashboard financeiro. Arquitetura com 10 entidades e 14 regras de negócio documentadas. Autenticação JWT + BCrypt com controle de acesso por perfil (RBAC — Admin, Recepcionista, Fisioterapeuta). 74 tarefas concluídas ao longo de 6 fases de implementação.',
    imageUrl: '/fisioclinic.png',
    technologies: ['Java 21', 'Spring Boot 3.3', 'React', 'PostgreSQL'],
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

      <div class="flex flex-wrap justify-center gap-8">
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
          class="w-full sm:w-[380px]"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Project } from '../../types';

defineProps<{
  project: Project;
}>();
</script>

<template>
  <div class="group flex flex-col rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
    <!-- Image Placeholder or Actual Image -->
    <div class="h-48 bg-slate-800 w-full overflow-hidden relative">
      <img 
        v-if="project.imageUrl" 
        :src="project.imageUrl" 
        :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-slate-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6 flex flex-col flex-grow">
      <h3 class="text-xl font-semibold text-white mb-2">{{ project.title }}</h3>
      <p class="text-slate-400 text-sm mb-4 flex-grow">{{ project.description }}</p>
      
      <!-- Tech Badges -->
      <div class="flex flex-wrap gap-2 mb-6">
        <span 
          v-for="tech in project.technologies" 
          :key="tech"
          class="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700"
        >
          {{ tech }}
        </span>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3 mt-auto">
        <a 
          v-if="project.demoUrl" 
          :href="project.demoUrl" 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex-1 text-center py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors duration-300"
        >
          Demonstração
        </a>
        <a 
          v-if="project.githubUrl" 
          :href="project.githubUrl" 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex-1 text-center py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition-colors duration-300 flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          Código
        </a>
      </div>
    </div>
  </div>
</template>

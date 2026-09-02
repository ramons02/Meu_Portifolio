<script setup lang="ts">
import { ref } from 'vue';

const resumeRef = ref<HTMLElement | null>(null);

async function downloadPdf() {
  const html2pdf = (await import('html2pdf.js')).default;
  if (!resumeRef.value) return;
  const opt = {
    margin:       [8, 10, 8, 10], // [top, left, bottom, right] in mm
    filename:     'Curriculo-Ramon-Silva.pdf',
    image:        { type: 'jpeg' as const, quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true },
    jsPDF:        { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
    pagebreak:    { mode: ['css', 'legacy'] as const }
  };
  await html2pdf().set(opt).from(resumeRef.value).save();
}
</script>

<template>
  <section class="min-h-screen bg-slate-900 p-4 sm:p-8 text-slate-100 font-sans flex flex-col items-center">
    <!-- Folha do Currículo em formato A4 claro para PDF -->
    <div class="resume-sheet bg-white text-slate-800 rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-[21cm]" ref="resumeRef">
      <!-- Cabeçalho -->
      <header class="flex items-center gap-5 border-b-2 border-slate-200 pb-3.5 mb-3.5">
        <img src="/profile.jpg" alt="Ramon Silva" class="w-24 h-24 rounded-full object-cover border-2 border-indigo-100 shadow-sm flex-shrink-0" />
        <div>
          <h1 class="text-3xl font-bold text-slate-900 tracking-tight">Ramon Silva</h1>
          <h2 class="text-base text-indigo-600 font-semibold mt-0.5">Discente de ADS & Support Analyst</h2>
          <div class="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-600">
            <span class="flex items-center gap-1 font-medium">✉️ ramonsillva70@gmail.com</span>
            <span class="flex items-center gap-1 font-medium">📞 (94) 99177-7860</span>
            <span class="flex items-center gap-1 font-medium">💼 linkedin.com/in/ramonsillva</span>
            <span class="flex items-center gap-1 font-medium">💻 github.com/ramons02</span>
          </div>
        </div>
      </header>

      <!-- Resumo -->
      <section class="mb-3.5">
        <h3 class="text-sm font-bold text-slate-900 border-b border-slate-200 pb-1 mb-1.5 uppercase tracking-wider">Resumo Profissional</h3>
        <p class="text-slate-700 leading-normal text-[13px] text-justify">
          Discente do 4º período de Análise e Desenvolvimento de Sistemas (ADS), com foco em desenvolvimento de software e na construção de soluções escaláveis, eficientes e de alta qualidade. Atualmente, atuo como Network Infrastructure & Support Analyst, acumulando 2 anos de experiência na integração entre Infraestrutura e Desenvolvimento, o que me proporciona uma visão abrangente do ciclo de vida das aplicações. Tenho interesse em aplicar boas práticas de engenharia de software, como SOLID, Clean Code e Clean Architecture, aliadas ao uso de ferramentas modernas, incluindo Inteligência Artificial Generativa, e tecnologias do ecossistema Java, como Spring e Angular, para desenvolver sistemas robustos, seguros e orientados às necessidades do negócio.
        </p>
      </section>

      <!-- Experiência -->
      <section class="mb-3.5">
        <h3 class="text-sm font-bold text-slate-900 border-b border-slate-200 pb-1 mb-1.5 uppercase tracking-wider">Experiência Profissional</h3>
        <div>
          <div class="flex justify-between items-baseline">
            <h4 class="text-sm font-bold text-slate-800">Network Infrastructure & Support Analyst</h4>
            <span class="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Há 2 anos (Atual)</span>
          </div>
          <p class="text-[13px] text-slate-700 mt-1 leading-normal">
            Atuação estratégica na interface entre equipes de Infraestrutura e Desenvolvimento. Experiência robusta em diagnóstico técnico, resolução de incidentes sistêmicos (troubleshooting avançado) e otimização contínua de fluxos operacionais, garantindo estabilidade e comunicação assertiva entre áreas técnicas.
          </p>
        </div>
      </section>

      <!-- Habilidades Técnicas -->
      <section class="mb-3.5">
        <h3 class="text-sm font-bold text-slate-900 border-b border-slate-200 pb-1 mb-1.5 uppercase tracking-wider">Habilidades Técnicas</h3>
        <div class="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
          <div>
            <h4 class="font-bold text-indigo-700 mb-1">Backend & APIs</h4>
            <ul class="list-disc list-inside text-slate-700 space-y-0.5">
              <li><span class="font-medium text-slate-800">Java</span> (Intermediário) & Spring Boot</li>
              <li>Node.js</li>
              <li>REST APIs</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-indigo-700 mb-1">Frontend</h4>
            <ul class="list-disc list-inside text-slate-700 space-y-0.5">
              <li><span class="font-medium text-slate-800">Angular</span></li>
              <li>React & Vue 3</li>
              <li>TypeScript & Tailwind CSS</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-indigo-700 mb-1">Banco de Dados</h4>
            <ul class="list-disc list-inside text-slate-700 space-y-0.5">
              <li><span class="font-medium text-slate-800">PostgreSQL</span></li>
              <li>Modelagem Relacional</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-indigo-700 mb-1">Engenharia & IA</h4>
            <ul class="list-disc list-inside text-slate-700 space-y-0.5">
              <li>Programação Assistida por IA (Claude Code)</li>
              <li>Git, GitHub & Docker</li>
              <li>Princípios SOLID & Clean Architecture</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Projetos Relevantes -->
      <section class="mb-3.5">
        <h3 class="text-sm font-bold text-slate-900 border-b border-slate-200 pb-1 mb-1.5 uppercase tracking-wider">Projetos Relevantes</h3>
        <div>
          <h4 class="text-sm font-bold text-slate-800 flex items-center gap-2">
            FisioClinic
            <span class="text-[10px] font-bold bg-slate-200 px-1.5 py-0.5 rounded text-slate-600">PROJETO PESSOAL</span>
          </h4>
          <p class="text-[13px] text-slate-700 mt-1 leading-normal">Sistema completo de gestão para clínicas de fisioterapia: pacientes, planos, agenda, evolução clínica e faturamento com dashboard financeiro. 10 entidades e 14 regras de negócio modeladas. Autenticação JWT + BCrypt com RBAC (3 perfis). 74 tarefas concluídas em 6 fases.</p>
          <p class="text-xs text-indigo-600 font-medium mt-1">Tech Stack: Java 21, Spring Boot 3.3, React, PostgreSQL</p>
        </div>
      </section>

      <!-- Formação Acadêmica -->
      <section>
        <h3 class="text-sm font-bold text-slate-900 border-b border-slate-200 pb-1 mb-1.5 uppercase tracking-wider">Formação Acadêmica</h3>
        <div class="flex justify-between items-baseline">
          <h4 class="text-sm font-bold text-slate-800">Análise e Desenvolvimento de Sistemas (ADS)</h4>
          <span class="text-xs text-slate-600 font-medium bg-slate-100 px-2 py-0.5 rounded">Cursando (4º Período)</span>
        </div>
        <p class="text-xs text-slate-700 mt-1">Faculdade SENAI FATESG · 02/2025 — 12/2027</p>
      </section>
    </div>

    <!-- Botão de Download -->
    <div class="mt-6 flex justify-center">
      <button @click="downloadPdf" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg hover:scale-105">
        Baixar PDF
      </button>
    </div>
  </section>
</template>

<style scoped>
.resume-sheet {
  box-sizing: border-box;
}

@media print {
  @page {
    size: A4 portrait;
    margin: 0;
  }
  body {
    background: white !important;
  }
  .resume-sheet {
    box-shadow: none !important;
    padding: 1cm 1.2cm !important;
    margin: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
  }
}
</style>


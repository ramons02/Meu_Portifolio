<script setup lang="ts">
import { ref } from 'vue';

const resumeRef = ref<HTMLElement | null>(null);

async function downloadPdf() {
  const html2pdf = (await import('html2pdf.js')).default;
  if (!resumeRef.value) return;
  const opt = {
    // Use A4 sizing and millimeter units to match typical resume page size
    margin:       10, // mm
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
  <section class="resume-page bg-gradient-to-b from-slate-900 via-gray-900 to-slate-800 p-8 text-slate-100 font-sans">
    <div class="container mx-auto" ref="resumeRef">
      <h1 class="text-4xl font-bold mb-6 text-center">Currículo – Ramon</h1>
      <div class="grid md:grid-cols-2 gap-6">
        <article class="glass-card p-6">
          <h2 class="text-2xl font-semibold mb-4">Skills</h2>
          <ul class="list-disc list-inside space-y-2">
            <li>JavaScript / TypeScript</li>
            <li>Vue 3 / Vite</li>
            <li>HTML & CSS (Tailwind, custom)</li>
            <li>Node.js & npm</li>
            <li>Git & CI/CD basics</li>
          </ul>
        </article>
        <article class="glass-card p-6">
          <h2 class="text-2xl font-semibold mb-4">Contact</h2>
          <p>Email: ramon@example.com</p>
          <p>LinkedIn: <a href="https://linkedin.com/in/ramon" target="_blank" class="underline hover:text-indigo-400">linkedin.com/in/ramon</a></p>
        </article>
      </div>
    </div>
    <div class="mt-8 flex justify-center">
      <button @click="downloadPdf" class="btn-download px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors shadow-lg">
        Baixar PDF
      </button>
    </div>
  </section>
</template>

<style scoped>
.btn-download {
  font-family: 'Inter', sans-serif;
}

/* Force A4 sizing and safe print margins to avoid cut-off */
.resume-page {
  width: 210mm;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 16mm;
  min-height: auto !important;
}
.resume-page * { box-sizing: border-box; }

@media print {
  html, body { background: white !important; margin: 0; padding: 0; }
  .resume-page { box-shadow: none !important; background: white !important; color-adjust: exact; -webkit-print-color-adjust: exact; }
  /* Ensure page breaks follow CSS rules */
  .page-break { page-break-before: always; }
}

@page { size: A4; margin: 10mm; }
</style>

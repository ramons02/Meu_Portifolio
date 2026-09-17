import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { CoreObject } from './CoreObject';

gsap.registerPlugin(ScrollTrigger);

// Presença do núcleo por seção: forte onde há espaço vazio ao redor do
// conteúdo (Hero, Projetos — card único e centralizado), quase um brilho
// ambiente sobre texto corrido em coluna única (Sobre, Stack, Contato),
// onde uma forma sólida por cima do parágrafo ficaria poluído visualmente.
const SECTION_OPACITY: Record<string, number> = {
  hero: 1,
  about: 0.22,
  education: 0.28,
  skills: 0.22,
  projects: 0.32,
  contact: 0.28,
};

/**
 * Timeline do núcleo 3D sincronizada ao scroll de #app-content. O nº de
 * "etapas" acompanha a quantidade de seções, então adicionar/remover uma
 * seção não exige recalcular nada aqui (ver references/realism.md).
 */
export function createScrollAnimation(model: CoreObject): gsap.core.Timeline {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrub = prefersReducedMotion ? false : 1.2;
  const intensity = prefersReducedMotion ? 0.15 : 1;
  const sectionIds = Array.from(document.querySelectorAll('#app-content > section')).map((el) => el.id);
  const ids = sectionIds.length ? sectionIds : ['hero', 'about', 'education', 'skills', 'projects', 'contact'];
  const stages = Math.max(ids.length - 1, 1);

  // Posição de repouso ao carregar a página: deslocada para a
  // direita/fundo em vez do centro exato (0,0,0), que ficaria em cima do
  // título do hero. O scroll parte suavemente daqui (scrub interpola, não
  // "pula") para o primeiro ponto da rota calculada abaixo.
  model.position.set(0.9, 0.3, -0.2);
  model.setOpacity(SECTION_OPACITY[ids[0]] ?? 1);
  const opacityState = { factor: SECTION_OPACITY[ids[0]] ?? 1 };

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#app-content',
      start: 'top top',
      end: 'bottom bottom',
      scrub,
    },
  });

  // "Passeio" pela tela toda: x, y e z variam juntos com fases diferentes
  // por etapa (não um espelhamento simples esquerda/direita), determinístico
  // a cada carga de página. Na última etapa a amplitude cai — evita um
  // deslocamento brusco bem no fim do scroll.
  for (let stage = 0; stage < stages; stage += 1) {
    const isLast = stage === stages - 1;
    const n = stage + 1;
    const taper = isLast ? 0.55 : 1;

    // Amplitudes contidas: o objeto é um acento pequeno num site com muito
    // texto, não o protagonista de uma vitrine de produto — passeia pelos
    // cantos/margens em vez de varrer a largura toda por cima do conteúdo.
    const x = Math.sin(n * 2.4) * 1.0 * intensity * taper;
    const y = Math.cos(n * 1.7) * 0.65 * intensity * taper;
    const z = Math.sin(n * 1.1) * 0.35 * intensity * taper;
    const side = Math.sin(n * 2.4) >= 0 ? 1 : -1;

    tl.to(model.rotation, { y: 0.5 * side * intensity, z: 0.15 * side * intensity }, stage)
      .to(model.position, { x, y, z }, stage)
      .to(model.scale, { x: 1 + 0.12 * taper, y: 1 + 0.12 * taper, z: 1 + 0.12 * taper }, stage);

    const targetOpacity = SECTION_OPACITY[ids[stage + 1]] ?? 0.6;
    tl.to(
      opacityState,
      {
        factor: targetOpacity,
        onUpdate: () => model.setOpacity(opacityState.factor),
      },
      stage
    );
  }

  return tl;
}

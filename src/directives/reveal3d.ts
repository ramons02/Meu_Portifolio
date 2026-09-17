import type { Directive } from 'vue';

/**
 * v-reveal3d: entrada em 3D (perspectiva + rotação + fade) quando o
 * elemento cruza a viewport pela primeira vez. Usa IntersectionObserver
 * (não GSAP/ScrollTrigger) de propósito — funciona mesmo antes do chunk
 * pesado do Scene3D (three/gsap/lenis) terminar de carregar, e é
 * independente por elemento, sem precisar de um timeline compartilhado.
 *
 * Uso: `v-reveal3d` (padrão) ou `v-reveal3d="{ delay: 0.15, axis: 'y' }"`.
 */
type Reveal3dOptions = {
  delay?: number;
  axis?: 'x' | 'y';
  distance?: number;
};

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const observers = new WeakMap<Element, IntersectionObserver>();

function applyHiddenState(el: HTMLElement, options: Reveal3dOptions) {
  const axis = options.axis ?? 'x';
  const distance = options.distance ?? 16;
  const rotate = axis === 'x' ? `rotateX(-10deg)` : `rotateY(-10deg)`;

  el.style.opacity = '0';
  el.style.transform = `perspective(900px) ${rotate} translateY(${distance}px)`;
  el.style.transition = `opacity 0.7s ease ${options.delay ?? 0}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${options.delay ?? 0}s`;
  el.style.willChange = 'opacity, transform';
}

function reveal(el: HTMLElement) {
  el.style.opacity = '1';
  el.style.transform = 'none';
}

export const reveal3d: Directive<HTMLElement, Reveal3dOptions | undefined> = {
  mounted(el, binding) {
    const options = binding.value ?? {};

    if (prefersReducedMotion()) {
      // Sem animação contínua nem de entrada agressiva — só garante que o
      // conteúdo já apareça visível, sem depender do IntersectionObserver.
      return;
    }

    applyHiddenState(el, options);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(el);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);
    observers.set(el, observer);
  },
  unmounted(el) {
    observers.get(el)?.disconnect();
    observers.delete(el);
  },
};

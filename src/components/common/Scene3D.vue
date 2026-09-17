<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { World3D } from '../../three/World3D';
import { CoreObject } from '../../three/CoreObject';
import { createScrollAnimation } from '../../three/ScrollAnimation';
import { isWebGLAvailable } from '../../three/webgl';

gsap.registerPlugin(ScrollTrigger);

const canvasRef = ref<HTMLCanvasElement | null>(null);

let world: World3D | null = null;
let core: CoreObject | null = null;
let scrollTimeline: gsap.core.Timeline | null = null;
let lenis: Lenis | null = null;
let animationId = 0;

let handleVisibilityChange: (() => void) | null = null;
let handleMouseMove: ((event: MouseEvent) => void) | null = null;
let handleAnchorClick: ((event: MouseEvent) => void) | null = null;
let lenisTick: ((time: number) => void) | null = null;

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  // Sem WebGL, o canvas some e o fundo gradiente/blur do CSS (já existente
  // nas seções) continua sozinho — nunca deixa a página em branco.
  if (!isWebGLAvailable()) {
    canvas.hidden = true;
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  world = new World3D(canvas);
  core = new CoreObject();
  world.scene.add(core);

  scrollTimeline = createScrollAnimation(core);

  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on('scroll', ScrollTrigger.update);

  // Integração recomendada Lenis + GSAP: um único rAF (o ticker do GSAP)
  // move o smooth scroll e mantém o ScrollTrigger perfeitamente em sincronia.
  lenisTick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(lenisTick);
  gsap.ticker.lagSmoothing(0);

  // Lenis não intercepta cliques em âncoras (`href="#secao"`) por padrão;
  // sem isso, o navegador faria um salto instantâneo em vez de rolar suave.
  handleAnchorClick = (event: MouseEvent) => {
    const anchor = (event.target as HTMLElement)?.closest('a[href^="#"]');
    const href = anchor?.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    lenis?.scrollTo(target as HTMLElement, { offset: -72 });
  };
  document.addEventListener('click', handleAnchorClick);

  // Micro-parallax do mouse, somado à posição-base da câmera (nunca mirando
  // direto em 0,0 — senão o lerp apaga a elevação inicial da câmera).
  const baseCameraX = world.camera.position.x;
  const baseCameraY = world.camera.position.y;
  let mouseX = 0;
  let mouseY = 0;

  if (!prefersReducedMotion) {
    handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 0.4;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove);
  }

  const clock = new THREE.Clock();
  const idleIntensity = prefersReducedMotion ? 0.2 : 1;

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    if (!world || !core) return;

    world.camera.position.x += (baseCameraX + mouseX - world.camera.position.x) * 0.05;
    world.camera.position.y += (baseCameraY - mouseY - world.camera.position.y) * 0.05;

    core.update(clock.getElapsedTime(), idleIntensity);
    world.render();
  };

  // Pausa o loop fora de foco, para não queimar CPU/bateria em background.
  handleVisibilityChange = () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  };
  document.addEventListener('visibilitychange', handleVisibilityChange);

  animate();
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);

  if (handleVisibilityChange) document.removeEventListener('visibilitychange', handleVisibilityChange);
  if (handleMouseMove) window.removeEventListener('mousemove', handleMouseMove);
  if (handleAnchorClick) document.removeEventListener('click', handleAnchorClick);
  if (lenisTick) gsap.ticker.remove(lenisTick);

  scrollTimeline?.scrollTrigger?.kill();
  scrollTimeline?.kill();
  lenis?.destroy();
  world?.dispose();
});
</script>

<template>
  <canvas ref="canvasRef" class="parallax-canvas" aria-hidden="true"></canvas>
</template>

<style scoped>
.parallax-canvas {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  pointer-events: none;
}
</style>

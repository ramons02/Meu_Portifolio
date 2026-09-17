<script setup lang="ts">
import { ref } from 'vue';

// Wrapper genérico de tilt 3D + brilho seguindo o cursor (extraído do
// ProjectCard) para reaproveitar o mesmo efeito em qualquer "card" do site
// (Formação, Contato, etc.) sem duplicar a lógica de mouse/perspectiva.
withDefaults(
  defineProps<{
    as?: string;
    glow?: boolean;
    intensity?: number;
    liftPx?: number;
    glowColor?: string;
  }>(),
  {
    as: 'div',
    glow: true,
    intensity: 8,
    liftPx: 6,
    glowColor: 'rgba(129, 140, 248, 0.16)',
  }
);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const cardRef = ref<HTMLElement | null>(null);
const isHovering = ref(false);
const rotateX = ref(0);
const rotateY = ref(0);
const glowX = ref(50);
const glowY = ref(50);

const handleMouseMove = (event: MouseEvent, intensity: number) => {
  const card = cardRef.value;
  if (!card) return;

  const rect = card.getBoundingClientRect();
  const percentX = (event.clientX - rect.left) / rect.width;
  const percentY = (event.clientY - rect.top) / rect.height;
  glowX.value = percentX * 100;
  glowY.value = percentY * 100;

  if (prefersReducedMotion) return;
  rotateY.value = (percentX - 0.5) * intensity;
  rotateX.value = (0.5 - percentY) * intensity;
};

const handleMouseLeave = () => {
  isHovering.value = false;
  rotateX.value = 0;
  rotateY.value = 0;
};
</script>

<template>
  <component
    :is="as"
    ref="cardRef"
    class="relative [transform-style:preserve-3d]"
    :style="{
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${isHovering ? -liftPx : 0}px)`,
      transition: 'transform 0.2s ease-out',
    }"
    @mouseenter="isHovering = true"
    @mousemove="handleMouseMove($event, intensity)"
    @mouseleave="handleMouseLeave"
  >
    <div
      v-if="glow"
      class="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-300"
      :style="{
        opacity: isHovering ? 1 : 0,
        background: `radial-gradient(480px circle at ${glowX}% ${glowY}%, ${glowColor}, transparent 65%)`,
      }"
    ></div>
    <slot />
  </component>
</template>

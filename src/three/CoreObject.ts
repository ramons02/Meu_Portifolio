import * as THREE from 'three';

/**
 * Objeto 3D central do portfólio: um "núcleo" tech abstrato, não uma forma
 * genérica sem relação com o escopo (ver references/realism.md). A leitura
 * pretendida é rede/infraestrutura — núcleo de gema emissiva (PBR de
 * verdade, não MeshBasicMaterial chapado), casca giroscópica em wireframe e
 * nós orbitando conectados por linhas, ecoando a bagagem de Network
 * Infrastructure do usuário e a paleta indigo/teal já usada no site.
 */
export class CoreObject extends THREE.Group {
  private core: THREE.Mesh;
  private shell: THREE.LineSegments;
  private nodes: THREE.Group;
  private nodeMaterial: THREE.MeshBasicMaterial;
  private linkMaterial: THREE.LineBasicMaterial;

  // Opacidades-base de cada material, usadas como teto ao aplicar o fator
  // 0-1 do fade por seção (ver setOpacity) — sem isso, reaplicar 1.0 direto
  // perderia a transparência intencional de cada camada.
  private static readonly BASE_OPACITY = { core: 0.92, shell: 0.5, node: 1, link: 0.3 };

  constructor() {
    super();
    this.core = this.buildCore();
    this.shell = this.buildShell();
    const { group, nodeMaterial, linkMaterial } = this.buildNodes();
    this.nodes = group;
    this.nodeMaterial = nodeMaterial;
    this.linkMaterial = linkMaterial;
    this.add(this.core, this.shell, this.nodes);
  }

  private buildCore(): THREE.Mesh {
    // Escala pensada para um portfólio com muito texto: um acento
    // decorativo pequeno (não um hero de e-commerce) — ver ajuste de
    // tamanho/posição depois do primeiro teste visual em references/realism.md.
    const geometry = new THREE.IcosahedronGeometry(0.42, 2);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x312e81,
      emissive: 0x4338ca,
      emissiveIntensity: 0.5,
      metalness: 0.4,
      roughness: 0.18,
      clearcoat: 0.6,
      clearcoatRoughness: 0.25,
      transmission: 0.12,
      thickness: 1.2,
      transparent: true,
      opacity: 0.92,
    });
    return new THREE.Mesh(geometry, material);
  }

  private buildShell(): THREE.LineSegments {
    const geometry = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.68, 1));
    const material = new THREE.LineBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.5 });
    return new THREE.LineSegments(geometry, material);
  }

  private buildNodes(): { group: THREE.Group; nodeMaterial: THREE.MeshBasicMaterial; linkMaterial: THREE.LineBasicMaterial } {
    const group = new THREE.Group();
    const nodeGeometry = new THREE.SphereGeometry(0.035, 12, 12);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x5eead4, transparent: true });
    const linkMaterial = new THREE.LineBasicMaterial({ color: 0x2dd4bf, transparent: true, opacity: 0.3 });
    const origin = new THREE.Vector3(0, 0, 0);
    const nodeCount = 8;
    const radius = 1.05;

    for (let i = 0; i < nodeCount; i += 1) {
      // Distribuição de Fibonacci na esfera: nós espalhados de forma
      // determinística e uniforme, sem aglomerar em um único plano.
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const position = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );

      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.copy(position);
      group.add(node);

      const linkGeometry = new THREE.BufferGeometry().setFromPoints([origin, position]);
      group.add(new THREE.Line(linkGeometry, linkMaterial));
    }

    return { group, nodeMaterial, linkMaterial };
  }

  /** Rotação contínua e sutil entre as camadas — chamado a cada frame. */
  update(elapsedSeconds: number, intensity = 1) {
    this.core.rotation.y = elapsedSeconds * 0.18 * intensity;
    this.core.rotation.x = elapsedSeconds * 0.09 * intensity;
    this.shell.rotation.y = -elapsedSeconds * 0.12 * intensity;
    this.shell.rotation.z = elapsedSeconds * 0.05 * intensity;
    this.nodes.rotation.y = elapsedSeconds * 0.07 * intensity;
  }

  /**
   * Fade por seção (0-1): sobre texto corrido (About/Skills/Contact) o
   * núcleo vira um brilho ambiente quase apagado; em áreas mais vazias
   * (Hero/Projects) volta a ficar bem presente. Evita que a forma sólida
   * "brigue" com parágrafos numa página com pouco espaço vazio ao redor
   * do texto.
   */
  setOpacity(factor: number) {
    const clamped = Math.min(Math.max(factor, 0), 1);
    const coreMaterial = this.core.material as THREE.MeshPhysicalMaterial;
    const shellMaterial = this.shell.material as THREE.LineBasicMaterial;
    coreMaterial.opacity = CoreObject.BASE_OPACITY.core * clamped;
    shellMaterial.opacity = CoreObject.BASE_OPACITY.shell * clamped;
    this.nodeMaterial.opacity = CoreObject.BASE_OPACITY.node * clamped;
    this.linkMaterial.opacity = CoreObject.BASE_OPACITY.link * clamped;
  }
}

import * as THREE from 'three';

/**
 * Cena, câmera e renderer do objeto 3D que sobrevoa o site. Sem foto de
 * fundo neste escopo (portfólio com fundo gradiente/blur já definido em
 * CSS) — o canvas fica transparente por cima desse fundo existente, que
 * também funciona como fallback caso o WebGL não esteja disponível.
 */
export class World3D {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;

  private handleResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  constructor(canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene();

    // FOV fechado (não os 60-75° largos de tutorial) para evitar distorção
    // de bordas com o objeto perto da câmera.
    this.camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 1, 6);
    this.camera.lookAt(0, 0, -1);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.initLights();
    window.addEventListener('resize', this.handleResize);
  }

  private initLights() {
    // Luz principal fria com leve tom azulado, combinando com a paleta
    // indigo do site (em vez de branco genérico).
    const keyLight = new THREE.DirectionalLight(0x8fa8ff, 2.6);
    keyLight.position.set(-4, 6, 3);
    this.scene.add(keyLight);

    // Contraluz esverdeada/teal, ecoando o acento teal usado no gradiente
    // do texto do herói.
    const rimLight = new THREE.DirectionalLight(0x5eead4, 1.3);
    rimLight.position.set(3, -2, -4);
    this.scene.add(rimLight);

    const fillLight = new THREE.HemisphereLight(0x6366f1, 0x0f172a, 0.5);
    this.scene.add(fillLight);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    window.removeEventListener('resize', this.handleResize);
    this.scene.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) {
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        materials.forEach((material) => {
          Object.values(material).forEach((value) => {
            if (value && typeof (value as THREE.Texture).dispose === 'function') {
              (value as THREE.Texture).dispose();
            }
          });
          material.dispose();
        });
      }
    });
    this.renderer.dispose();
  }
}

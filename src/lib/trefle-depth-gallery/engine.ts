import * as THREE from "three";
import { trefleGalleryPlaneData, type TreflePlaneDefinition } from "./data";

const backgroundVertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const backgroundFragmentShader = `
varying vec2 vUv;

uniform vec3 uBackgroundColor;
uniform vec3 uBlob1Color;
uniform vec3 uBlob2Color;
uniform float uNoiseStrength;
uniform float uBlobRadius;
uniform float uBlobRadiusSecondary;
uniform float uBlobStrength;
uniform float uTime;
uniform float uVelocityIntensity;

float random(vec2 coord) {
  return fract(sin(dot(coord, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec3 color = uBackgroundColor;

  float animTime = uTime * 0.00028;
  vec2 blob1Center = vec2(
    0.50 + sin(animTime * 1.000) * 0.13 + sin(animTime * 1.618) * 0.05,
    0.48 + cos(animTime * 0.794) * 0.09 + cos(animTime * 1.272) * 0.03
  );
  vec2 blob2Center = vec2(
    0.35 + cos(animTime * 0.927) * 0.11 + cos(animTime * 1.414) * 0.04,
    0.55 + sin(animTime * 1.175) * 0.07 + sin(animTime * 0.618) * 0.03
  );

  float blob1 = smoothstep(uBlobRadius, 0.0, distance(vUv, blob1Center));
  float blob2 = smoothstep(uBlobRadiusSecondary, 0.0, distance(vUv, blob2Center));

  vec3 blob1SoftColor = mix(uBlob1Color, uBackgroundColor, 0.35);
  vec3 blob2SoftColor = mix(uBlob2Color, uBackgroundColor, 0.35);
  color = mix(color, blob1SoftColor, blob1 * uBlobStrength);
  color = mix(color, blob2SoftColor, blob2 * uBlobStrength);

  color += uVelocityIntensity * 0.10;

  float grain = random(vUv * vec2(1387.13, 947.91)) - 0.5;
  color += grain * uNoiseStrength;
  color = clamp(color, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}
`;

type PlaneUserData = {
  accentColor: string;
  aspectRatio: number;
  backgroundColor: string;
  baseColor: string;
  basePosition: { x: number; y: number };
  blob1Color: string;
  blob2Color: string;
  label: TreflePlaneDefinition["label"];
  texture: THREE.Texture | null;
};

type DemoPlaneMesh = THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> & {
  userData: PlaneUserData;
};

class BackgroundScene {
  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  backgroundColor = new THREE.Color("#FBE8CD");
  blob1Color = new THREE.Color("#FFD56D");
  blob2Color = new THREE.Color("#5D816A");
  nextBackgroundColor = new THREE.Color();
  nextBlob1Color = new THREE.Color();
  nextBlob2Color = new THREE.Color();
  baseBlobRadius = 0.65;
  secondaryBlobRadiusRatio = 0.78;
  baseBlobStrength = 0.9;
  depthToRadiusAmount = 0.08;
  velocityToStrengthAmount = 0.1;
  motionSmoothing = 0.1;
  motionDepthProgress = 0;
  motionVelocityIntensity = 0;
  smoothedDepthProgress = 0;
  smoothedVelocityIntensity = 0;
  blobRadius = this.baseBlobRadius;
  blobStrength = this.baseBlobStrength;
  noiseStrength = 0.04;
  material = new THREE.ShaderMaterial({
    vertexShader: backgroundVertexShader,
    fragmentShader: backgroundFragmentShader,
    depthWrite: false,
    depthTest: false,
    uniforms: {
      uBackgroundColor: { value: this.backgroundColor },
      uBlob1Color: { value: this.blob1Color },
      uBlob2Color: { value: this.blob2Color },
      uNoiseStrength: { value: this.noiseStrength },
      uBlobRadius: { value: this.blobRadius },
      uBlobRadiusSecondary: { value: this.blobRadius * this.secondaryBlobRadiusRatio },
      uBlobStrength: { value: this.blobStrength },
      uTime: { value: 0 },
      uVelocityIntensity: { value: 0 },
    },
  });
  mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);

  constructor() {
    this.scene.add(this.mesh);
  }

  setMoodBlend({
    currentMood,
    nextMood,
    blend,
  }: {
    blend: number;
    currentMood: { background: string; blob1: string; blob2: string };
    nextMood: { background: string; blob1: string; blob2: string };
  }) {
    const safeBlend = THREE.MathUtils.clamp(blend, 0, 1);
    this.backgroundColor
      .set(currentMood.background)
      .lerp(this.nextBackgroundColor.set(nextMood.background), safeBlend);
    this.blob1Color
      .set(currentMood.blob1)
      .lerp(this.nextBlob1Color.set(nextMood.blob1), safeBlend);
    this.blob2Color
      .set(currentMood.blob2)
      .lerp(this.nextBlob2Color.set(nextMood.blob2), safeBlend);

    this.material.uniforms.uBackgroundColor.value.copy(this.backgroundColor);
    this.material.uniforms.uBlob1Color.value.copy(this.blob1Color);
    this.material.uniforms.uBlob2Color.value.copy(this.blob2Color);
  }

  setMotionResponse(depthProgress: number, velocityIntensity: number) {
    this.motionDepthProgress = THREE.MathUtils.clamp(depthProgress, 0, 1);
    this.motionVelocityIntensity = THREE.MathUtils.clamp(velocityIntensity, 0, 1);
  }

  update(time: number) {
    this.smoothedDepthProgress = THREE.MathUtils.lerp(
      this.smoothedDepthProgress,
      this.motionDepthProgress,
      this.motionSmoothing
    );
    this.smoothedVelocityIntensity = THREE.MathUtils.lerp(
      this.smoothedVelocityIntensity,
      this.motionVelocityIntensity,
      this.motionSmoothing
    );

    this.blobRadius = THREE.MathUtils.clamp(
      this.baseBlobRadius + this.smoothedDepthProgress * this.depthToRadiusAmount,
      0.05,
      1
    );
    this.blobStrength = THREE.MathUtils.clamp(
      this.baseBlobStrength + this.smoothedVelocityIntensity * this.velocityToStrengthAmount,
      0,
      1
    );

    this.material.uniforms.uBlobRadius.value = this.blobRadius;
    this.material.uniforms.uBlobRadiusSecondary.value =
      this.blobRadius * this.secondaryBlobRadiusRatio;
    this.material.uniforms.uBlobStrength.value = this.blobStrength;
    this.material.uniforms.uTime.value = time;
    this.material.uniforms.uVelocityIntensity.value = this.smoothedVelocityIntensity;
  }

  render(renderer: THREE.WebGLRenderer) {
    renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.material.dispose();
    this.scene.clear();
  }
}

class GalleryScene {
  planes: DemoPlaneMesh[] = [];
  texturesBySource = new Map<string, THREE.Texture>();
  planeGap = 5;
  desktopPlaneScale = 1;
  mobilePlaneScale = 0.65;
  mobileXSpreadFactor = 0.25;
  mobileBreakpoint = 768;
  planeConfig = trefleGalleryPlaneData;
  moodSampleOffset = 1;
  planeFadeSampleOffset = 1;
  planeFadeSmoothing = 0.14;
  parallaxAmountX = 0.16;
  parallaxAmountY = 0.08;
  parallaxSmoothing = 0.08;
  pointerTarget = new THREE.Vector2(0, 0);
  pointerCurrent = new THREE.Vector2(0, 0);
  breathTiltAmount = 0.045;
  breathScaleAmount = 0.03;
  breathSmoothing = 0.14;
  breathGain = 1.1;
  breathIntensity = 0;
  targetBreathIntensity = 0;
  gestureParallaxAmountY = 0.05;
  gestureParallaxSmoothing = 0.05;
  driftCurrent = 0;
  driftTarget = 0;
  onPointerMove = (event: PointerEvent) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = (event.clientY / window.innerHeight) * 2 - 1;
    this.pointerTarget.set(x, -y);
  };
  onPointerLeave = () => {
    this.pointerTarget.set(0, 0);
  };

  getTextureSources() {
    return Array.from(new Set(this.planeConfig.map((plane) => plane.textureSrc).filter(Boolean)));
  }

  setPreloadedTextures(texturesBySource: Map<string, THREE.Texture>) {
    this.texturesBySource = texturesBySource;
  }

  init(scene: THREE.Scene) {
    const planeGeometry = new THREE.PlaneGeometry(3, 3);

    this.planeConfig.forEach((plane, index) => {
      const texture = this.texturesBySource.get(plane.textureSrc) ?? null;
      const textureImage = texture?.image as { width?: number; height?: number } | undefined;
      const aspectRatio =
        textureImage?.width && textureImage?.height ? textureImage.width / textureImage.height : 1;

      const material = new THREE.MeshBasicMaterial({
        color: plane.fallbackColor,
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false,
        opacity: index === 0 ? 1 : 0,
      });

      const mesh = new THREE.Mesh(planeGeometry, material) as DemoPlaneMesh;
      mesh.userData = {
        basePosition: plane.position,
        baseColor: plane.fallbackColor,
        accentColor: plane.accentColor,
        backgroundColor: plane.backgroundColor,
        blob1Color: plane.blob1Color,
        blob2Color: plane.blob2Color,
        label: plane.label,
        texture,
        aspectRatio,
      };

      scene.add(mesh);
      this.planes.push(mesh);
    });

    this.updatePlaneScale();
    this.layoutPlanes();
    window.addEventListener("pointermove", this.onPointerMove, { passive: true });
    window.addEventListener("pointerleave", this.onPointerLeave, { passive: true });
  }

  updatePlaneScale() {
    const isMobileViewport = window.innerWidth <= this.mobileBreakpoint;
    const scale = isMobileViewport ? this.mobilePlaneScale : this.desktopPlaneScale;

    this.planes.forEach((plane) => {
      const aspectRatio = plane.userData.aspectRatio || 1;
      plane.scale.set(scale * aspectRatio, scale, 1);
    });
  }

  getXSpreadFactor() {
    return window.innerWidth <= this.mobileBreakpoint ? this.mobileXSpreadFactor : 1;
  }

  layoutPlanes() {
    const xSpreadFactor = this.getXSpreadFactor();

    this.planes.forEach((plane, index) => {
      const basePosition = plane.userData.basePosition;
      plane.position.set(basePosition.x * xSpreadFactor, basePosition.y, -index * this.planeGap);
    });
  }

  getDepthRange() {
    if (!this.planes.length) {
      return { deepestZ: 0, nearestZ: 0 };
    }

    const zPositions = this.planes.map((plane) => plane.position.z);
    return {
      nearestZ: Math.max(...zPositions),
      deepestZ: Math.min(...zPositions),
    };
  }

  getDepthProgress(cameraZ: number) {
    const { nearestZ, deepestZ } = this.getDepthRange();
    const depthSpan = nearestZ - deepestZ;
    if (depthSpan <= 0) return 0;
    return THREE.MathUtils.clamp((nearestZ - cameraZ) / depthSpan, 0, 1);
  }

  getMoodColorsByIndex(index: number) {
    if (index < 0 || index >= this.planes.length) return null;
    const plane = this.planes[index].userData;
    return {
      background: plane.backgroundColor,
      blob1: plane.blob1Color,
      blob2: plane.blob2Color,
    };
  }

  getMoodBlendData(cameraZ: number) {
    if (!this.planes.length) return null;

    const moodSampleZ = cameraZ - this.planeGap * this.moodSampleOffset;
    const lastPlaneIndex = this.planes.length - 1;
    const firstPlaneZ = this.planes[0].position.z;
    const normalizedDepth = THREE.MathUtils.clamp(
      (firstPlaneZ - moodSampleZ) / this.planeGap,
      0,
      lastPlaneIndex
    );
    const currentPlaneIndex = Math.floor(normalizedDepth);
    const nextPlaneIndex = Math.min(currentPlaneIndex + 1, lastPlaneIndex);
    const blend = normalizedDepth - currentPlaneIndex;
    const currentMood = this.getMoodColorsByIndex(currentPlaneIndex);
    const nextMood = this.getMoodColorsByIndex(nextPlaneIndex) ?? currentMood;

    if (!currentMood || !nextMood) return null;

    return { blend, currentMood, nextMood };
  }

  getPlaneBlendData(cameraZ: number) {
    if (!this.planes.length) return null;

    const planeGap = Math.max(this.planeGap, 0.0001);
    const firstPlaneZ = this.planes[0].position.z;
    const lastPlaneIndex = this.planes.length - 1;
    const sampledCameraZ = cameraZ - planeGap * this.planeFadeSampleOffset;
    const normalizedDepth = THREE.MathUtils.clamp(
      (firstPlaneZ - sampledCameraZ) / planeGap,
      0,
      lastPlaneIndex
    );
    const currentPlaneIndex = Math.floor(normalizedDepth);
    const nextPlaneIndex = Math.min(currentPlaneIndex + 1, lastPlaneIndex);
    const blend = normalizedDepth - currentPlaneIndex;

    return { blend, currentPlaneIndex, nextPlaneIndex };
  }

  updatePlaneVisibility(cameraZ: number) {
    const blendData = this.getPlaneBlendData(cameraZ);
    if (!blendData) return;

    const { currentPlaneIndex, nextPlaneIndex, blend } = blendData;

    this.planes.forEach((plane, index) => {
      let targetOpacity = 0;
      if (index === currentPlaneIndex) targetOpacity = 1 - blend;
      if (index === nextPlaneIndex) targetOpacity = Math.max(targetOpacity, blend);

      plane.material.opacity = THREE.MathUtils.lerp(
        Number.isFinite(plane.material.opacity) ? plane.material.opacity : 0,
        targetOpacity,
        this.planeFadeSmoothing
      );
      plane.material.needsUpdate = true;
    });
  }

  updatePlaneMotion(velocity: number, velocityMax: number) {
    this.pointerCurrent.lerp(this.pointerTarget, this.parallaxSmoothing);

    const safeVelocityMax = Math.max(velocityMax, 0.0001);
    const velocityNormalized = THREE.MathUtils.clamp(Math.abs(velocity) / safeVelocityMax, 0, 1);
    const scrollDrift = THREE.MathUtils.clamp(velocity / safeVelocityMax, -1, 1);

    this.targetBreathIntensity = THREE.MathUtils.clamp(
      velocityNormalized * this.breathGain,
      0,
      1
    );
    this.breathIntensity = THREE.MathUtils.lerp(
      this.breathIntensity,
      this.targetBreathIntensity,
      this.breathSmoothing
    );
    this.driftTarget = scrollDrift;
    this.driftCurrent = THREE.MathUtils.lerp(
      this.driftCurrent,
      this.driftTarget,
      this.gestureParallaxSmoothing
    );

    const xSpreadFactor = this.getXSpreadFactor();

    this.planes.forEach((plane, index) => {
      const basePosition = plane.userData.basePosition;
      const xPosition = basePosition.x * xSpreadFactor;
      const yPosition = basePosition.y;
      const zPosition = -index * this.planeGap;
      const opacity = Number.isFinite(plane.material.opacity) ? plane.material.opacity : 0;
      const depthInfluence = 1 + index * 0.05;
      const parallaxInfluence = opacity * depthInfluence;
      const parallaxOffsetX = this.pointerCurrent.x * this.parallaxAmountX * parallaxInfluence;
      const parallaxOffsetY = this.pointerCurrent.y * this.parallaxAmountY * parallaxInfluence;
      const gestureOffsetY = this.driftCurrent * this.gestureParallaxAmountY;

      plane.position.x = xPosition + parallaxOffsetX;
      plane.position.y = yPosition + parallaxOffsetY + gestureOffsetY;
      plane.position.z = zPosition;

      const breathInfluence = this.breathIntensity * opacity;
      plane.rotation.x = -this.pointerCurrent.y * this.breathTiltAmount * breathInfluence;
      plane.rotation.y = this.pointerCurrent.x * this.breathTiltAmount * breathInfluence;
      plane.rotation.z = 0;

      const aspectRatio = plane.userData.aspectRatio || 1;
      const baseScale =
        window.innerWidth <= this.mobileBreakpoint ? this.mobilePlaneScale : this.desktopPlaneScale;
      const scalePulse = 1 + this.breathScaleAmount * breathInfluence;
      plane.scale.x = baseScale * aspectRatio * scalePulse;
      plane.scale.y = baseScale * scalePulse;
      plane.scale.z = 1;
    });
  }

  update(cameraZ: number, velocity: number, velocityMax: number) {
    this.updatePlaneVisibility(cameraZ);
    this.updatePlaneMotion(velocity, velocityMax);
  }

  dispose() {
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerleave", this.onPointerLeave);

    this.planes.forEach((plane) => {
      plane.geometry.dispose();
      plane.material.dispose();
    });
    this.planes = [];
  }
}

class ScrollController {
  scrollTarget = 0;
  scrollCurrent = 0;
  scrollSmoothing = 0.08;
  scrollToWorldFactor = 0.01;
  wheelScrollSpeed = 1;
  touchScrollSpeed = 1.8;
  previousScrollCurrent = 0;
  rawVelocity = 0;
  velocity = 0;
  velocityDamping = 0.12;
  velocityMax = 1.5;
  velocityStopThreshold = 0.0001;
  firstPlaneViewOffset = 5;
  lastPlaneViewOffset = 5;
  minCameraZ = -Infinity;
  maxCameraZ = Infinity;
  cameraStartZ: number;
  touchY = 0;
  onWheel: (event: WheelEvent) => void;
  onTouchStart: (event: TouchEvent) => void;
  onTouchMove: (event: TouchEvent) => void;

  constructor(
    private camera: THREE.PerspectiveCamera,
    private gallery: GalleryScene,
    private interactionTarget: HTMLElement
  ) {
    this.cameraStartZ = this.camera.position.z;

    this.onWheel = (event) => {
      event.preventDefault();
      const normalizedWheelDelta = this.normalizeWheelDelta(event) * this.wheelScrollSpeed;
      this.scrollTarget += normalizedWheelDelta;
    };

    this.onTouchStart = (event) => {
      this.touchY = event.touches[0]?.clientY ?? 0;
    };

    this.onTouchMove = (event) => {
      event.preventDefault();
      const currentTouchY = event.touches[0]?.clientY ?? this.touchY;
      const deltaY = this.touchY - currentTouchY;
      this.scrollTarget += deltaY * this.touchScrollSpeed;
      this.touchY = currentTouchY;
    };
  }

  init() {
    this.updateCameraBounds();
    this.cameraStartZ = this.maxCameraZ;
    this.camera.position.z = this.cameraStartZ;
    this.scrollTarget = 0;
    this.scrollCurrent = 0;
    this.previousScrollCurrent = 0;
  }

  bindEvents() {
    this.interactionTarget.addEventListener("wheel", this.onWheel, { passive: false });
    this.interactionTarget.addEventListener("touchstart", this.onTouchStart, { passive: true });
    this.interactionTarget.addEventListener("touchmove", this.onTouchMove, { passive: false });
  }

  updateCameraBounds() {
    const depthRange = this.gallery.getDepthRange();
    this.maxCameraZ = depthRange.nearestZ + this.firstPlaneViewOffset;
    this.minCameraZ = depthRange.deepestZ + this.lastPlaneViewOffset;
    if (this.minCameraZ > this.maxCameraZ) this.minCameraZ = this.maxCameraZ;
  }

  normalizeWheelDelta(event: WheelEvent) {
    if (event.deltaMode === 1) return event.deltaY * 16;
    if (event.deltaMode === 2) return event.deltaY * window.innerHeight;
    return event.deltaY;
  }

  cameraZFromScroll(scrollAmount: number) {
    return this.cameraStartZ - scrollAmount * this.scrollToWorldFactor;
  }

  scrollFromCameraZ(cameraZ: number) {
    if (this.scrollToWorldFactor === 0) return 0;
    return (this.cameraStartZ - cameraZ) / this.scrollToWorldFactor;
  }

  updateVelocity() {
    this.rawVelocity = this.scrollCurrent - this.previousScrollCurrent;
    this.velocity = THREE.MathUtils.lerp(this.velocity, this.rawVelocity, this.velocityDamping);
    this.velocity = THREE.MathUtils.clamp(this.velocity, -this.velocityMax, this.velocityMax);
    if (Math.abs(this.velocity) < this.velocityStopThreshold) this.velocity = 0;
    this.previousScrollCurrent = this.scrollCurrent;
  }

  update() {
    this.updateCameraBounds();
    this.scrollCurrent = THREE.MathUtils.lerp(
      this.scrollCurrent,
      this.scrollTarget,
      this.scrollSmoothing
    );

    const minimumScroll = this.scrollFromCameraZ(this.maxCameraZ);
    const maximumScroll = this.scrollFromCameraZ(this.minCameraZ);
    this.scrollTarget = THREE.MathUtils.clamp(this.scrollTarget, minimumScroll, maximumScroll);
    this.scrollCurrent = THREE.MathUtils.clamp(this.scrollCurrent, minimumScroll, maximumScroll);

    this.updateVelocity();
    this.camera.position.z = THREE.MathUtils.clamp(
      this.cameraZFromScroll(this.scrollCurrent),
      this.minCameraZ,
      this.maxCameraZ
    );
  }

  dispose() {
    this.interactionTarget.removeEventListener("wheel", this.onWheel);
    this.interactionTarget.removeEventListener("touchstart", this.onTouchStart);
    this.interactionTarget.removeEventListener("touchmove", this.onTouchMove);
  }
}

class LabelOverlay {
  private overlayElement: HTMLElement | null = null;
  private leftIndexElement: HTMLParagraphElement | null = null;
  private wordElement: HTMLParagraphElement | null = null;
  private chipElement: HTMLSpanElement | null = null;
  private cmykValueElement: HTMLElement | null = null;
  private rgbValueElement: HTMLElement | null = null;
  private hexValueElement: HTMLElement | null = null;
  private pmsValueElement: HTMLElement | null = null;
  private activePlaneIndex = -1;

  constructor(private gallery: GalleryScene, private overlayRoot: HTMLElement) {}

  init() {
    if (this.overlayElement) return;

    const element = document.createElement("section");
    element.className = "trefle-depth-label-overlay";
    element.innerHTML = `
      <div class="trefle-depth-label-overlay__left">
        <p class="trefle-depth-label-overlay__index"></p>
        <p class="trefle-depth-label-card__word"></p>
        <span class="trefle-depth-label-overlay__chip"></span>
      </div>
      <article class="trefle-depth-label-card trefle-depth-label-overlay__right">
        <dl class="trefle-depth-label-card__specs">
          <div class="trefle-depth-label-card__row">
            <dt>CMYK</dt>
            <dd class="trefle-depth-label-card__value trefle-depth-label-card__value--cmyk"></dd>
          </div>
          <div class="trefle-depth-label-card__row">
            <dt>RGB</dt>
            <dd class="trefle-depth-label-card__value trefle-depth-label-card__value--rgb"></dd>
          </div>
          <div class="trefle-depth-label-card__row">
            <dt>HEX</dt>
            <dd class="trefle-depth-label-card__value trefle-depth-label-card__value--hex"></dd>
          </div>
          <div class="trefle-depth-label-card__row">
            <dt>PMS</dt>
            <dd class="trefle-depth-label-card__value trefle-depth-label-card__value--pms"></dd>
          </div>
        </dl>
      </article>
    `;

    this.overlayElement = element;
    this.leftIndexElement = element.querySelector(".trefle-depth-label-overlay__index");
    this.wordElement = element.querySelector(".trefle-depth-label-card__word");
    this.chipElement = element.querySelector(".trefle-depth-label-overlay__chip");
    this.cmykValueElement = element.querySelector(".trefle-depth-label-card__value--cmyk");
    this.rgbValueElement = element.querySelector(".trefle-depth-label-card__value--rgb");
    this.hexValueElement = element.querySelector(".trefle-depth-label-card__value--hex");
    this.pmsValueElement = element.querySelector(".trefle-depth-label-card__value--pms");
    this.overlayRoot.append(element);
  }

  private normalizeHexColor(rawColor: string) {
    let hexColor = rawColor.trim();
    if (!hexColor.startsWith("#")) hexColor = `#${hexColor}`;

    if (/^#[0-9a-fA-F]{3}$/.test(hexColor)) {
      const shortHex = hexColor.slice(1);
      hexColor = `#${shortHex
        .split("")
        .map((character) => `${character}${character}`)
        .join("")}`;
    }

    return /^#[0-9a-fA-F]{6}$/.test(hexColor) ? hexColor.toLowerCase() : "#ffffff";
  }

  private hexToRgb(hexColor: string) {
    const normalizedColor = this.normalizeHexColor(hexColor).slice(1);
    return {
      r: Number.parseInt(normalizedColor.slice(0, 2), 16),
      g: Number.parseInt(normalizedColor.slice(2, 4), 16),
      b: Number.parseInt(normalizedColor.slice(4, 6), 16),
    };
  }

  private rgbToCmyk({ r, g, b }: { b: number; g: number; r: number }) {
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;
    const black = 1 - Math.max(red, green, blue);

    if (black >= 0.999) return { c: 0, k: 100, m: 0, y: 0 };

    return {
      c: Math.round(((1 - red - black) / (1 - black)) * 100),
      m: Math.round(((1 - green - black) / (1 - black)) * 100),
      y: Math.round(((1 - blue - black) / (1 - black)) * 100),
      k: Math.round(black * 100),
    };
  }

  private getTargetPlaneIndex(cameraZ: number) {
    const blendData = this.gallery.getPlaneBlendData(cameraZ);
    if (!blendData) return -1;
    return blendData.blend >= 0.5 ? blendData.nextPlaneIndex : blendData.currentPlaneIndex;
  }

  update(cameraZ: number) {
    if (!this.overlayElement) return;

    const targetPlaneIndex = this.getTargetPlaneIndex(cameraZ);
    if (targetPlaneIndex < 0) {
      this.overlayElement.style.opacity = "0";
      return;
    }

    if (this.activePlaneIndex !== targetPlaneIndex) {
      const plane = this.gallery.planes[targetPlaneIndex];
      const accentColor = this.normalizeHexColor(plane.userData.accentColor);
      const rgb = this.hexToRgb(accentColor);
      const cmyk = this.rgbToCmyk(rgb);

      if (this.leftIndexElement) {
        this.leftIndexElement.textContent = String(targetPlaneIndex + 1).padStart(2, "0");
      }
      if (this.wordElement) this.wordElement.textContent = plane.userData.label.word;
      if (this.chipElement) this.chipElement.style.backgroundColor = accentColor;
      if (this.cmykValueElement) {
        this.cmykValueElement.textContent = `${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`;
      }
      if (this.rgbValueElement) {
        this.rgbValueElement.textContent = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
      }
      if (this.hexValueElement) this.hexValueElement.textContent = accentColor.slice(1).toUpperCase();
      if (this.pmsValueElement) this.pmsValueElement.textContent = plane.userData.label.pms;
      this.overlayElement.style.color = plane.userData.label.color;
      this.activePlaneIndex = targetPlaneIndex;
    }

    this.overlayElement.style.opacity = "1";
  }

  dispose() {
    this.overlayElement?.remove();
    this.overlayElement = null;
    this.activePlaneIndex = -1;
  }
}

class Trail {
  group = new THREE.Group();
  points: THREE.Vector3[] = [];
  mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial> | null = null;
  minDistance = 0.006;
  maxPoints = 220;
  curveTension = 0.5;
  curveSegments = 220;
  radialSegments = 8;
  radiusHead = 0.012;
  radiusTail = 0.003;
  pointSmoothing = 0.3;
  maxTrimPerFrame = 4;
  jumpResetDistance = 999;
  material = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#f6f9ff"),
    emissive: new THREE.Color("#7fd5ff"),
    emissiveIntensity: 1.35,
    roughness: 0.2,
    metalness: 0.05,
    transparent: true,
    opacity: 0.84,
    depthWrite: false,
    depthTest: false,
    blending: THREE.NormalBlending,
  });

  get object() {
    return this.group;
  }

  addPoint(position: THREE.Vector3) {
    const lastPoint = this.points[this.points.length - 1] ?? null;
    if (lastPoint && position.distanceToSquared(lastPoint) < this.minDistance * this.minDistance) {
      return;
    }

    const nextPoint = position.clone();
    if (lastPoint && nextPoint.distanceTo(lastPoint) > this.jumpResetDistance) {
      this.points = [nextPoint];
      if (this.mesh) {
        this.mesh.geometry.dispose();
        this.group.remove(this.mesh);
        this.mesh = null;
      }
      return;
    }

    this.points.push(lastPoint ? lastPoint.clone().lerp(nextPoint, this.pointSmoothing) : nextPoint);

    let trimBudget = this.maxTrimPerFrame;
    while (this.points.length > this.maxPoints && trimBudget > 0) {
      this.points.shift();
      trimBudget -= 1;
    }

    if (this.points.length < 2) return;

    const curve = new THREE.CatmullRomCurve3(this.points, false, "centripetal", this.curveTension);
    const segments = Math.max(24, Math.min(this.curveSegments, this.points.length * 4));
    const nextGeometry = this.createTaperedTube(curve, segments, this.radiusHead, this.radiusTail);

    if (!this.mesh) {
      this.mesh = new THREE.Mesh(nextGeometry, this.material);
      this.mesh.renderOrder = 1200;
      this.group.add(this.mesh);
      return;
    }

    this.mesh.geometry.dispose();
    this.mesh.geometry = nextGeometry;
  }

  private createTaperedTube(
    curve: THREE.CatmullRomCurve3,
    segments: number,
    radiusHead: number,
    radiusTail: number
  ) {
    const pathPoints = curve.getSpacedPoints(segments);
    const ringPoints = this.radialSegments + 1;
    const vertices: number[] = [];
    const indices: number[] = [];
    const up = new THREE.Vector3(0, 0, 1);
    const tangent = new THREE.Vector3();
    const normal = new THREE.Vector3();
    const binormal = new THREE.Vector3();
    const radialOffset = new THREE.Vector3();
    const vertexPosition = new THREE.Vector3();

    for (let i = 0; i < pathPoints.length; i += 1) {
      const t = i / Math.max(pathPoints.length - 1, 1);
      const radius = radiusHead + (radiusTail - radiusHead) * Math.pow(t, 1.5);
      curve.getTangent(t, tangent).normalize();
      normal.crossVectors(up, tangent).normalize();
      if (normal.lengthSq() === 0) normal.set(1, 0, 0);
      binormal.crossVectors(tangent, normal).normalize();

      for (let j = 0; j <= this.radialSegments; j += 1) {
        const angle = (j / this.radialSegments) * Math.PI * 2;
        const cx = -Math.cos(angle) * radius;
        const cy = Math.sin(angle) * radius;
        radialOffset.copy(normal).multiplyScalar(cx).addScaledVector(binormal, cy);
        vertexPosition.copy(pathPoints[i]).add(radialOffset);
        vertices.push(vertexPosition.x, vertexPosition.y, vertexPosition.z);
      }
    }

    for (let i = 0; i < pathPoints.length - 1; i += 1) {
      for (let j = 0; j < this.radialSegments; j += 1) {
        const baseIndex = i * ringPoints + j;
        indices.push(baseIndex, baseIndex + ringPoints, baseIndex + 1);
        indices.push(baseIndex + ringPoints, baseIndex + ringPoints + 1, baseIndex + 1);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  reset() {
    if (this.mesh) {
      this.mesh.geometry.dispose();
      this.group.remove(this.mesh);
      this.mesh = null;
    }
    this.points = [];
  }

  dispose() {
    this.reset();
    this.material.dispose();
  }
}

class TrailHeadParticles {
  group = new THREE.Group();
  isEnabled = true;
  maxParticles = 18;
  spawnPerSecond = 20;
  spawnRadius = 0.52;
  speedMin = 0.05;
  speedMax = 0.22;
  lifeMin = 0.25;
  lifeMax = 0.6;
  sizeMin = 0.007;
  sizeMax = 0.02;
  dragPerFrame = 0.94;
  spawnAccumulator = 0;
  nextSpawnIndex = 0;
  sharedGeometry = new THREE.SphereGeometry(1, 5, 4);
  particles: Array<{
    lifeRemaining: number;
    mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
    totalLife: number;
    velocity: THREE.Vector3;
  }> = [];

  constructor() {
    this.group.renderOrder = 1300;

    for (let index = 0; index < this.maxParticles; index += 1) {
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#f6f9ff"),
        transparent: true,
        opacity: 0,
        depthWrite: false,
        depthTest: false,
      });
      const mesh = new THREE.Mesh(this.sharedGeometry, material);
      mesh.visible = false;
      this.group.add(mesh);
      this.particles.push({
        mesh,
        velocity: new THREE.Vector3(),
        lifeRemaining: 0,
        totalLife: 0,
      });
    }
  }

  get object() {
    return this.group;
  }

  setEnabled(isEnabled: boolean) {
    if (this.isEnabled && !isEnabled) this.clear();
    this.isEnabled = isEnabled;
    this.group.visible = isEnabled;
  }

  update(deltaSeconds: number, headPosition: THREE.Vector3, opacity = 1, shouldSpawn = true) {
    const safeDelta = Math.min(Math.max(deltaSeconds || 0, 0), 0.1);

    if (this.isEnabled && shouldSpawn && safeDelta > 0) {
      this.spawnAccumulator += safeDelta * this.spawnPerSecond;
      const spawnCount = Math.floor(this.spawnAccumulator);
      this.spawnAccumulator -= spawnCount;
      for (let index = 0; index < spawnCount; index += 1) this.spawnParticle(headPosition);
    } else {
      this.spawnAccumulator = 0;
    }

    const clampedOpacity = THREE.MathUtils.clamp(opacity, 0, 1);
    const drag = Math.pow(this.dragPerFrame, safeDelta * 60);

    this.particles.forEach((particle) => {
      if (particle.lifeRemaining <= 0) return;
      particle.lifeRemaining -= safeDelta;

      if (particle.lifeRemaining <= 0) {
        particle.lifeRemaining = 0;
        particle.mesh.visible = false;
        particle.mesh.material.opacity = 0;
        return;
      }

      particle.velocity.multiplyScalar(drag);
      particle.mesh.position.addScaledVector(particle.velocity, safeDelta);
      const lifeRatio = particle.lifeRemaining / particle.totalLife;
      particle.mesh.material.opacity = lifeRatio * clampedOpacity * 0.75;
    });
  }

  private spawnParticle(headPosition: THREE.Vector3) {
    const particle = this.particles[this.nextSpawnIndex];
    this.nextSpawnIndex = (this.nextSpawnIndex + 1) % this.particles.length;
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * this.spawnRadius;

    particle.mesh.position.set(
      headPosition.x + Math.cos(angle) * radius,
      headPosition.y + (Math.random() - 0.5) * this.spawnRadius * 0.6,
      headPosition.z + Math.sin(angle) * radius
    );

    const size = THREE.MathUtils.lerp(this.sizeMin, this.sizeMax, Math.random());
    particle.mesh.scale.setScalar(size);
    particle.mesh.visible = true;

    const speed = THREE.MathUtils.lerp(this.speedMin, this.speedMax, Math.random());
    particle.velocity.set(
      (Math.random() - 0.5) * speed,
      (Math.random() - 0.5) * speed * 0.6,
      (Math.random() - 0.5) * speed
    );

    particle.totalLife = THREE.MathUtils.lerp(this.lifeMin, this.lifeMax, Math.random());
    particle.lifeRemaining = particle.totalLife;
    particle.mesh.material.opacity = 0.4;
  }

  clear() {
    this.spawnAccumulator = 0;
    this.particles.forEach((particle) => {
      particle.lifeRemaining = 0;
      particle.totalLife = 0;
      particle.mesh.visible = false;
      particle.mesh.material.opacity = 0;
    });
  }

  dispose() {
    this.clear();
    this.particles.forEach((particle) => {
      particle.mesh.material.dispose();
    });
    this.sharedGeometry.dispose();
    this.group.clear();
    this.particles = [];
  }
}

class TrailController {
  trail = new Trail();
  trailHeadParticles = new TrailHeadParticles();
  trailHeadPosition = new THREE.Vector3();
  configuration = {
    isEnabled: true,
    pathSettings: {
      startXPosition: -0.96,
      startYPosition: -1.05,
      horizontalWidth: 3,
      horizontalCycles: 1.85,
      verticalAmplitude: 0.78,
      verticalCycles: 2.1,
      distanceAheadOfCamera: 1.65,
      baseDepthOffset: 4.78,
      depthSpan: 6.52,
      progressDepthOffset: -0.1,
    },
    responsiveSettings: {
      mobileBreakpoint: 768,
      mobileWidthScale: 0.35,
      mobileStartXOffset: 0.35,
    },
    pointSettings: {
      minimumPointCount: 14,
      maximumPointCount: 220,
      reverseLengthScale: 0.55,
      initialSeedPointCount: 10,
      initialSeedStepZ: 0.12,
      trimPerFrameForward: 4,
      trimPerFrameReverse: 32,
    },
    opacitySettings: {
      baseOpacity: 0.51,
      idleOpacityAtStart: 0.55,
      idleProgressThreshold: 0.01,
      startVisibilityBias: 0.1,
      edgeFadeStart: 0.04,
      edgeFadeEnd: 0.2,
      opacitySmoothing: 0.12,
    },
    specialEffectsSettings: {
      showHeadParticles: true,
    },
    directionChangeEpsilon: 0.0005,
  };
  runtimeState = {
    currentOpacity: this.configuration.opacitySettings.baseOpacity,
    hasSeededInitialPoints: false,
    hasUserMovedFromStart: false,
    previousDirection: 0,
    previousProgress: null as number | null,
  };

  constructor(private gallery: GalleryScene) {}

  init(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    scene.add(this.trail.object);
    scene.add(this.trailHeadParticles.object);
    this.seedInitialPoints(camera);
  }

  private getProgress(camera: THREE.PerspectiveCamera, scroll: ScrollController) {
    const scrollRange = scroll.maxCameraZ - scroll.minCameraZ;
    if (Number.isFinite(scrollRange) && scrollRange > 0) {
      return THREE.MathUtils.clamp((scroll.maxCameraZ - camera.position.z) / scrollRange, 0, 1);
    }

    const blend = this.gallery.getPlaneBlendData(camera.position.z);
    if (blend) {
      const lastIndex = Math.max(this.gallery.planes.length - 1, 1);
      return THREE.MathUtils.clamp((blend.currentPlaneIndex + blend.blend) / lastIndex, 0, 1);
    }

    return this.gallery.getDepthProgress(camera.position.z);
  }

  private computeHeadPosition(cameraZ: number, progress: number) {
    const { pathSettings, responsiveSettings } = this.configuration;
    const clampedProgress = THREE.MathUtils.clamp(progress, 0, 1);
    const isMobileViewport = window.innerWidth <= responsiveSettings.mobileBreakpoint;
    const responsiveStartXPosition =
      pathSettings.startXPosition + (isMobileViewport ? responsiveSettings.mobileStartXOffset : 0);
    const responsiveHorizontalWidth =
      pathSettings.horizontalWidth * (isMobileViewport ? responsiveSettings.mobileWidthScale : 1);

    const xPosition =
      responsiveStartXPosition +
      Math.sin(clampedProgress * Math.PI * 2 * pathSettings.horizontalCycles) *
        responsiveHorizontalWidth;
    const yPosition =
      pathSettings.startYPosition +
      Math.sin(clampedProgress * Math.PI * 2 * pathSettings.verticalCycles) *
        pathSettings.verticalAmplitude;
    const depthProgress =
      pathSettings.progressDepthOffset + clampedProgress * (1 - pathSettings.progressDepthOffset);
    const zPosition =
      cameraZ +
      pathSettings.distanceAheadOfCamera -
      (pathSettings.baseDepthOffset + depthProgress * pathSettings.depthSpan);

    this.trailHeadPosition.set(xPosition, yPosition, zPosition);
    return this.trailHeadPosition;
  }

  private seedInitialPoints(camera: THREE.PerspectiveCamera) {
    if (this.runtimeState.hasSeededInitialPoints) return;
    const startPosition = this.computeHeadPosition(camera.position.z, 0).clone();

    for (let index = this.configuration.pointSettings.initialSeedPointCount; index >= 0; index -= 1) {
      const seedPosition = startPosition.clone();
      seedPosition.z -= index * this.configuration.pointSettings.initialSeedStepZ;
      this.trail.addPoint(seedPosition);
    }

    this.runtimeState.hasSeededInitialPoints = true;
  }

  private getDirection(progress: number) {
    if (this.runtimeState.previousProgress === null) return 0;
    const progressDelta = progress - this.runtimeState.previousProgress;
    if (Math.abs(progressDelta) <= this.configuration.directionChangeEpsilon) return 0;
    return Math.sign(progressDelta);
  }

  private updateLength(progress: number, direction: number) {
    const { pointSettings } = this.configuration;
    const lengthProgress = direction < 0 ? progress * pointSettings.reverseLengthScale : progress;

    this.trail.maxPoints = Math.round(
      THREE.MathUtils.lerp(
        pointSettings.minimumPointCount,
        pointSettings.maximumPointCount,
        THREE.MathUtils.clamp(lengthProgress, 0, 1)
      )
    );
    this.trail.maxTrimPerFrame =
      direction < 0 ? pointSettings.trimPerFrameReverse : pointSettings.trimPerFrameForward;
  }

  private updateOpacity(progress: number) {
    const { opacitySettings } = this.configuration;
    const startDistance = THREE.MathUtils.clamp(progress + opacitySettings.startVisibilityBias, 0, 1);
    const endDistance = 1 - progress;
    const closestEdgeDistance = Math.min(startDistance, endDistance);
    const edgeVisibility = THREE.MathUtils.smoothstep(
      closestEdgeDistance,
      opacitySettings.edgeFadeStart,
      opacitySettings.edgeFadeEnd
    );
    const startupVisibility =
      !this.runtimeState.hasUserMovedFromStart && progress <= opacitySettings.idleProgressThreshold
        ? opacitySettings.idleOpacityAtStart
        : 0;
    const targetOpacity = opacitySettings.baseOpacity * Math.max(edgeVisibility, startupVisibility);

    this.runtimeState.currentOpacity = THREE.MathUtils.lerp(
      this.runtimeState.currentOpacity,
      targetOpacity,
      opacitySettings.opacitySmoothing
    );
    this.trail.material.opacity = this.runtimeState.currentOpacity;
  }

  update(camera: THREE.PerspectiveCamera, scroll: ScrollController, deltaSeconds: number) {
    if (!this.configuration.isEnabled) return;

    const currentProgress = this.getProgress(camera, scroll);
    if (currentProgress > this.configuration.opacitySettings.idleProgressThreshold) {
      this.runtimeState.hasUserMovedFromStart = true;
    }

    const currentDirection = this.getDirection(currentProgress);
    const hasDirectionReversed =
      currentDirection !== 0 &&
      this.runtimeState.previousDirection !== 0 &&
      currentDirection !== this.runtimeState.previousDirection;

    this.updateLength(currentProgress, currentDirection || this.runtimeState.previousDirection);
    const trailHeadPosition = this.computeHeadPosition(camera.position.z, currentProgress);
    this.updateOpacity(currentProgress);

    if (hasDirectionReversed) {
      this.trail.reset();
      const restartLeadPosition = trailHeadPosition.clone();
      restartLeadPosition.z += currentDirection * this.configuration.pointSettings.initialSeedStepZ;
      this.trail.addPoint(restartLeadPosition);
    }

    this.trail.addPoint(trailHeadPosition);

    if (currentDirection !== 0) this.runtimeState.previousDirection = currentDirection;
    this.runtimeState.previousProgress = currentProgress;

    this.trailHeadParticles.setEnabled(this.configuration.specialEffectsSettings.showHeadParticles);
    this.trailHeadParticles.update(
      deltaSeconds,
      trailHeadPosition,
      this.runtimeState.currentOpacity,
      true
    );
  }

  dispose() {
    this.trail.dispose();
    this.trailHeadParticles.dispose();
  }
}

export class TrefleDepthGalleryEngine {
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  private renderer: THREE.WebGLRenderer;
  private background = new BackgroundScene();
  private gallery = new GalleryScene();
  private label: LabelOverlay;
  private scroll: ScrollController;
  private trail: TrailController;
  private frameId: number | null = null;
  private lastTime = 0;
  private onResize = () => this.resize();

  constructor(
    private canvas: HTMLCanvasElement,
    private container: HTMLElement,
    overlayRoot: HTMLElement
  ) {
    this.camera.position.set(0, 0, 6);
    this.label = new LabelOverlay(this.gallery, overlayRoot);
    this.scroll = new ScrollController(this.camera, this.gallery, container);
    this.trail = new TrailController(this.gallery);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.autoClear = false;
  }

  async init() {
    const textureLoader = new THREE.TextureLoader();
    const textures = new Map<string, THREE.Texture>();

    await Promise.all(
      this.gallery.getTextureSources().map(async (textureSource) => {
        const texture = await textureLoader.loadAsync(textureSource);
        texture.colorSpace = THREE.SRGBColorSpace;
        textures.set(textureSource, texture);
      })
    );

    this.gallery.setPreloadedTextures(textures);
    this.gallery.init(this.scene);
    this.label.init();
    this.scroll.init();
    this.scroll.bindEvents();
    this.trail.init(this.scene, this.camera);
    this.resize();
    window.addEventListener("resize", this.onResize);
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  private loop = (time: number) => {
    this.frameId = requestAnimationFrame(this.loop);
    const deltaSeconds = Math.min((time - this.lastTime) / 1000, 0.1);
    this.lastTime = time;

    this.scroll.update();
    this.gallery.update(this.camera.position.z, this.scroll.velocity, this.scroll.velocityMax);
    this.label.update(this.camera.position.z);

    const planeBlendData = this.gallery.getPlaneBlendData(this.camera.position.z);
    const moodBlendData = this.gallery.getMoodBlendData(this.camera.position.z);

    if (moodBlendData) {
      this.background.setMoodBlend(moodBlendData);
    }

    if (planeBlendData) {
      const depthProgress = this.gallery.getDepthProgress(this.camera.position.z);
      const velocityIntensity = THREE.MathUtils.clamp(
        Math.abs(this.scroll.velocity) / Math.max(this.scroll.velocityMax, 0.0001),
        0,
        1
      );
      const distanceFromBlendCenter = Math.abs(planeBlendData.blend - 0.5) * 2;
      const transitionStability = THREE.MathUtils.smoothstep(distanceFromBlendCenter, 0.35, 1);
      this.background.setMotionResponse(depthProgress, velocityIntensity * transitionStability);
    }

    this.background.update(time);
    this.trail.update(this.camera, this.scroll, deltaSeconds);

    this.renderer.clear(true, true, true);
    this.background.render(this.renderer);
    this.renderer.clearDepth();
    this.renderer.render(this.scene, this.camera);
  };

  resize() {
    const width = this.container.clientWidth || window.innerWidth || 1;
    const height = this.container.clientHeight || window.innerHeight || 1;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    this.gallery.updatePlaneScale();
    this.gallery.layoutPlanes();
  }

  dispose() {
    if (this.frameId !== null) cancelAnimationFrame(this.frameId);
    window.removeEventListener("resize", this.onResize);
    this.scroll.dispose();
    this.trail.dispose();
    this.label.dispose();
    this.gallery.dispose();
    this.background.dispose();
    this.renderer.dispose();
  }
}

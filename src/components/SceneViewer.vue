<template>
  <div ref="container" class="scene-container"></div>
</template>
<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

export default {
  props: ['modelUrl'],
  mounted() {
    this.initScene();
    this.$root.$on('set-material', this.applyMaterialChange);
    if (this.modelUrl) this.loadModel(this.modelUrl);
  },
  methods: {
    initScene() {
      // Renderer
      this.renderer = new THREE.WebGLRenderer({ antialias:true });
      this.renderer.setSize(this.$refs.container.clientWidth, this.$refs.container.clientHeight);
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.0;
      this.renderer.shadowMap.enabled = true;
      this.renderer.physicallyCorrectLights = true;
      this.$refs.container.appendChild(this.renderer.domElement);

      // Scene & Camera
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        75,
        this.$refs.container.clientWidth/this.$refs.container.clientHeight,
        0.1, 1000
      );
      this.camera.position.set(0,2,5);

      // HDRI Environment
      new RGBELoader().setDataType(THREE.UnsignedByteType)
        .load('/hdr/environment.hdr', tex => {
          const pmrem = new THREE.PMREMGenerator(this.renderer);
          this.scene.environment = pmrem.fromEquirectangular(tex).texture;
          this.scene.environment.rotation = Math.PI/4;
          tex.dispose(); pmrem.dispose();
        });

      // Controls
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;

      // Post-Processing
      this.composer = new EffectComposer(this.renderer);
      this.composer.addPass(new RenderPass(this.scene, this.camera));
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(this.$refs.container.clientWidth,this.$refs.container.clientHeight),
        1.2, 0.4, 0.9
      );
      this.composer.addPass(bloom);

      this.animate();
    },
    loadModel(url) {
      const loader = new GLTFLoader();
      const draco = new DRACOLoader();
      draco.setDecoderPath('/draco/');
      loader.setDRACOLoader(draco);

      loader.load(url, gltf => {
        if (this.model) this.scene.remove(this.model);
        this.model = gltf.scene;
        this.meshes = [];

        this.model.traverse(obj => {
          if (obj.isMesh && obj.metadata && obj.metadata.textureMaps) {
            const maps = obj.metadata.textureMaps;
            const mat = new THREE.MeshStandardMaterial();
            ['diffuse','normal','roughness','ao'].forEach(type => {
              const tex = new THREE.TextureLoader().load(maps[type]);
              tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
              tex.repeat.set(1,1);
              tex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
              if(type==='diffuse') tex.encoding = THREE.sRGBEncoding;
              mat[type+'Map'] = tex;
            });
            obj.material = mat;
            this.meshes.push(obj);
          }
        });

        const parts = this.meshes.map((m,i)=>({
          index:i, type:m.metadata.type, material:m.metadata.material
        }));
        this.$root.$emit('model-loaded', parts);
        this.scene.add(this.model);
      });
    },
    applyMaterialChange({ category, material }) {
      const target = category.replace(/s$/, '');
      this.meshes.forEach(mesh => {
        if(mesh.metadata.type === target) {
          const maps = mesh.metadata.textureMaps;
          ['diffuse','normal','roughness','ao'].forEach(type => {
            const path = maps[type].replace(/\/[^\/]+\//, `/textures/${material}/`);
            mesh.material[type+'Map'] = new THREE.TextureLoader().load(path);
          });
          mesh.material.needsUpdate = true;
        }
      });
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.composer.render();
    }
  }
};
</script>
<style scoped>
.scene-container { width:100%; height:100%; background:#000; }
</style>

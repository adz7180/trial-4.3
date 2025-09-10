import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GLView } from 'expo-gl';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function SceneViewer({ modelUrl }) {
  const glViewRef = useRef();

  useEffect(() => {
    if (modelUrl) {
      initScene();
    }
  }, [modelUrl]);

  const initScene = async () => {
    const width = Dimensions.get('window').width;
    const height = 400;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(5, 5, 5);

    const renderer = new THREE.WebGLRenderer({ gl: glViewRef.current, antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff);

    const ambient = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffffff, 2);
    directional.position.set(5, 10, 7.5);
    scene.add(directional);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 50),
      new THREE.MeshStandardMaterial({ color: 0xeeeeee })
    );
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    const loader = new GLTFLoader();
    loader.load(modelUrl, (gltf) => {
      scene.add(gltf.scene);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  };

  return <GLView style={styles.glView} ref={glViewRef} onContextCreate={() => {}} />;
}

const styles = StyleSheet.create({
  glView: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff'
  }
});

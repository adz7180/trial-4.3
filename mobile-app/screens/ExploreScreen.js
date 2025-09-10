import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SceneViewer from '../components/SceneViewer';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Preview</Text>
      <SceneViewer modelUrl="/models/house5000.glb" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }
});

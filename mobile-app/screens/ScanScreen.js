import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import SceneViewer from '../components/SceneViewer';
import CustomizationPanel from '../components/CustomizationPanel';

export default function ScanScreen() {
  const [modelGenerated, setModelGenerated] = useState(false);
  const [modelUrl, setModelUrl] = useState('');

  const generateModel = () => {
    setModelUrl('/models/house3000.glb');
    setModelGenerated(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Your Blueprint</Text>
      <Text>Upload a floor plan image and generate a 3D model instantly.</Text>

      <Button title="Generate 3D Model" onPress={generateModel} />

      {modelGenerated && (
        <>
          <SceneViewer modelUrl={modelUrl} />
          <CustomizationPanel />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }
});

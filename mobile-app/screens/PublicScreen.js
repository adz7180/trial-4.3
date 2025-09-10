import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import SceneViewer from '../components/SceneViewer';
import CustomizationPanel from '../components/CustomizationPanel';

export default function PublicScreen() {
  const [selectedBuild, setSelectedBuild] = useState(null);

  const publicBuilds = [
    {
      id: 1,
      name: 'Modern 3000 sq ft',
      description: 'Glass walls, open concept, modern finishes.',
      modelUrl: '/models/house3000.glb'
    },
    {
      id: 2,
      name: 'Luxury 5000 sq ft',
      description: 'Grand staircase, marble floors, chandelier foyer.',
      modelUrl: '/models/house5000.glb'
    },
    {
      id: 3,
      name: 'Cozy 1800 sq ft',
      description: 'Rustic and functional starter home.',
      modelUrl: '/models/house1800.glb'
    }
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Explore Public Builds</Text>
      {!selectedBuild ? (
        publicBuilds.map((build) => (
          <View key={build.id} style={styles.card}>
            <Text style={styles.name}>{build.name}</Text>
            <Text>{build.description}</Text>
            <Button title="Open Build" onPress={() => setSelectedBuild(build)} />
          </View>
        ))
      ) : (
        <>
          <SceneViewer modelUrl={selectedBuild.modelUrl} />
          <CustomizationPanel />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5
  },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 }
});

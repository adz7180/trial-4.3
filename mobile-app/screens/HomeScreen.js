import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Design Your Dream Home</Text>
      <Text style={styles.subtitle}>Scan, customize, and visualize in hyper-realistic 3D</Text>
      <View style={styles.buttons}>
        <Button title="Scan Blueprint" onPress={() => navigation.navigate('Scan')} />
        <Button title="Start Customizing" onPress={() => navigation.navigate('Customize')} />
        <Button title="Public Builds" onPress={() => navigation.navigate('Public')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
  buttons: { width: '100%', gap: 15 }
});

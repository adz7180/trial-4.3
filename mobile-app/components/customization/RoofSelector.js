import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function RoofSelector({ onApply }) {
  const options = ['Flat', 'Gable', 'Hip', 'Mansard', 'Gambrel'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Roof</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Button key="Flat" title="Flat" onPress={() => onApply("roofselector", "Flat")} /><Button key="Gable" title="Gable" onPress={() => onApply("roofselector", "Gable")} /><Button key="Hip" title="Hip" onPress={() => onApply("roofselector", "Hip")} /><Button key="Mansard" title="Mansard" onPress={() => onApply("roofselector", "Mansard")} /><Button key="Gambrel" title="Gambrel" onPress={() => onApply("roofselector", "Gambrel")} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  title: { fontWeight: 'bold', marginBottom: 8 }
});
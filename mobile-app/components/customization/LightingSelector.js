import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function LightingSelector({ onApply }) {
  const options = ['Recessed', 'Wall Sconces', 'Floor Lamps', 'LED Strips'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Lighting</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Button key="Recessed" title="Recessed" onPress={() => onApply("lightingselector", "Recessed")} /><Button key="Wall Sconces" title="Wall Sconces" onPress={() => onApply("lightingselector", "Wall Sconces")} /><Button key="Floor Lamps" title="Floor Lamps" onPress={() => onApply("lightingselector", "Floor Lamps")} /><Button key="LED Strips" title="LED Strips" onPress={() => onApply("lightingselector", "LED Strips")} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  title: { fontWeight: 'bold', marginBottom: 8 }
});
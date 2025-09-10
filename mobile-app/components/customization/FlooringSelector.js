import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function FlooringSelector({ onApply }) {
  const options = ['Hardwood', 'Marble', 'Tile', 'Carpet', 'Laminate'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Flooring</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Button key="Hardwood" title="Hardwood" onPress={() => onApply("flooringselector", "Hardwood")} /><Button key="Marble" title="Marble" onPress={() => onApply("flooringselector", "Marble")} /><Button key="Tile" title="Tile" onPress={() => onApply("flooringselector", "Tile")} /><Button key="Carpet" title="Carpet" onPress={() => onApply("flooringselector", "Carpet")} /><Button key="Laminate" title="Laminate" onPress={() => onApply("flooringselector", "Laminate")} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  title: { fontWeight: 'bold', marginBottom: 8 }
});
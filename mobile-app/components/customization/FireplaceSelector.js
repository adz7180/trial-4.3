import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function FireplaceSelector({ onApply }) {
  const options = ['Modern Wall Mount', 'Traditional Brick', 'Luxury Stone', 'Electric Glass'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Fireplace</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Button key="Modern Wall Mount" title="Modern Wall Mount" onPress={() => onApply("fireplaceselector", "Modern Wall Mount")} /><Button key="Traditional Brick" title="Traditional Brick" onPress={() => onApply("fireplaceselector", "Traditional Brick")} /><Button key="Luxury Stone" title="Luxury Stone" onPress={() => onApply("fireplaceselector", "Luxury Stone")} /><Button key="Electric Glass" title="Electric Glass" onPress={() => onApply("fireplaceselector", "Electric Glass")} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  title: { fontWeight: 'bold', marginBottom: 8 }
});
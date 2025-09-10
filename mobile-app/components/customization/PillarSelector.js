import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function PillarSelector({ onApply }) {
  const options = ['Round Classic', 'Square Modern', 'Fluted Decorative', 'Stone Column'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Pillar</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Button key="Round Classic" title="Round Classic" onPress={() => onApply("pillarselector", "Round Classic")} /><Button key="Square Modern" title="Square Modern" onPress={() => onApply("pillarselector", "Square Modern")} /><Button key="Fluted Decorative" title="Fluted Decorative" onPress={() => onApply("pillarselector", "Fluted Decorative")} /><Button key="Stone Column" title="Stone Column" onPress={() => onApply("pillarselector", "Stone Column")} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  title: { fontWeight: 'bold', marginBottom: 8 }
});
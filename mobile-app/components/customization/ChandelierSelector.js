import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function ChandelierSelector({ onApply }) {
  const options = ['Modern Crystal', 'Rustic Iron', 'Minimalist LED', 'Classic Brass', 'Luxury Gold'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Chandelier</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Button key="Modern Crystal" title="Modern Crystal" onPress={() => onApply("chandelierselector", "Modern Crystal")} /><Button key="Rustic Iron" title="Rustic Iron" onPress={() => onApply("chandelierselector", "Rustic Iron")} /><Button key="Minimalist LED" title="Minimalist LED" onPress={() => onApply("chandelierselector", "Minimalist LED")} /><Button key="Classic Brass" title="Classic Brass" onPress={() => onApply("chandelierselector", "Classic Brass")} /><Button key="Luxury Gold" title="Luxury Gold" onPress={() => onApply("chandelierselector", "Luxury Gold")} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  title: { fontWeight: 'bold', marginBottom: 8 }
});
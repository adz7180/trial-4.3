import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function FurnitureSelector({ onApply }) {
  const options = ['Modern', 'Luxury Classic', 'Contemporary', 'Scandinavian', 'Industrial'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Furniture</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Button key="Modern" title="Modern" onPress={() => onApply("furnitureselector", "Modern")} /><Button key="Luxury Classic" title="Luxury Classic" onPress={() => onApply("furnitureselector", "Luxury Classic")} /><Button key="Contemporary" title="Contemporary" onPress={() => onApply("furnitureselector", "Contemporary")} /><Button key="Scandinavian" title="Scandinavian" onPress={() => onApply("furnitureselector", "Scandinavian")} /><Button key="Industrial" title="Industrial" onPress={() => onApply("furnitureselector", "Industrial")} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  title: { fontWeight: 'bold', marginBottom: 8 }
});
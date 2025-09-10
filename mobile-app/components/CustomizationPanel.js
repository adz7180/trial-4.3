import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';

export default function CustomizationPanel() {
  const categories = [
    'Flooring', 'Roof', 'Walls', 'Ceiling', 'Pillars',
    'Windows', 'Lighting', 'Furniture', 'Fireplace', 
    'Exterior', 'Feature Wall', 'Smart Home', 'Chandelier'
  ];

  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <View style={styles.panel}>
      <Text style={styles.title}>Customize Your Dream Home</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map(cat => (
          <Button
            key={cat}
            title={cat}
            color={selectedCategory === cat ? '#007bff' : '#ccc'}
            onPress={() => setSelectedCategory(cat)}
          />
        ))}
      </ScrollView>

      {selectedCategory && (
        <View style={styles.options}>
          <Text>Options for {selectedCategory} will be here.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 16,
    borderRadius: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  categoryScroll: {
    marginBottom: 10
  },
  options: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10
  }
});

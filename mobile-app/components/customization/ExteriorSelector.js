import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function ExteriorSelector({ onApply }) {
  const options = ['Brick', 'Stucco', 'Stone', 'Wood Siding', 'Concrete Modern'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Exterior</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Button key="Brick" title="Brick" onPress={() => onApply("exteriorselector", "Brick")} /><Button key="Stucco" title="Stucco" onPress={() => onApply("exteriorselector", "Stucco")} /><Button key="Stone" title="Stone" onPress={() => onApply("exteriorselector", "Stone")} /><Button key="Wood Siding" title="Wood Siding" onPress={() => onApply("exteriorselector", "Wood Siding")} /><Button key="Concrete Modern" title="Concrete Modern" onPress={() => onApply("exteriorselector", "Concrete Modern")} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  title: { fontWeight: 'bold', marginBottom: 8 }
});
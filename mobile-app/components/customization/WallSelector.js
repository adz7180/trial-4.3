import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function WallSelector({ onApply }) {
  const options = ['White Paint', 'Textured Panel', 'Brick Wall', 'Stone Finish'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Wall</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Button key="White Paint" title="White Paint" onPress={() => onApply("wallselector", "White Paint")} /><Button key="Textured Panel" title="Textured Panel" onPress={() => onApply("wallselector", "Textured Panel")} /><Button key="Brick Wall" title="Brick Wall" onPress={() => onApply("wallselector", "Brick Wall")} /><Button key="Stone Finish" title="Stone Finish" onPress={() => onApply("wallselector", "Stone Finish")} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  title: { fontWeight: 'bold', marginBottom: 8 }
});
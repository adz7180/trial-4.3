import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function FeatureWallSelector({ onApply }) {
  const options = ['Wood Panel', 'Marble Accent', 'Brick Finish', 'Wallpaper'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select FeatureWall</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Button key="Wood Panel" title="Wood Panel" onPress={() => onApply("featurewallselector", "Wood Panel")} /><Button key="Marble Accent" title="Marble Accent" onPress={() => onApply("featurewallselector", "Marble Accent")} /><Button key="Brick Finish" title="Brick Finish" onPress={() => onApply("featurewallselector", "Brick Finish")} /><Button key="Wallpaper" title="Wallpaper" onPress={() => onApply("featurewallselector", "Wallpaper")} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  title: { fontWeight: 'bold', marginBottom: 8 }
});
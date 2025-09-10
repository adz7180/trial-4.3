import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function WindowSelector({ onApply }) {
  const options = ['Sliding', 'Casement', 'Bay', 'Picture', 'Double Hung'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Window</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Button key="Sliding" title="Sliding" onPress={() => onApply("windowselector", "Sliding")} /><Button key="Casement" title="Casement" onPress={() => onApply("windowselector", "Casement")} /><Button key="Bay" title="Bay" onPress={() => onApply("windowselector", "Bay")} /><Button key="Picture" title="Picture" onPress={() => onApply("windowselector", "Picture")} /><Button key="Double Hung" title="Double Hung" onPress={() => onApply("windowselector", "Double Hung")} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  title: { fontWeight: 'bold', marginBottom: 8 }
});
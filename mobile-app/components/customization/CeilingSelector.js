import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function CeilingSelector({ onApply }) {
  const options = ['Flat', 'Vaulted', 'Coffered', 'Tray'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Ceiling</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Button key="Flat" title="Flat" onPress={() => onApply("ceilingselector", "Flat")} /><Button key="Vaulted" title="Vaulted" onPress={() => onApply("ceilingselector", "Vaulted")} /><Button key="Coffered" title="Coffered" onPress={() => onApply("ceilingselector", "Coffered")} /><Button key="Tray" title="Tray" onPress={() => onApply("ceilingselector", "Tray")} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  title: { fontWeight: 'bold', marginBottom: 8 }
});
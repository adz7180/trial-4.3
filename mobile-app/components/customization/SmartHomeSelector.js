import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function SmartHomeSelector({ onApply }) {
  const options = ['Voice Lights', 'Smart Thermostat', 'Auto Blinds', 'Security Cameras', 'Smart Locks'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select SmartHome</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Button key="Voice Lights" title="Voice Lights" onPress={() => onApply("smarthomeselector", "Voice Lights")} /><Button key="Smart Thermostat" title="Smart Thermostat" onPress={() => onApply("smarthomeselector", "Smart Thermostat")} /><Button key="Auto Blinds" title="Auto Blinds" onPress={() => onApply("smarthomeselector", "Auto Blinds")} /><Button key="Security Cameras" title="Security Cameras" onPress={() => onApply("smarthomeselector", "Security Cameras")} /><Button key="Smart Locks" title="Smart Locks" onPress={() => onApply("smarthomeselector", "Smart Locks")} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  title: { fontWeight: 'bold', marginBottom: 8 }
});
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function PlanScreen() {
  const [income, setIncome] = useState('');
  const [result, setResult] = useState('');

  const calculate = () => {
    const saving = income * 0.2;  // 20% सेविंग
    setResult(`हर महीने ₹${saving} बचाएं और SIP में ₹${saving * 0.5} invest करें!`);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>अपनी Monthly Income डालें:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, margin: 10 }}
        keyboardType="numeric"
        value={income}
        onChangeText={setIncome}
      />
      <Button title="Calculate" onPress={calculate} />
      <Text style={{ marginTop: 20 }}>{result}</Text>
    </View>
  );
}
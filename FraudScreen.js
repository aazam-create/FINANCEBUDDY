import React from 'react';
import { View, Text, FlatList } from 'react-native';

const scams = [
  { id: '1', title: 'Fake KYC Call', desc: 'अपना KYC कभी भी call पर पूरा न करें!' },
  { id: '2', title: 'WhatsApp Lottery', desc: 'आपने 25 लाख जीते — ये scam है!' },
];

export default function FraudScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Latest Scams:</Text>
      <FlatList
        data={scams}
        renderItem={({ item }) => (
          <View style={{ padding: 10, backgroundColor: '#ffebee', margin: 5 }}>
            <Text style={{ fontWeight: 'bold' }}>⚠️ {item.title}</Text>
            <Text>{item.desc}</Text>
          </View>
        )}
      />
    </View>
  );
}
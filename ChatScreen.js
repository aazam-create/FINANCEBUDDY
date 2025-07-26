import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const botResponses = {
  "invest": "आप ₹5000/month SIP में invest कर सकते हैं!",
  "scam": "UPI PIN किसी को न बताएँ!",
  "default": "मैं आपकी कैसे मदद करूँ? (invest/scam पूछें)"
};

export default function ChatScreen() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('FinGenie: नमस्ते! पूछें (invest/scam)');

  const handleSend = () => {
    const reply = botResponses[input.toLowerCase()] || botResponses.default;
    setResponse(`You: ${input}\nFinGenie: ${reply}`);
    setInput('');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>{response}</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, margin: 10 }}
        value={input}
        onChangeText={setInput}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
}
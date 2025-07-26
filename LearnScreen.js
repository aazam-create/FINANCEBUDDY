import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';

const questions = [
  {
    question: "UPI Fraud से बचने का तरीका क्या है?",
    options: ["किसी को भी UPI PIN बताना", "केवल verified links पर क्लिक करना"],
    answer: 1
  },
  // 2-3 और सवाल जोड़ें
];

export default function LearnScreen() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (selected) => {
    if (selected === questions[currentQ].answer) {
      setScore(score + 1);
      Alert.alert("सही जवाब! 🎁 10 Points मिले!");
    } else {
      Alert.alert("गलत जवाब! सही उत्तर है: " + questions[currentQ].options[questions[currentQ].answer]);
    }
    setCurrentQ(currentQ + 1);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Question {currentQ + 1}: {questions[currentQ]?.question}</Text>
      {questions[currentQ]?.options.map((opt, index) => (
        <Button key={index} title={opt} onPress={() => handleAnswer(index)} />
      ))}
    </View>
  );
}
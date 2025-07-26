import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, FlatList, Alert, ImageBackground, Image, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LearnScreen from './LearnScreen';
// ... (previous imports)
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
          options={{ title: 'Create Account' }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerLeft: null }} // Hide back button on Home
        />
        {/* Keep your existing screens below */}
        <Stack.Screen name="Learn" component={LearnScreen} />
        <Stack.Screen name="Plan" component={PlanScreen} />
        <Stack.Screen name="Fraud" component={FraudScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// 1. Enhanced Home Screen with Background Image and Better Styling
function HomeScreen({ navigation }) {
  return (
    <ImageBackground 
      source={require('./assets/bg.jpg')} 
      style={styles.background}
      blurRadius={2}
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Image 
            source={require('./assets/app-icon.png')} 
            style={styles.appIcon} 
          />
          <Text style={styles.title}>Finance Buddy</Text>
          <Text style={styles.subtitle}>Learn. Plan. Protect.</Text>
        </View>

        <ScrollView contentContainerStyle={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.learnButton]}
            onPress={() => navigation.navigate('Learn')}
          >
            <Text style={styles.buttonText}>📚 Learn Finance</Text>
            <Text style={styles.buttonSubtext}>Interactive lessons & quizzes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.planButton]}
            onPress={() => navigation.navigate('Plan')}
          >
            <Text style={styles.buttonText}>🎯 Plan Goals</Text>
            <Text style={styles.buttonSubtext}>Personalized financial planning</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.fraudButton]}
            onPress={() => navigation.navigate('Fraud')}
          >
            <Text style={styles.buttonText}>🔒 Fraud Alerts</Text>
            <Text style={styles.buttonSubtext}>Latest scam warnings</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.chatButton]}
            onPress={() => navigation.navigate('Chat')}
          >
            <Text style={styles.buttonText}>🧞 FinGenie</Text>
            <Text style={styles.buttonSubtext}>AI financial assistant</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

// 3. Enhanced Plan Screen (Goal Planner)
function PlanScreen() {
  const [income, setIncome] = useState('');
  const [result, setResult] = useState('');
  const [goal, setGoal] = useState('retirement');

  const calculate = () => {
    if (!income) {
      Alert.alert('Error', 'Please enter your income');
      return;
    }
    
    const saving = income * 0.2;
    const investment = saving * 0.6;
    const emergency = saving * 0.4;
    
    let goalSpecific = '';
    switch(goal) {
      case 'house':
        goalSpecific = `\n• Save ₹${investment * 12} yearly for down payment`;
        break;
      case 'retirement':
        goalSpecific = `\n• Invest ₹${investment} monthly in NPS or Mutual Funds`;
        break;
      case 'education':
        goalSpecific = `\n• Start RD of ₹${investment * 0.8} monthly for education fund`;
        break;
    }
    
    setResult(
      `💡 Financial Plan:\n\n` +
      `• Save 20% (₹${saving}/month)\n` +
      `• Invest 60% of savings (₹${investment}/month)\n` +
      `• Keep 40% (₹${emergency}/month) for emergency\n` +
      goalSpecific
    );
  };

  return (
    <ScrollView style={styles.planContainer}>
      <Text style={styles.sectionTitle}>Goal Planning</Text>
      
      <Text style={styles.label}>Monthly Income (₹):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={income}
        onChangeText={setIncome}
        placeholder="e.g. 50000"
      />

      <Text style={styles.label}>Primary Goal:</Text>
      <View style={styles.goalButtons}>
        {['house', 'retirement', 'education'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.goalButton,
              goal === item && styles.selectedGoalButton
            ]}
            onPress={() => setGoal(item)}
          >
            <Text style={styles.goalButtonText}>
              {item === 'house' ? '🏠 Buy House' : 
               item === 'retirement' ? '👵 Retirement' : 
               '🎓 Education'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.calculateButton}
        onPress={calculate}
      >
        <Text style={styles.calculateButtonText}>Generate Plan</Text>
      </TouchableOpacity>

      {result ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

// 4. Enhanced Fraud Screen (Alerts)
function FraudScreen() {
  const [expandedId, setExpandedId] = useState(null);

  const scams = [
    { 
      id: '1', 
      title: 'Fake KYC Call', 
      desc: 'Scammers call pretending to be from your bank', 
      details: 'They ask for your personal details or OTP to "update KYC". Never share OTP or sensitive information over call.',
      severity: 'High'
    },
    { 
      id: '2', 
      title: 'WhatsApp Lottery', 
      desc: 'You won 25 lakhs in a lottery you never entered!', 
      details: 'They ask for processing fees to claim your prize. Remember: If it sounds too good to be true, it probably is.',
      severity: 'Medium'
    },
    { 
      id: '3', 
      title: 'UPI Payment Reversal', 
      desc: '"Merchant" asks you to scan QR for refund', 
      details: 'This is actually a payment request. Never scan QR codes from unknown sources for "refunds".',
      severity: 'High'
    },
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.fraudContainer}>
      <Text style={styles.sectionTitle}>Latest Scam Alerts</Text>
      <Text style={styles.subHeader}>Tap on any alert for details</Text>
      
      <FlatList
        data={scams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.alertItem,
              item.severity === 'High' && styles.highAlert,
              item.severity === 'Medium' && styles.mediumAlert
            ]}
            onPress={() => toggleExpand(item.id)}
          >
            <View style={styles.alertHeader}>
              <Text style={styles.alertTitle}>⚠️ {item.title}</Text>
              <Text style={styles.alertSeverity}>{item.severity} Risk</Text>
            </View>
            <Text style={styles.alertDesc}>{item.desc}</Text>
            
            {expandedId === item.id && (
              <View style={styles.alertDetails}>
                <Text style={styles.detailsText}>{item.details}</Text>
                <Text style={styles.protectionText}>
                  🛡️ Protection Tip: {item.severity === 'High' ? 
                  'Immediately block your card if shared details' : 
                  'Verify through official channels before acting'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// 5. Enhanced Chat Screen (AI Bot)
function ChatScreen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'FinGenie: नमस्ते! मैं आपका वित्तीय सहायक हूँ। आप मुझसे (invest/scam/saving/tax) के बारे में पूछ सकते हैं!', isBot: true }
  ]);

  const botResponses = {
    "invest": "आप ₹5000/month SIP में निवेश कर सकते हैं। अच्छे returns के लिए Index Funds या Large Cap Funds चुनें।",
    "scam": "कभी भी UPI PIN, OTP या बैंक विवरण किसी के साथ साझा न करें। बैंक कभी भी इन्हें माँगने नहीं call करता।",
    "saving": "20-50-30 नियम अपनाएँ: 20% बचत, 50% जरूरतें, 30% मनपसंद चीजों पर।",
    "tax": "80C के तहत ₹1.5 लाख तक की बचत: PPF, ELSS, या बीमा प्रीमियम में निवेश करें।",
    "default": "मैं आपकी कैसे मदद करूँ? आप (invest/scam/saving/tax) में से किसी के बारे में पूछ सकते हैं!"
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { id: Date.now().toString(), text: `You: ${input}`, isBot: false }]);
    
    // Bot response
    const replyKey = Object.keys(botResponses).find(key => 
      input.toLowerCase().includes(key)
    );
    const reply = botResponses[replyKey || 'default'];
    
    setTimeout(() => {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: `FinGenie: ${reply}`, isBot: true }]);
    }, 500);
    
    setInput('');
  };

  return (
    <View style={styles.chatContainer}>
      <Text style={styles.chatHeader}>FinGenie - Your AI Finance Guide</Text>
      
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBubble,
            item.isBot ? styles.botMessage : styles.userMessage
          ]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.messagesList}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.chatInput}
          value={input}
          onChangeText={setInput}
          placeholder="Type your question (invest/scam/saving)..."
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSend}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Navigation Setup
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3498db',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Finance Buddy' }}
        />
        <Stack.Screen 
          name="Learn" 
          component={LearnScreen} 
          options={{ title: 'Learn Finance' }}
        />
        <Stack.Screen 
          name="Plan" 
          component={PlanScreen} 
          options={{ title: 'Goal Planner' }}
        />
        <Stack.Screen 
          name="Fraud" 
          component={FraudScreen} 
          options={{ title: 'Fraud Alerts' }}
        />
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen} 
          options={{ title: 'FinGenie AI' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Enhanced Styles
const styles = StyleSheet.create({
  // Home Screen Styles
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  appIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#3498db',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  button: {
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  learnButton: {
    backgroundColor: '#3498db',
  },
  planButton: {
    backgroundColor: '#2ecc71',
  },
  fraudButton: {
    backgroundColor: '#e74c3c',
  },
  chatButton: {
    backgroundColor: '#9b59b6',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 5,
  },

  // Plan Screen Styles
  planContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  goalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  goalButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#ecf0f1',
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedGoalButton: {
    backgroundColor: '#3498db',
  },
  goalButtonText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  calculateButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  calculateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 25,
    padding: 15,
    backgroundColor: '#e8f4fc',
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#3498db',
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2c3e50',
  },

  // Fraud Screen Styles
  fraudContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  subHeader: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
    textAlign: 'center',
  },
  alertItem: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  highAlert: {
    borderLeftWidth: 5,
    borderLeftColor: '#e74c3c',
  },
  mediumAlert: {
    borderLeftWidth: 5,
    borderLeftColor: '#f39c12',
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  alertSeverity: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  alertDesc: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 5,
  },
  alertDetails: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  detailsText: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 8,
  },
  protectionText: {
    fontSize: 14,
    color: '#27ae60',
    fontWeight: '500',
  },

  // Chat Screen Styles
  chatContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatHeader: {
    padding: 15,
    backgroundColor: '#3498db',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messagesList: {
    padding: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 0,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3498db',
    borderBottomRightRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  botMessageText: {
    color: '#2c3e50',
  },
  userMessageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
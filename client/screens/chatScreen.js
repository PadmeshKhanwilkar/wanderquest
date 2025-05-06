// ChatScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ChatScreen = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', sender: 'bot', text: 'Hi! Ask me anything.' },
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            ...
              .filter(m => m.sender !== 'bot')
              .map(m => ({ role: 'user', content: m.text })),
            { role: 'user', content: input },
          ],
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            'Content-Type': 'application/json',
          },
        }
      );

      const botReply = {
        id: Date.now().toString() + '-bot',
        sender: 'bot',
        text: response.data.choices[0].message.content.trim(),
      };
      setMessages(prev => [...prev, botReply]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={item.sender === 'user' ? styles.user : styles.bot}>
            {item.text}
          </Text>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  user: { alignSelf: 'flex-end', backgroundColor: '#d0f0c0', margin: 5, padding: 10 },
  bot: { alignSelf: 'flex-start', backgroundColor: '#f0f0f0', margin: 5, padding: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, padding: 10, marginRight: 10, borderRadius: 5 },
});

export default ChatScreen;

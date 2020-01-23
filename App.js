import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Header from './components/header';

export default function App() {

  return (
    <View style={styles.screen}>
        <Header title="Guess a Number"  />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
});

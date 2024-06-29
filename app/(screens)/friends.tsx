import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import FriendList from '@/components/FriendList'

export default function Friends() {
    return(
        <SafeAreaView>
        <FriendList/>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
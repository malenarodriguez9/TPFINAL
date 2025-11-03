import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DynamicForm from '../components/DynamicForm';


function Home() {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <DynamicForm/>
        </View>
    )
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      },
    title: {
        fontSize: 24,
        marginBottom: 30,
        fontWeight: 'bold',
        color: '#222',
    },
})
export default Home;
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

function Profile(props) {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Pressable style={styles.boton} onPress={() => props.navigation.navigate("Login")}> 
                <Text style={styles.botonTexto}>Desloguearse</Text> 
            </Pressable>
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
    boton: {
        backgroundColor: '#6c5ce7',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 15,
    },
    botonTexto: {
        color: '#fff',
        fontSize: 16,
    },
})

export default Profile;
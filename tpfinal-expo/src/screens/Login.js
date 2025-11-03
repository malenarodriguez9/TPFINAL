import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-web';
import {auth} from '../firebase/config';

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email:"",
            user: "",
            password:"",

        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){ 
                console.log("Usuario ya logueado:", user.email);
                this.props.navigation.navigate("HomeMenu");
            }
        });
    }

    onSubmit(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(response => {
            console.log('Usuario logueado correctamente:', response.user.email);
            this.props.navigation.navigate('Home');     
        })
        .catch(error => {
            console.log(error);
            this.setState({ error: 'Credenciales incorrectas' });
        });
    }

render(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText= {text => this.setState({email: text})}
                value={this.state.email}
            />
            <TextInput style={styles.input}
                placeholder="Usuario"
                onChangeText= {text => this.setState({user: text})}
                value={this.state.user}
            />
            <TextInput style={styles.input}
                placeholder="Password"
                keyboardType= "default"
                secureTextEntry = {true}
                onChangeText= {text => this.setState({password: text})}
                value={this.state.password}
            />
            <Pressable onPress={() => this.onSubmit(this.state.email, this.state.password)}> 
                <Text>Login</Text>
            </Pressable>


            <Pressable style={styles.boton} onPress={() => this.props.navigation.navigate("Register")}> 
                <Text style={styles.botonTexto}>Ir al registro</Text> 
            </Pressable>
            <Pressable style={styles.botondos} onPress={() => this.props.navigation.navigate('HomeMenu')}> 
                <Text style={styles.botondosTexto}>Entrar a la app</Text> 
            </Pressable>
        </View>
    )
}}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 40,
        textAlign: 'center',
      },
      input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
      },
      boton: {
        backgroundColor: '#6c5ce7',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 20,
        width: '80%',
        alignItems: 'center',
      },
      botonTexto: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
      },
      botondos: {
        borderColor: '#6c5ce7',
        borderWidth: 1.5,
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
      },
      botondosTexto: {
        color: '#6c5ce7',
        fontSize: 17,
        fontWeight: '600',
      },

  })

export default Login;
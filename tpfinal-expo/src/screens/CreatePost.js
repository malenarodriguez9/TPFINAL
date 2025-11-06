 // CreatePost.js
import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texto: '',
      mensaje: '',
    };
  }

  crearPost() {
    const user = auth.currentUser;

    if (!user) {
      this.setState({ mensaje: 'Tenés que estar logueado para crear un post.' });
      return;
    }

    if (this.state.texto === '') {
      this.setState({ mensaje: 'El post no puede estar vacío.' });
      return;
    }

    db.collection('posts')
      .add({
        texto: this.state.texto,
        owner: user.email,
        createdAt: Date.now(), 
        likes: [],
      })
      .then(() => {
        this.setState({
          texto: '',
          mensaje: 'El post se creó correctamente.',
        });
        this.props.navigation.navigate('Home');
      })
      .catch(() => {
        this.setState({ mensaje: 'Ocurrió un error al crear el post.' });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Nuevo Post</Text>

        <TextInput
          style={styles.input}
          placeholder="Escribí tu post..."
          multiline
          value={this.state.texto}
          onChangeText={(text) => this.setState({ texto: text })}
        />

<Pressable style={styles.boton} onPress={() => this.crearPost()}>
  <Text style={styles.botonTexto}>PUBLICAR</Text>
</Pressable>

        <Text style={styles.mensaje}>{this.state.mensaje}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2', // fondo claro, no violeta
  },
  titulo: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: 'bold',
    color: '#222',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    height: 100,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#333',
  },
  boton: {
    backgroundColor: '#6c5ce7', // violeta
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  botonTexto: {
    color: '#fff', // texto blanco
    fontSize: 16,
    fontWeight: 'bold',
  },
  mensaje: {
    marginTop: 15,
    textAlign: 'center',
    color: '#333',
  },
  boton: {
    backgroundColor: '#6c5ce7',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreatePost;
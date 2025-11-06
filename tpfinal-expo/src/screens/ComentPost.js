import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      comments: []
    };
  }

  componentDidMount() {
    const postId = this.props.route.params.id;

    db.collection('posts')
      .doc(postId)
      .onSnapshot(doc => {
        this.setState({
          comments: doc.data().comments ? doc.data().comments : []
        });
      });
  }

  agregarComentario() {
    const postId = this.props.route.params.id;

    db.collection('posts')
      .doc(postId)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          owner: auth.currentUser.email,
          texto: this.state.comment,
          createdAt: Date.now()
        })
      })
      .then(() => {
        this.setState({ comment: '' });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Comentarios</Text>

        <FlatList
          data={this.state.comments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentBox}>
              <Text style={styles.owner}>{item.owner}</Text>
              <Text>{item.texto}</Text>
            </View>
          )}
        />

        <TextInput
          style={styles.input}
          placeholder="Escribí un comentario..."
          value={this.state.comment}
          onChangeText={text => this.setState({ comment: text })}
        />

<Pressable style={styles.boton} onPress={() => this.agregarComentario()}>
  <Text style={styles.botonTexto}>PUBLICAR COMENTARIO</Text>
</Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 22,
    marginBottom: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    backgroundColor: '#fff'
  },
  commentBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  owner: {
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#555'
  },
  texto: {
    color: '#333'
  },
  boton: {
    backgroundColor: '#6c5ce7', // solo el botón violeta 💜
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

export default Comments;
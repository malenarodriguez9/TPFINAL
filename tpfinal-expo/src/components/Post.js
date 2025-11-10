import React, { Component } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase";

class Post extends Component {
  constructor(props) {
    super(props);

  }

  like() {
    db.collection('posts')
      .doc(this.props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      });
  }

  unlike() {
    db.collection('posts')
      .doc(this.props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      });
  }

  render() {
    const data = this.props.data;

    return (
      <View style={styles.post}>
        <Text style={styles.user}>Usuario: {data.owner}</Text>
        <Text style={styles.text}>{data.texto}</Text>
        <Text>Likes: {data.likes.length}</Text>

        {data.likes.includes(auth.currentUser.email) ? (
          <Pressable onPress={() => this.unlike()}>
            <Text style={styles.unlike}>Unlike</Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => this.like()}>
            <Text style={styles.like}>Like</Text>
          </Pressable>
        )}

        <Pressable
          onPress={() =>
            this.props.navigation.navigate('ComentPost', { id: this.props.id })
          }
        >
          <Text style={styles.comment}>Comentar</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15
  },
  user: {
    fontWeight: 'bold'
  },
  text: {
    marginVertical: 5
  },
  like: {
    color: 'green',
    marginTop: 5
  },
  unlike: {
    color: 'red',
    marginTop: 5
  },
  comment: {
    color: 'blue',
    marginTop: 10
  }
});

export default Post;

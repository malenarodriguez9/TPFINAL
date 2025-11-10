import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';
import Post from '../components/Post';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (!user) {
        this.props.navigation.navigate('Login');
      } else {
        db.collection('posts')
          .orderBy('createdAt', 'desc')
          .onSnapshot(docs => {
            let posts = [];
            docs.forEach(doc => {
              posts.push({
                id: doc.id,
                data: doc.data(),
              });
            });
            this.setState({ posts });
          });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>

        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Post
              id={item.id}
              data={item.data}
              navigation={this.props.navigation}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
  },
  title: {
      fontSize: 24,
      marginBottom: 20,
      fontWeight: 'bold',
      color: '#222',
      textAlign: 'center'
  },
});

export default Home;


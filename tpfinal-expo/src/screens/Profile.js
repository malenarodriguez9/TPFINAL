import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import firebase from "firebase"
import { auth, db } from '../firebase/config';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            user: "",
            posteos: [],
            loading: true,
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ email: user.email });

                db.collection('users')
                    .where('owner', '==', auth.currentUser.email)
                    .onSnapshot(docs => {
                        docs.forEach(doc => {
                            this.setState({
                               user: doc.data().user
                            });
                        })}
                    );

                db.collection('posts')
                    .where('owner', '==', auth.currentUser.email)
                    .onSnapshot(docs => {
                        let posts = [];
                        docs.forEach(doc => {
                            posts.push({
                                id: doc.id,
                                data: doc.data()
                            });
                        });
                        this.setState({
                            posteos: posts,
                            loading: false
                        });
                    });
            } else {
                this.props.navigation.navigate('Login');
            }
        })
    }

    logout() {
        auth.signOut();
    }

    likePost(id) {
        db.collection('posts')
            .doc(id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            });
    }

    unlikePost(id) {
        db.collection('posts')
            .doc(id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Mi Perfil</Text>
                <Text style={styles.text}>Usuario: {this.state.user}</Text>
                <Text style={styles.text}>Email: {this.state.email}</Text>

                <Text style={styles.subtitle}>Mis posteos:</Text>

                    <FlatList
                        data={this.state.posteos}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <View style={styles.post}>
                                <Text style={styles.user}>Usuario: {item.data.owner}</Text>
                                <Text style={styles.text}>{item.data.texto}</Text>
                                <Text>Likes: {item.data.likes.length}</Text>

                                {item.data.likes.includes(auth.currentUser.email) ? (
                                    <Pressable onPress={() => this.unlikePost(item.id)}>
                                        <Text style={styles.unlike}>Unlike</Text>
                                    </Pressable>
                                ) : (
                                    <Pressable onPress={() => this.likePost(item.id)}>
                                        <Text style={styles.like}>Like</Text>
                                    </Pressable>
                                )}

                                <Pressable
                                    onPress={() =>
                                        this.props.navigation.navigate('ComentPost', { id: item.id })
                                    }
                                >
                                    <Text style={styles.comment}>Comentar</Text>
                                </Pressable>
                            </View>
                        }
                    />

                <Pressable style={styles.boton} onPress={() => this.logout()}>
                    <Text style={styles.botonTexto}>Logout</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        color: '#222',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
        marginTop: 24,
        marginBottom: 12,
    },
    post: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15
    },
    user: {
        fontWeight: 'bold',
        marginBottom: 5
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
    },
    boton: {
        backgroundColor: '#6c5ce7',
        paddingVertical: 14,
        borderRadius: 10,
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    botonTexto: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center',
    }
});

export default Profile;



import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            user: "",
            posteos: [],
            loading: true,
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
                this.setState({ email: user.email });

                db.collection('users')
                .where('owner','==', auth.currentUser.email)
                .limit(1)
                .onSnapshot(docs => {
                    let usuarios = []
                    docs.forEach( doc => {
                        usuarios.push({
                            id:doc.id,
                            data:doc.data()
                        })
                        if (usuarios.length > 0)
                        this.setState({
                            user: usuarios[0].data.user,
                        });
                    });
                });

               
                db.collection('posts')
                .where('owner','==', auth.currentUser.email)
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

    logout(){
    auth.signOut();
}

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Mi Perfil</Text>

                <Text style={styles.text}>Usuario: {this.state.user}</Text>
                <Text style={styles.text}>Email: {this.state.email}</Text>

                <Text style={styles.subtitle}>Mis posteos:</Text>

                { this.state.loading ?
                    <Text>Cargando...</Text>
                :
                    <FlatList
                        data={this.state.posteos}
                        keyExtractor={item => item.id}
                        renderItem={({item}) =>
                            <Text style={styles.post}>{item.data.texto}</Text>
                        }
                    />
                }

                <Pressable style={styles.boton} onPress={() => this.logout()}>
                    <Text style={styles.botonTexto}>Logout</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
      },
      title:{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 20,
      },
      text:{
        fontSize: 18,
        color: '#222',
        marginBottom: 4,
      },
      subtitle:{
        fontSize: 20,
        fontWeight:'bold',
        color: '#222',
        marginTop: 24,
        marginBottom: 12,
      },
      boton:{
        backgroundColor: '#6c5ce7',
        paddingVertical: 14,
        borderRadius: 10,
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 30,
      },
      botonTexto:{
        color:'#fff',
        fontSize: 17,
        fontWeight:'700',
        textAlign:'center',
      },
      post:{
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 10,
        fontSize: 16,
        color: '#333'
      }
});

export default Profile;



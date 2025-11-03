import React, { Component } from 'react';
import { View, Text, Pressable} from 'react-native';
import { TextInput } from 'react-native-web';
import { auth, db, firebase } from '../firebase/config'; 

class CreatePost extends Component {
    constructor(props){
      super(props);
      this.state = {
        text:""
      };
    }

    componentDidMount() {
      auth.onAuthStateChanged(user => {
          if (!user) {
              this.props.navigation.navigate('Login')
          } 
  })}

}

export default CreatePost; 
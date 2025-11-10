import React, { Component } from "react";
import { View, Text } from "react-native";

class Post extends Component {
  
  render() {
    return (
      <View>
        <Text>{this.props.data.texto}</Text>
        <Text>Creado por: {this.props.data.owner}</Text>
      </View>
    );
  }
}

export default Post;
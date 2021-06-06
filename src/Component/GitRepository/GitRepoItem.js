import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    useWindowDimensions
  } from 'react-native';
import Styles from './Styles';
import HTML from "react-native-render-html";
const GitRepoItem = ({ repository }) => {
  const contentWidth = useWindowDimensions().width;
    return (
      <View style={Styles.gitRepoItemContainer}>
        <Text style={Styles.cursorName}>{repository.cursor.toUpperCase()}</Text>
        <Text style={Styles.nodeName}>{repository.node.name.toUpperCase()}</Text>
        {/* <Text style={Styles.descriptionHTML}>{repository.node.descriptionHTML}</Text> */}
        <HTML source={{ html: repository.node.descriptionHTML }} contentWidth={contentWidth} />
      </View>
  
    )
  }
  export default GitRepoItem;
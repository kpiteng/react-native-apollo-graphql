import React, { useEffect, useState } from 'react'
import {
  View,
  TextInput,
  SafeAreaView
} from 'react-native';
import { FlatList } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import GitRepoItem from './GitRepoItem';
import FooterView from './FooterView';
import ItemSeparatorComponent from './ItemSeparatorComponent';
import Styles from './Styles';
let scrollPosition = 0;
let dataLoading = true;

const fetchRepository = gql`
query SearchMostTop10Star($queryString: String! $afterCursor:String) {
  search(query: $queryString, type: REPOSITORY, first: 10, after: $afterCursor){
    repositoryCount
    edges {
      node {
        ... on Repository {
          name
          descriptionHTML
        }
      }
      cursor
    }
  }
}
`
export default () => {

  const [searchText, setSearchText] = useState('');
  const [arrRepository, setArrRepository] = useState([]);
  const [cursorVariable, setCursorVariable] = useState({
    "queryString": "",
  });

  const { data } = useQuery(fetchRepository, {
    variables: cursorVariable
  });

  useEffect(() => {
    if (data) {
      setArrRepository([...arrRepository, ...data.search.edges]);
      dataLoading = false;
    }
  }, [data]);

  const endEditing = (e) => {
    dataLoading = true;
    setArrRepository([]);
    setCursorVariable({
      "queryString": searchText,
    });
  }

  return (
      <SafeAreaView style={Styles.homeContainer}>
        <View style={Styles.repositoryInputContainer}>
          <TextInput
            style={Styles.repositoryTextInput}
            placeholder="Enter your text here"
            onChangeText={text => setSearchText(text)}
            onEndEditing={(e) => endEditing(e)}
            clearButtonMode="while-editing"
          />
        </View>
        <FlatList
          data={arrRepository}
          renderItem={({ item }) => (
            <GitRepoItem
              repository={item}
            />
          )}
          keyExtractor={(x, i) => i.toString()}
          keyExtractor={(repository, i) => `${repository.cursor}-${i}`}
          ListFooterComponent={<FooterView />}
          ItemSeparatorComponent={() => ItemSeparatorComponent()}
          onEndReachedThreshold={0.1}
          onEndReached={() => { 
            if (!dataLoading) {
              dataLoading = true;
              setCursorVariable({
                "queryString": searchText,
                "afterCursor": (arrRepository.length > 0) ? arrRepository[arrRepository.length - 1].cursor : ''
              });
            }
           }}
        />
      </SafeAreaView>
  )
}
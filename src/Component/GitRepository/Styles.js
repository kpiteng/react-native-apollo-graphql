import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  header: {
    fontWeight: 'bold',
  },
  subheader: {
    paddingTop: 10,
  },
  gitRepoItemContainer: { 
    marginHorizontal: 10, 
    marginTop: 5,
    marginBottom: 10
  },
  cursorName: {
    fontSize: 17,
  },
  nodeName: {
    fontSize: 15,
    marginTop: 5,
  },
  descriptionHTML: {
    marginTop: 7,
    fontSize: 14
  },
  footerView: {
    height: 50, 
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separatorLineView: {
    borderWidth: 0.75,
    marginLeft: 10,
  },
  repositoryInputContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  repositoryTextInput: {
    fontSize: 15,
    height: 40,
  }
})


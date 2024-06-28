import { Text, View, StyleSheet, FlatList, Modal, TextInput, TouchableOpacity, SectionList, SafeAreaView, KeyboardAvoidingView, ScrollView} from 'react-native'
import { IconButton, FAB } from 'react-native-paper';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';


const FriendSearchResult = ({visible, clearSearch, onClose, my_uid, searchResult, currentFriends}) => {
    console.log("here")
    const handleClose = () => {

        clearSearch();
        onClose();
    }
    return(
    <View style = {styles.container}>  
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={handleClose}
      transparent
    >
      <SafeAreaView style={styles.modalContainer}>

        <View style={styles.modalHeader}>
        <Text style={styles.modalHeaderText}></Text>
          <IconButton
            icon="arrow-left"
            size={30}
            onPress={handleClose}
            style={styles.modalCloseButton}
          />
        </View>
        <View style = {styles.searchProfile}>
            <Text>APPEAR!</Text>
        </View>

      </SafeAreaView>
    </Modal>
    </View> 
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    modalContainer: {
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          
        },
      modalCloseButton: {
          position: 'absolute',
          top: 10,
          left: 5,
          color: 'white',
        },
      modalHeader: {
          flexDirection: 'row',
          backgroundColor: 'white', 
          padding: 2,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          width: '90%',
        },
      modalHeaderText: {
          fontSize: 25,
          fontWeight: 'bold',
          marginTop: 18,
          marginLeft: 55,
          
      },
      searchProfile: {
        backgroundColor: 'white',
        height: '50%',
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: '90%'
      }
    })

export default FriendSearchResult

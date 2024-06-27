import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import { supabase } from '@/app/(auth)/client'

const FriendList = () => {
    const[_user, getUser] = useState([]);
    const[_uid, getUserID] = useState("");
    const[_friends, getFriends] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
          try{

            console.log("here");
            const { data: { user } } = await supabase.auth.getUser()
            console.log("username: ", user.user_metadata.username);
            getUser(user);

            const { data, error } = await supabase
            .from('profile')
            .select('uid')
            .eq('id', user.id);
            console.log("id: ", data[0].uid);
            getUserID(data[0].uid);
            setLoading(false);

          } catch (error) {
            console.error(error);
          }
        };
    
        loadUser();
    }, []);        
        console.log("outside: ", _user);


    useEffect(() => {
        const loadFriends = async () => {
          try{
            const { data : {friendData}, error } = await supabase.rpc('display_friends', 
              {auth_id : _user.id})
            if (error) { throw error; }
            console.log(friendData);
            getFriends(friendData);
            setLoading(false);
          } catch (error) {
            console.error(error);
          }
        };
    
        loadFriends();
      }, []);

    const odata = [
    { id: 1, image: 'https://bootdey.com/img/Content/avatar/avatar6.png', username: 'johndoe1' },
    { id: 2, image: 'https://bootdey.com/img/Content/avatar/avatar2.png', username: 'johndoe2' },
    { id: 3, image: 'https://bootdey.com/img/Content/avatar/avatar3.png', username: 'johndoe3' },
    { id: 4, image: 'https://bootdey.com/img/Content/avatar/avatar4.png', username: 'johndoe4' },
    { id: 5, image: 'https://bootdey.com/img/Content/avatar/avatar1.png', username: 'johndoe5' },
    { id: 6, image: 'https://bootdey.com/img/Content/avatar/avatar6.png', username: 'johndoe6' },
  ]

  const [friends, setFriends] = useState(odata)
  //const { data: { user } } = await supabase.auth.getUser()

  console.log(loading);
  if (loading) {
    console.log("load");
    return (
        <Text>Loading...</Text>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar1.png' }}
          />
          <Text style={styles.name}>{_user.user_metadata.username}</Text>
          <Text style={styles.name}>{_uid}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <FlatList
          style={styles.container}
          enableEmptySections={true}
          data={friends}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <View style={styles.box}>
                  <Image style={styles.image} source={{ uri: item.image }} />
                  <Text style={styles.username}>{item.username}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#20B2AA',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    padding: 30,
    backgroundColor: '#E6E6FA',
  },
  box: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  username: {
    color: '#20B2AA',
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 10,
  },
})

export default FriendList
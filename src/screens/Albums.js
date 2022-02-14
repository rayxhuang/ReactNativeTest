
import { useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Animated, RefreshControl, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import ListItem from '../components/ListItem';
import { setAlbums, setLoading, setRefreshing, setSearchString } from '../redux/actions/Actions';
import { useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

export default function Albums({ navigation }) {
    const { albums, loading, refreshing, searchString } = useSelector(state => state);

    useEffect(() => {
      onAppLoad();
    }, []);

    const onAppLoad = async () => {
      setLoading(true);
      await getAlbums();
      setLoading(false);
    };

    const onRefresh = async () => {
      setRefreshing(true);
      await getAlbums();
      setRefreshing(false);
    };

    const getAlbums = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        const json = await response.json();
  
        // Use map to cache and avoid unnecessary api calls
        let userAlbumMap = new Map();
        for (let i = 0; i < json.length; i++) {
          let album = json[i];
  
          // Get user name
          if (userAlbumMap.has(album.userId)) {
            album.userName = userAlbumMap.get(album.userId);
          } else {
            const user = await fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`);
            const userJson = await user.json();
            const userName = userJson.name;
            album.userName = userName;
            userAlbumMap.set(album.userId, userName);
          }
  
          // Get photos
          const photos = await fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`);
          album.photos = await photos.json();
  
          json[i] = album;
        }
  
        setAlbums(json);
      } catch (error) {
        console.error(error);
      }
    };

    const onChangeText = (text) => {
      setSearchString(text);
    };

    const filteredAlbums = albums.filter(album => 
      searchString 
      ? album.title.toLowerCase().startsWith(searchString.toLowerCase()) 
        || album.userName.toLowerCase().startsWith(searchString.toLowerCase()) 
      : true
    );

    const scrollY = useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container}>
          <StatusBar />
          {
              loading
              ? <ActivityIndicator color={'#2196f3'}/>
              : <View>
                  {/* Search bar */}
                  <View style={{
                    width: Dimensions.get('window').width - 60,
                    marginHorizontal: 30,
                    marginVertical: 5,
                    paddingRight: 10,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                  }}>
                    <TextInput 
                      style={styles.input}
                      value={searchString}
                      onChangeText={onChangeText}
                      placeholder='Search title or name'
                    />
                    <FontAwesome name={'search'} size={20} color="black" />
                  </View>
                  {/* List of albums */}
                  <Animated.FlatList
                    style={{ flex: 1 }}
                    onScroll={
                      Animated.event(
                        [{nativeEvent: {contentOffset: {y: scrollY}}}],
                        {useNativeDriver: true},
                      )
                    }
                    data={ filteredAlbums }
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => {
                      const inputRange = [
                        -1,
                        0,
                        index * 100,
                        (index + 3.5) * 100,
                      ]

                      const scale = scrollY.interpolate({
                        inputRange,
                        outputRange: [1, 1, 1, 0],
                      })

                      return (
                        <ListItem navigation={navigation} item={item} scale={scale}/>
                      )
                    }}
                    contentContainerStyle={{paddingHorizontal: 20}}
                    // ItemSeparatorComponent={() => <View style={styles.divider}/>}
                    refreshControl={
                      <RefreshControl
                        refreshing={ refreshing }
                        onRefresh={ onRefresh }
                        colors={['#2196f3']}
                        tintColor={'#2196f3'}
                      />
                    }
                  />
              </View>
          }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      flex: 1,
      padding: 10,
    },
    divider: {
      backgroundColor: '#2196f3',
      height: 1,
      marginHorizontal: 16,
    },
});
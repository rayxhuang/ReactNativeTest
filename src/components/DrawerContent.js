import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';
import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect } from 'react';
import { setUserAvatar, setUserName } from '../redux/actions/Actions';
import { useSelector } from 'react-redux';

// Route name maps to icon name
const routeIcons = {
    'AlbumStack': 'image',
    'ScreenB': 'bookmark'
}

export default DrawerContent = ({ navigation, state }) => {
    const { userName, userAvatar } = useSelector(state => state);

    useEffect(async () => {
        const randomAvatar = await fetch('https://randomuser.me/api/?inc=picture,name');
        const json = await randomAvatar.json();

        setUserAvatar(json.results[0].picture.large);
        setUserName(json.results[0].name.first);
    }, []);

    return (
      <View style={{flex:1, paddingTop: 40,}}>
        <View style={styles.userInfoContainer}>
            <View style={styles.avatarContainer}>
                <Image
                    style={{
                        width: 70,
                        height: 70,
                    }}
                    source={{uri: userAvatar}}
                />
            </View>
            <Text style={styles.userGreetingText}>Hi {userName}</Text>
        </View>
        <FlatList
            data={state.routes}
            renderItem={
                ({item, index}) => <DrawerItem
                    key={item.name}
                    focused={index === state.index}
                    icon={({focused}) => <View style={styles.iconContainer}>
                        <FontAwesome name={routeIcons[item.name]} size={20} color={focused ? "#2196f3" : "grey"}/>
                    </View>}
                    label={(item.params && item.params.title) ? item.params.title : item.name}
                    labelStyle={{color: index === state.index ? "#2196f3" : "grey"}}
                    onPress={() => {navigation.navigate(item.name)}}
                />
            }
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
      userInfoContainer: {
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        marginTop: 20, 
        marginLeft: 10,
      },
      avatarContainer: {
        borderRadius: 35,
        width: 70,
        height: 70,
        overflow: 'hidden',
      },
      userGreetingText: {
          marginLeft: 8,
          marginVertical: 10,
          fontSize: 20,
      },
      iconContainer: {
        width: 25, 
        overflow: 'hidden', 
        alignItems: 'center'
      }
  });
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { setSelectedAlbum } from '../redux/actions/Actions';

export default function ListItem({ navigation, item }) {
    const onPressHandler = () => {
        setSelectedAlbum(item);
        navigation.navigate('Photos', { title: item.title });
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={onPressHandler}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.titleSubText}>-by {item.userName}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingHorizontal : 20,
    },
    titleContainer: {
        width: '100%',
        // backgroundColor: 'grey',
        padding: 10,
    },
    titleText: {
        fontSize: 20,
        color: 'black',
    },
    titleSubText: {
        fontSize: 14,
        color: 'grey',
    },
    text: {
      height: 20,
      color: 'black',
    }
  });
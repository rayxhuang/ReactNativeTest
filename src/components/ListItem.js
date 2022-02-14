import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { setSelectedAlbum } from '../redux/actions/Actions';

export default function ListItem({ navigation, item, scale }) {
    const onPressHandler = () => {
        setSelectedAlbum(item);
        navigation.navigate('Photos', { title: item.title });
    };

    return (
        <Animated.View style={[styles.container, {transform: [{scale}]}]}>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={onPressHandler}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.titleSubText}>-by {item.userName}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: 80,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'center',
      margin: 10,
      paddingHorizontal : 20,
      borderRadius: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      shadowColor: '#000000',
      shadowOffset: {
          width: 0,
          height: 10,
      },
      shadowOpacity: 0.3,
      shadowRadius: 20,
    },
    titleContainer: {
        width: '100%',
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
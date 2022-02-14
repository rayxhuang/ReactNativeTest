import { View, StyleSheet, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function DrawerIcon({ navigation }) {

    const onPressHandler = () => {
        navigation.toggleDrawer();
    };

    return (
        <View style={styles.sortIcon}>
            <Pressable onPress={onPressHandler}>
                <FontAwesome name={'bars'} size={20} color="white" />
            </Pressable>
        </View>
    );
}
  
const styles = StyleSheet.create({
    sortIcon: { 
        width: 20,
        height: 20,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
import { View, StyleSheet, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { setSortBy } from '../redux/actions/Actions';

export default function SortIcon() {
    const currentOrder = useSelector(state => state.sortBy);
    const isAsc = currentOrder == 'asc';
    const iconName = isAsc ? "sort-alpha-asc" : "sort-alpha-desc";

    const onPressHandler = () => {
        setSortBy(isAsc ? 'desc' : 'asc');
    };

    return (
        <View style={styles.sortIcon}>
            <Pressable onPress={onPressHandler}>
                <FontAwesome name={iconName} size={20} color="white" />
            </Pressable>
        </View>
    );
}
  
const styles = StyleSheet.create({
    sortIcon: { 
        width: 20,
        height: 20,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
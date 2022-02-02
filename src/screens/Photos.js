import { StyleSheet, Dimensions, View, FlatList, Image, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { setSelectedPhoto } from '../redux/actions/Actions';

export default function Photos() {
    const photos = useSelector(state => state.selectedAlbum.photos);
    const photoSelected = useSelector(state => state.selectedPhoto);

    function onThumbnailPressHandler(photo) {
        setSelectedPhoto(photo);
    }

    function onFullImagePressHandler() {
        setSelectedPhoto(null);
    }

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const maxThumbnailPerRow = 4;
    const numberOfRows = Math.ceil(photos.length / maxThumbnailPerRow);
    const size = windowWidth / maxThumbnailPerRow;
    
    let rows = [];
    for(let i = 0; i < numberOfRows; i++) {
        const row = photos.slice(i * maxThumbnailPerRow, (i + 1) * maxThumbnailPerRow);
        rows.push(row);
    }

    if (photoSelected == null) {
        return (
            <View style={styles.container}>
                <FlatList
                    data={rows}
                    keyExtractor={(_, index) => index}
                    renderItem={({ item }) => {
                        return (
                            <View style={{height: size}}>
                            <FlatList 
                                horizontal
                                data={item}
                                keyExtractor={(photo, index) => photo.id}
                                renderItem={({ item }) => {
                                    return (
                                        <Pressable onPress={ () => onThumbnailPressHandler(item) }>
                                            <Image 
                                                style={{
                                                    width: size,
                                                    height: size,
                                                    resizeMode: 'stretch',
                                                }}
                                                source={{
                                                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                                                    // url: item.thumbnailUrl + '.png',
                                                }}
                                            />
                                        </Pressable>
                                    );
                                }}
                            />
                            </View>
                        );
                    }}
                />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Pressable onPress={onFullImagePressHandler}>
                    <Image 
                        style={{
                            width: windowWidth,
                            height: windowHeight,
                            resizeMode: 'center',
                        }}
                        source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                    />
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
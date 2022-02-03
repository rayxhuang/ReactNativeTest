import { StyleSheet, Dimensions, View, FlatList, Image, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { setSelectedPhoto } from '../redux/actions/Actions';
import PagerView from 'react-native-pager-view';

export default function Photos() {
    const photos = useSelector(state => state.selectedAlbum.photos);
    const photoSelected = useSelector(state => state.selectedPhoto);

    const onThumbnailPressHandler = (photo) => {
        setSelectedPhoto(photo);
    }

    const onFullImagePressHandler = () => {
        setSelectedPhoto(null);
    }

    const findSelectedPhotoIndex = () => {
        const index = photos.indexOf(photoSelected);
        return index ?? 0;
    }

    // const onPagerViewSwipeHandler = (e) => {
    //     const newIndex = e.nativeEvent.position;
    //     const newSelectedPhoto = photos[newIndex];
    //     onThumbnailPressHandler(newSelectedPhoto);
    // }

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const maxThumbnailPerRow = 4;
    const numberOfRows = Math.ceil(photos.length / maxThumbnailPerRow);
    const size = windowWidth / maxThumbnailPerRow;
    
    let rows = [];
    for (let i = 0; i < numberOfRows; i++) {
        const row = photos.slice(i * maxThumbnailPerRow, (i + 1) * maxThumbnailPerRow);
        rows.push(row);
    }

    if (photoSelected == null) {
        return (
            <View style={styles.container}>
                <FlatList
                    data={rows}
                    keyExtractor={(_, index) => index}
                    renderItem={({ item }) => (
                        <View style={{height: size}}>
                            <FlatList 
                                horizontal
                                data={item}
                                keyExtractor={(photo, index) => photo.id}
                                renderItem={({ item }) => (
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
                                )}
                            />
                        </View>
                    )}
                />
            </View>
        );
    } else {
        const pages = photos.map(photo => (
            <View style={{flex: 1}} key={photo.id}>
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
        ));

        return (
            <View style={{flex: 1}}>
                <PagerView 
                    style={{flex: 1}} 
                    initialPage={ findSelectedPhotoIndex() }
                    // onPageSelected={ onPagerViewSwipeHandler }
                >
                    { pages }
                </PagerView>
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
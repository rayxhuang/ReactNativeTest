import store from '../Store';
import * as ActionTypes from './ActionTypes';

export function setAlbums(albums) {
    store.dispatch({
        type: ActionTypes.SET_ALBUMS,
        payload: {
            albums: albums,
        }
    });
}

export function setSelectedAlbum(album) {
    store.dispatch({
        type: ActionTypes.SET_SELECTED_ALBUM,
        payload: {
            album: album,
        }
    });
}

export function setSelectedPhoto(photo) {
    store.dispatch({
        type: ActionTypes.SET_SELECTED_PHOTO,
        payload: {
            photo: photo,
        }
    });
}

export function setSortBy(order) {
    store.dispatch({
        type: ActionTypes.SET_SORT_BY,
        payload: {
            order: order,
        }
    });
}

export function setLoading(loading) {
    store.dispatch({
        type: ActionTypes.SET_LOADING,
        payload: {
            loading: loading,
        }
    });
}

export function setRefreshing(refreshing) {
    store.dispatch({
        type: ActionTypes.SET_REFRESHING,
        payload: {
            refreshing: refreshing,
        }
    });
}

export function setSearchString(string) {
    store.dispatch({
        type: ActionTypes.SET_SEARCH_STRING,
        payload: {
            searchString: string,
        }
    });
}

export function setUserAvatar(uri) {
    store.dispatch({
        type: ActionTypes.SET_USER_AVATAR,
        payload: {
            userAvatar: uri,
        }
    });
}

export function setUserName(name) {
    store.dispatch({
        type: ActionTypes.SET_USER_NAME,
        payload: {
            userName: name,
        }
    });
}
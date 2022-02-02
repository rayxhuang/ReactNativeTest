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
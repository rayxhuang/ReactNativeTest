import * as Actions from '../actions/ActionTypes';

const initialState = {
    albums: [],
    selectedAlbum: null,
    selectedPhoto: null,
    sortBy: 'asc',
    loading: false,
    refreshing: false,
    searchString: null,
    userAvatar: null,
    userName: null,
};

const Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actions.SET_ALBUMS:
            console.log("SET_ALBUMS");
            const albums = [...payload.albums];
            const isAsc = state.sortBy == 'asc';
            albums.sort((a, b) => {
                return (isAsc ? 1 : -1) * (a.title < b.title ? -1 : 1)
            });
            return {
                albums: albums,
                selectedAlbum: null,
                selectedPhoto: null,
                sortBy: state.sortBy, 
                loading: false,
                searchString: null,
                userAvatar: state.userAvatar,
                userName: state.userName,
            };
        case Actions.SET_SELECTED_ALBUM:
            console.log("SET_SELECTED_ALBUM");
            return {...state, selectedAlbum: payload.album, selectedPhoto: null};
        case Actions.SET_SELECTED_PHOTO:
            console.log("SET_SELECTED_PHOTO");
            return {...state, selectedPhoto: payload.photo};
        case Actions.SET_SORT_BY:
            console.log("SET_SORT_BY");
            const oldAlbums = [...state.albums];
            const newOrder = payload.order == 'asc';
            oldAlbums.sort((a, b) => {
                return (newOrder ? 1 : -1) * (a.title < b.title ? -1 : 1)
            });

            return {...state, albums: oldAlbums, sortBy: payload.order};
        case Actions.SET_LOADING:
            console.log("SET_LOADING");
            return {...state, loading: payload.loading};
        case Actions.SET_REFRESHING:
            console.log("SET_REFRESHING");
            return {...state, refreshing: payload.refreshing};
        case Actions.SET_SEARCH_STRING:
            console.log("SET_SEARCH_STRING");
            return {...state, searchString: payload.searchString};
        case Actions.SET_USER_AVATAR:
            console.log("SET_USER_AVATAR");
            return {...state, userAvatar: payload.userAvatar};
        case Actions.SET_USER_NAME:
            console.log("SET_USER_NAME");
            return {...state, userName: payload.userName};
        default:
            return state;
    }
}

export default Reducer;
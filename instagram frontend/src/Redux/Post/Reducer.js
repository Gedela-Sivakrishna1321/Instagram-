import { CREATE_NEW_POST, DELETE_POST, GET_SINGLE_POST, GET_USER_POST, LIKE_POST, SAVE_POST, UNLIKE_POST, UNSAVE_POST } from "./ActionType"

const initialValues = {
    createdPost : null,
    usersPost : [],
    deletePost : null,
    likePost : null,
    unlikePost : null,
    savedPost : null,
    unsavedPost : null,
    getSinglePost : null,
}

export const PostReducer = (store=initialValues, {type,payload}) => {
    if(type === CREATE_NEW_POST) {
        return {...store, createdPost : payload};
    } 
    else if (type === GET_USER_POST) {
        return {...store, usersPost : payload};
    } 
    else if (type === DELETE_POST) {
        return {...store, deletePost : payload};
    } 
    else if (type === LIKE_POST) {
        return {...store, likePost : payload};
    }
    else if (type === UNLIKE_POST) {
        return {...store, unlikePost : payload};
    } 
    else if (type === SAVE_POST) {
        return {...store, savedPost : payload};
    }
    else if (type === UNSAVE_POST) {
        return {...store, unsavedPost : payload};
    }
    else if (type === GET_SINGLE_POST) {
        return {...store, getSinglePost : payload};
    }

    return store;
}
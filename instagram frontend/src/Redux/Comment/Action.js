import { CREATE_COMMENT, GET_POST_COMMENT, LIKE_COMMENT, UNLIKE_COMMENT } from "./ActionType";

const BASE_API = "http://localhost:8080/api/comments";

export const createCommentAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/create/${data.postId}`, {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + data.jwt,
            },
            body : JSON.stringify(data.data),
        } )

        const comment = await res.json();
        console.log("Created comment : ",comment);
        dispatch({type : CREATE_COMMENT, payload : comment});
        
    } catch (error) {
        console.log("error while creating comment : ",error);
    }
}

export const findPostCommentAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/${data.postId}`, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + data.jwt,
            },
        } )

        const comment = await res.json();
        console.log("find post comment : "+comment);
        dispatch({type : GET_POST_COMMENT, payload : comment});
        
    } catch (error) {
        console.log("error while finding post comment : ",error);
    }
}

export const likeCommentAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/like/${data.commentId}`, {
            method : 'PUT',
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + data.jwt,
            },
        } )

        const comment = await res.json();
        console.log("liked comment : "+comment);
        dispatch({type : LIKE_COMMENT, payload : comment});
        
    } catch (error) {
        console.log("error while liking comment : ",error);
    }
}

export const unlikeCommentAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/unlike/${data.commentId}`, {
            method : 'PUT',
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + data.jwt,
            },
        } )

        const comment = await res.json();
        console.log("unliked comment : "+comment);
        dispatch({type : UNLIKE_COMMENT, payload : comment});
        
    } catch (error) {
        console.log("error while unliking comment : ",error);
    }
}
import { CREATE_NEW_POST, DELETE_POST, GET_SINGLE_POST, GET_USER_POST, LIKE_POST, REQ_USER_POST, SAVE_POST, UNLIKE_POST, UNSAVE_POST } from "./ActionType";

const BASE_API = "http://localhost:8080/api/posts";

export const createPostAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/create`, {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + data.jwt,
            },
            body : JSON.stringify(data.data),
        } )

        const post = await res.json();

        console.log("Created post : ",post);

        dispatch({type : CREATE_NEW_POST, payload : post});
        
    } catch (error) {
        console.log("Error while creating a post : ",error);
    }
}

export const findUserPostAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/following/${data.userIds}`, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + data.jwt,
            },
        } )

        const posts = await res.json();

        console.log("Fetch following users posts : ",posts);

        dispatch({type : GET_USER_POST, payload : posts});
        
    } catch (error) {
        console.log("Error while fetching following users posts : ",error);
    }
}

export const reqUserPostAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/following/${data.userId}`, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + data.jwt,
            },
        } )

        const posts = await res.json();

        console.log("Req user posts : ",posts);

        dispatch({type : REQ_USER_POST, payload : posts});
        
    } catch (error) {
        console.log("Error while fetching req user posts : ",error);
    }
}

export const likePostAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/like/${data.postId}`, {
            method : 'PUT',
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + data.jwt,
            },
        } )

        const post = await res.json();

        console.log("Liked post : ",post);

        dispatch({type : LIKE_POST , payload : post});
        
    } catch (error) {
        console.log("Error while liking  post : ",error);
    }
}

export const unlikePostAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/unlike/${data.postId}`, {
            method : 'PUT',
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + data.jwt,
            },
        } )

        const post = await res.json();

        console.log("UnLiked post : ",post);

        dispatch({type : UNLIKE_POST , payload : post});
        
    } catch (error) {
        console.log("Error while unliking  post : ",error);
    }
}

export const savePostAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/save_post/${data.postId}`, {
            method : 'PUT',
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + data.jwt,
            },
        } )

        const post = await res.json();

        console.log("saved post : ",post);

        dispatch({type : SAVE_POST , payload : post});
        
    } catch (error) {
        console.log("Error while saving  post : ",error);
    }
}

export const unsavePostAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/unsave_post/${data.postId}`, {
            method : 'PUT',
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + data.jwt,
            },
        } )

        const post = await res.json();

        console.log("unsaved post : ",post);

        dispatch({type : UNSAVE_POST , payload : post});
        
    } catch (error) {
        console.log("Error while unsaving  post : ",error);
    }
}

export const findPostByIdAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/${data.postId}`, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + data.jwt,
            },
        } )

        const post = await res.json();

        console.log("Post by Id : ",post);

        dispatch({type : GET_SINGLE_POST , payload : post});
        
    } catch (error) {
        console.log("Error while post by id : ",error);
    }
}

export const deletePostAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/delete/${data.postId}`, {
            method : 'DELETE',
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + data.jwt,
            },
        } )

        const post = await res.json();

        console.log("Deleted Post : ",post);

        dispatch({type : DELETE_POST , payload : post});
        
    } catch (error) {
        console.log("Error while deleting post : ",error);
    }
}
import { FOLLOW_USER, GET_USERS_BY_USER_IDS, GET_USER_BY_USERNAME, REQ_USER, SEARCH_USER, UNFOLLOW_USER, UPDATE_USER } from "./ActionType";

const BASE_API = "http://localhost:8080/instagram/api";

export const getUserProfile = (jwt) => async (dispatch) => {
    try {

        const res = await fetch("http://localhost:8080/instagram/api/req" ,{
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + jwt,
            }
        } )

        const reqUser = await res.json();
        console.log("Get user profile : ",reqUser);
        dispatch({type : REQ_USER, payload : reqUser});
        
    } catch (error) {
        console.log(error);
    }
}

export const findUserByUsernameAction = (data) => async (dispatch) => {
   
    try {
        
        const res = await fetch(`${BASE_API}/users/username/${data.username}`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + data.jwt,
            }
        } )
    
        const user = await res.json();
        console.log("Find user by username : ",user);
        dispatch({type : GET_USER_BY_USERNAME, payload : user})

    } catch (error) {
        console.log("Error while finding the user by username : ",error);
    }

}

export const findUserByUserIdsAction = (data) => async (dispatch) => {

   try {
    
    const res = await fetch(`${BASE_API}/users/ids/${data.userIds}`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            Authorization : "Bearer " + data.jwt,
        }
    } )

    const users = await res.json();
    console.log("Find user by user Ids : ",users);
    dispatch({type : GET_USERS_BY_USER_IDS, payload : users})

   } catch (error) {
        console.log("Error while find the users by usersIds : ",error);
   }

}

export const followUserAction = (data) => async (dispatch) => {

    try {
        
        const res = await fetch(`${BASE_API}/follow/${data.userId}`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + data.jwt,
            }
        } )
    
        const user = await res.json();
        console.log("Follow user  : ",user);
        dispatch({type : FOLLOW_USER, payload : user})

    } catch (error) {
        console.log("Error while following the user : ",error);
    }

}

export const unfollowUserAction = (data) => async (dispatch) => {

   try {

    const res = await fetch(`${BASE_API}/unfollow/${data.userId}`, {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            Authorization : "Bearer " + data.jwt,
        }
    } )

    const user = await res.json();
    console.log("UnFollow user  : ",user);
    dispatch({type : UNFOLLOW_USER, payload : user})

   } catch (error) {
        console.log("Error while unfollowing the user : ",error);
   }

}

export const searchUserAction = (data) => async (dispatch) => {
    try {
         
    const res = await fetch(`${BASE_API}/users/search/${data.query}`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            Authorization : "Bearer " + data.jwt,
        }
    } )

    const user = await res.json();
    console.log("Search user  : ",user);
    dispatch({type : SEARCH_USER, payload : user})

    } catch (error) {
        console.log("Error occured while searching the user : ",error);
    }
}

export const updateUserAction = (data) => async (dispatch) => {

    try {

        const res = await fetch(`${BASE_API}/account/edit`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + data.jwt,
            },
            body : JSON.stringify(data.data),
        } )
    
        const user = await res.json();
        console.log("Update user  : ",user);
        dispatch({type : UPDATE_USER, payload : user})

    } catch (error) {
        console.log("Error while updating the user : ",error);
    }
}
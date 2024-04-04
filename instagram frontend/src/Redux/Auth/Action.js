import {SIGN_IN, SIGN_UP} from '../Auth/ActionType';

export const signInAction = (data)=> async (dispatch) => {
    try {
        // check 1
      //  console.log("data : ",data);
        const res = await fetch("http://localhost:8080/signin", {
            method : "GET",
            headers :  {
                "Content-Type" : "application/json",
                Authorization : "Basic " + btoa(data.email + ":" + data.password),
            }

        } )
      //  console.log("Response : ", res.headers);
        const token = res.headers.get("Authorization");
        localStorage.setItem("token",token);

        dispatch({type : SIGN_IN, payload: token});
        console.log("Signin successfull + ",token);
    } catch (error) {
        console.log(error);
    }
}

export const signupAction = (data)=> async (dispatch) => {
    try {

        const res = await fetch("http://localhost:8080/signup", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(data)
        } )

        const user = await res.json();  

        dispatch({type : SIGN_UP, payload: user});

        console.log("Signup successfull + ",user);
        
    } catch (error) {
        console.log(error);
    }
}